import React, { useReducer, useCallback, useEffect } from "react";
import { Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, HStack, VStack, Text, Box, Button, } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useStrataSdks } from "@strata-foundation/react";
import { useChatSdk } from "../../contexts/chatSdk";
import { useDelegateWallet } from "../../hooks/useDelegateWallet";
import { ProgressStep } from "./ProgressStep";
import { BasicInfo } from "./BasicInfo";
import { PermissionType as PermissionTypeSelect } from "./PermissionType";
import { Permission } from "./Permission";
import { Summary } from "./Summary";
import { wizardSubmit } from "./wizardSubmit";
import { useRouter } from "next/router";
import { route, routes } from "../../routes";
export var CreateChatStep;
(function (CreateChatStep) {
    CreateChatStep[CreateChatStep["BasicInfo"] = 0] = "BasicInfo";
    CreateChatStep[CreateChatStep["ReadPermissionsType"] = 1] = "ReadPermissionsType";
    CreateChatStep[CreateChatStep["ReadPermissions"] = 2] = "ReadPermissions";
    CreateChatStep[CreateChatStep["PostPermissionsType"] = 3] = "PostPermissionsType";
    CreateChatStep[CreateChatStep["PostPermissions"] = 4] = "PostPermissions";
    CreateChatStep[CreateChatStep["Summary"] = 5] = "Summary";
})(CreateChatStep || (CreateChatStep = {}));
(function (CreateChatStep) {
    CreateChatStep.prev = (value) => value + -1;
    CreateChatStep.next = (value) => value + 1;
})(CreateChatStep || (CreateChatStep = {}));
export var ReadPostType;
(function (ReadPostType) {
    ReadPostType["Token"] = "Token";
    ReadPostType["NFT"] = "NFT";
})(ReadPostType || (ReadPostType = {}));
export const initialState = {
    step: CreateChatStep.BasicInfo,
    lastStep: CreateChatStep.BasicInfo,
    status: null,
    subStatus: null,
    error: null,
    wizardData: {
        name: "",
        identifier: "",
        description: "",
        image: undefined,
        imageUrl: undefined,
        imageUploaded: false,
        readType: undefined,
        postType: undefined,
        postIsSameAsRead: false,
        readForm: { isExisting: false },
        postForm: { isExisting: false },
    },
};
export const CreateChatModal = ({ isOpen, onClose, }) => {
    const { connected } = useWallet();
    const { setVisible } = useWalletModal();
    const { chatSdk } = useChatSdk();
    const router = useRouter();
    const { tokenBondingSdk } = useStrataSdks();
    const { keypair: delegateWallet } = useDelegateWallet();
    const [state, setState] = useReducer((state, newState) => ({
        ...state,
        ...newState,
    }), initialState);
    const handleClose = () => {
        setState(initialState);
        onClose();
    };
    const handleNext = useCallback(async () => {
        const isOnSummary = state.step === CreateChatStep.Summary;
        if ((!isOnSummary && CreateChatStep.next(state.lastStep)) ==
            CreateChatStep.Summary) {
            setState({ step: CreateChatStep.Summary });
        }
        else {
            if (isOnSummary) {
                await wizardSubmit({
                    sdks: {
                        chatSdk,
                        tokenBondingSdk,
                    },
                    data: state,
                    delegateWallet,
                    setState,
                });
            }
            else if (state.step === CreateChatStep.PostPermissionsType &&
                state.wizardData.postIsSameAsRead) {
                setState({ step: CreateChatStep.Summary, lastStep: state.step });
            }
            else {
                setState({
                    step: CreateChatStep.next(state.step),
                    lastStep: state.step,
                });
            }
        }
    }, [state, setState]);
    const handleBack = useCallback((stepOverride) => {
        if (stepOverride && stepOverride in CreateChatStep) {
            setState({ step: stepOverride });
        }
        else {
            if (state.step === CreateChatStep.BasicInfo) {
                setState(initialState);
                onClose();
            }
            else if (state.step === CreateChatStep.Summary &&
                state.wizardData.postIsSameAsRead) {
                setState({ step: CreateChatStep.PostPermissionsType });
            }
            else {
                setState({ step: CreateChatStep.prev(state.step) });
            }
        }
    }, [state, setState, onClose]);
    useEffect(() => {
        if (state.status === "success") {
            router.push(route(routes.chat, {
                id: state.wizardData.identifier,
            }), undefined, { shallow: true });
            handleClose();
        }
    }, [state.status]);
    return (React.createElement(Modal, { onClose: handleClose, isOpen: isOpen, size: "lg" },
        React.createElement(ModalOverlay, null),
        React.createElement(ModalContent, { pb: 5 },
            React.createElement(ModalHeader, { textAlign: "left" },
                React.createElement(VStack, { w: "full", alignItems: "start", gap: 8, spacing: 0 },
                    React.createElement(Box, null,
                        React.createElement(Text, { fontWeight: "bold", fontSize: "lg" }, "Create a Chat"),
                        React.createElement(Text, { fontSize: "sm", fontWeight: "normal" }, "This information will help us create your chat...")),
                    React.createElement(HStack, { w: "full", justifyContent: "space-between", pb: 4 },
                        React.createElement(ProgressStep, { step: 1, size: "sm", isActive: state.step === CreateChatStep.BasicInfo, isCompleted: state.step > CreateChatStep.BasicInfo }),
                        React.createElement(ProgressStep, { step: 2, size: "sm", isActive: [
                                CreateChatStep.ReadPermissionsType,
                                CreateChatStep.ReadPermissions,
                            ].includes(state.step), isCompleted: state.step > CreateChatStep.ReadPermissions }),
                        React.createElement(ProgressStep, { step: 3, size: "sm", isActive: [
                                CreateChatStep.PostPermissionsType,
                                CreateChatStep.PostPermissions,
                            ].includes(state.step), isCompleted: state.step > CreateChatStep.PostPermissions, isLast: true })))),
            React.createElement(ModalBody, null, !connected ? (React.createElement(VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
                React.createElement(Box, null,
                    React.createElement(Text, { fontWeight: "bold", fontSize: "md" }, "No wallet was detected"),
                    React.createElement(Text, { fontSize: "xs", fontWeight: "normal" }, "Please connect a wallet to continue.")),
                React.createElement(Button, { variant: "outline", colorScheme: "primary", onClick: () => {
                        onClose();
                        setVisible(true);
                    } }, "Connect Wallet"))) : (React.createElement(React.Fragment, null,
                state.step === CreateChatStep.BasicInfo && (React.createElement(BasicInfo, { state: state, setState: setState, onBack: handleBack, onNext: handleNext })),
                [
                    CreateChatStep.ReadPermissionsType,
                    CreateChatStep.PostPermissionsType,
                ].includes(state.step) && (React.createElement(PermissionTypeSelect, { state: state, setState: setState, permissionType: {
                        [CreateChatStep.ReadPermissionsType]: "read",
                        [CreateChatStep.PostPermissionsType]: "post",
                    }[state.step], defaultValue: {
                        [CreateChatStep.ReadPermissionsType]: state.wizardData.readType,
                        [CreateChatStep.PostPermissionsType]: state.wizardData.postType,
                    }[state.step], onBack: handleBack, onNext: handleNext })),
                [
                    CreateChatStep.ReadPermissions,
                    CreateChatStep.PostPermissions,
                ].includes(state.step) && (React.createElement(Permission, { state: state, permissionType: {
                        [CreateChatStep.ReadPermissions]: "read",
                        [CreateChatStep.PostPermissions]: "post",
                    }[state.step], setState: setState, onBack: handleBack, onNext: handleNext })),
                state.step === CreateChatStep.Summary && (React.createElement(Summary, { state: state, onBack: handleBack, onNext: handleNext }))))))));
};
//# sourceMappingURL=CreateChatModal.js.map
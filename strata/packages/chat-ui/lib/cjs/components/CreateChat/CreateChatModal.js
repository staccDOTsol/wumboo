"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChatModal = exports.initialState = exports.ReadPostType = exports.CreateChatStep = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const react_3 = require("@strata-foundation/react");
const chatSdk_1 = require("../../contexts/chatSdk");
const useDelegateWallet_1 = require("../../hooks/useDelegateWallet");
const ProgressStep_1 = require("./ProgressStep");
const BasicInfo_1 = require("./BasicInfo");
const PermissionType_1 = require("./PermissionType");
const Permission_1 = require("./Permission");
const Summary_1 = require("./Summary");
const wizardSubmit_1 = require("./wizardSubmit");
const router_1 = require("next/router");
const routes_1 = require("../../routes");
var CreateChatStep;
(function (CreateChatStep) {
    CreateChatStep[CreateChatStep["BasicInfo"] = 0] = "BasicInfo";
    CreateChatStep[CreateChatStep["ReadPermissionsType"] = 1] = "ReadPermissionsType";
    CreateChatStep[CreateChatStep["ReadPermissions"] = 2] = "ReadPermissions";
    CreateChatStep[CreateChatStep["PostPermissionsType"] = 3] = "PostPermissionsType";
    CreateChatStep[CreateChatStep["PostPermissions"] = 4] = "PostPermissions";
    CreateChatStep[CreateChatStep["Summary"] = 5] = "Summary";
})(CreateChatStep = exports.CreateChatStep || (exports.CreateChatStep = {}));
(function (CreateChatStep) {
    CreateChatStep.prev = (value) => value + -1;
    CreateChatStep.next = (value) => value + 1;
})(CreateChatStep = exports.CreateChatStep || (exports.CreateChatStep = {}));
var ReadPostType;
(function (ReadPostType) {
    ReadPostType["Token"] = "Token";
    ReadPostType["NFT"] = "NFT";
})(ReadPostType = exports.ReadPostType || (exports.ReadPostType = {}));
exports.initialState = {
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
const CreateChatModal = ({ isOpen, onClose, }) => {
    const { connected } = (0, wallet_adapter_react_1.useWallet)();
    const { setVisible } = (0, wallet_adapter_react_ui_1.useWalletModal)();
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const router = (0, router_1.useRouter)();
    const { tokenBondingSdk } = (0, react_3.useStrataSdks)();
    const { keypair: delegateWallet } = (0, useDelegateWallet_1.useDelegateWallet)();
    const [state, setState] = (0, react_1.useReducer)((state, newState) => (Object.assign(Object.assign({}, state), newState)), exports.initialState);
    const handleClose = () => {
        setState(exports.initialState);
        onClose();
    };
    const handleNext = (0, react_1.useCallback)(() => __awaiter(void 0, void 0, void 0, function* () {
        const isOnSummary = state.step === CreateChatStep.Summary;
        if ((!isOnSummary && CreateChatStep.next(state.lastStep)) ==
            CreateChatStep.Summary) {
            setState({ step: CreateChatStep.Summary });
        }
        else {
            if (isOnSummary) {
                yield (0, wizardSubmit_1.wizardSubmit)({
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
    }), [state, setState]);
    const handleBack = (0, react_1.useCallback)((stepOverride) => {
        if (stepOverride && stepOverride in CreateChatStep) {
            setState({ step: stepOverride });
        }
        else {
            if (state.step === CreateChatStep.BasicInfo) {
                setState(exports.initialState);
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
    (0, react_1.useEffect)(() => {
        if (state.status === "success") {
            router.push((0, routes_1.route)(routes_1.routes.chat, {
                id: state.wizardData.identifier,
            }), undefined, { shallow: true });
            handleClose();
        }
    }, [state.status]);
    return (react_1.default.createElement(react_2.Modal, { onClose: handleClose, isOpen: isOpen, size: "lg" },
        react_1.default.createElement(react_2.ModalOverlay, null),
        react_1.default.createElement(react_2.ModalContent, { pb: 5 },
            react_1.default.createElement(react_2.ModalHeader, { textAlign: "left" },
                react_1.default.createElement(react_2.VStack, { w: "full", alignItems: "start", gap: 8, spacing: 0 },
                    react_1.default.createElement(react_2.Box, null,
                        react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "lg" }, "Create a Chat"),
                        react_1.default.createElement(react_2.Text, { fontSize: "sm", fontWeight: "normal" }, "This information will help us create your chat...")),
                    react_1.default.createElement(react_2.HStack, { w: "full", justifyContent: "space-between", pb: 4 },
                        react_1.default.createElement(ProgressStep_1.ProgressStep, { step: 1, size: "sm", isActive: state.step === CreateChatStep.BasicInfo, isCompleted: state.step > CreateChatStep.BasicInfo }),
                        react_1.default.createElement(ProgressStep_1.ProgressStep, { step: 2, size: "sm", isActive: [
                                CreateChatStep.ReadPermissionsType,
                                CreateChatStep.ReadPermissions,
                            ].includes(state.step), isCompleted: state.step > CreateChatStep.ReadPermissions }),
                        react_1.default.createElement(ProgressStep_1.ProgressStep, { step: 3, size: "sm", isActive: [
                                CreateChatStep.PostPermissionsType,
                                CreateChatStep.PostPermissions,
                            ].includes(state.step), isCompleted: state.step > CreateChatStep.PostPermissions, isLast: true })))),
            react_1.default.createElement(react_2.ModalBody, null, !connected ? (react_1.default.createElement(react_2.VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
                react_1.default.createElement(react_2.Box, null,
                    react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "md" }, "No wallet was detected"),
                    react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" }, "Please connect a wallet to continue.")),
                react_1.default.createElement(react_2.Button, { variant: "outline", colorScheme: "primary", onClick: () => {
                        onClose();
                        setVisible(true);
                    } }, "Connect Wallet"))) : (react_1.default.createElement(react_1.default.Fragment, null,
                state.step === CreateChatStep.BasicInfo && (react_1.default.createElement(BasicInfo_1.BasicInfo, { state: state, setState: setState, onBack: handleBack, onNext: handleNext })),
                [
                    CreateChatStep.ReadPermissionsType,
                    CreateChatStep.PostPermissionsType,
                ].includes(state.step) && (react_1.default.createElement(PermissionType_1.PermissionType, { state: state, setState: setState, permissionType: {
                        [CreateChatStep.ReadPermissionsType]: "read",
                        [CreateChatStep.PostPermissionsType]: "post",
                    }[state.step], defaultValue: {
                        [CreateChatStep.ReadPermissionsType]: state.wizardData.readType,
                        [CreateChatStep.PostPermissionsType]: state.wizardData.postType,
                    }[state.step], onBack: handleBack, onNext: handleNext })),
                [
                    CreateChatStep.ReadPermissions,
                    CreateChatStep.PostPermissions,
                ].includes(state.step) && (react_1.default.createElement(Permission_1.Permission, { state: state, permissionType: {
                        [CreateChatStep.ReadPermissions]: "read",
                        [CreateChatStep.PostPermissions]: "post",
                    }[state.step], setState: setState, onBack: handleBack, onNext: handleNext })),
                state.step === CreateChatStep.Summary && (react_1.default.createElement(Summary_1.Summary, { state: state, onBack: handleBack, onNext: handleNext }))))))));
};
exports.CreateChatModal = CreateChatModal;
//# sourceMappingURL=CreateChatModal.js.map
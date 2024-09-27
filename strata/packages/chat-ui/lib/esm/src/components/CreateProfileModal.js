import { Alert, Box, Button, FormControl, FormHelperText, FormLabel, HStack, Icon, Image, Input, Link, Modal, ModalBody, ModalContent, ModalOverlay, Progress, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useWallet } from "@solana/wallet-adapter-react";
import { IdentifierType, randomizeFileName, uploadFiles } from "@strata-foundation/chat";
import { truncatePubkey, useErrorHandler, useProvider } from "@strata-foundation/react";
import { sendMultipleInstructions } from "@strata-foundation/spl-utils";
import React, { useCallback, useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { FormProvider, useForm } from "react-hook-form";
import { RiCheckFill } from "react-icons/ri";
import * as yup from "yup";
import { STRATA_KEY } from "../constants/globals";
import { useChatSdk } from "../contexts/chatSdk";
import { useAnalyticsEventTracker } from "../hooks/useAnalyticsEventTracker";
import { useChatStorageAccountKey } from "../hooks/useChatStorageAccountKey";
import { useLoadDelegate } from "../hooks/useLoadDelegate";
import { useUsernameFromIdentifierCertificate } from "../hooks/useUsernameFromIdentifierCertificate";
import { useWalletFromUsernameIdentifier } from "../hooks/useWalletFromUsernameIdentifier";
import { useWalletProfile } from "../hooks/useWalletProfile";
import { FormControlWithError } from "./form/FormControlWithError";
import { LoadWalletModal } from "./LoadWalletModal";
const validationSchema = yup.object({
    username: yup
        .string()
        .required()
        .max(28)
        .matches(/^[a-zA-Z0-9_\-]*$/, "Must only contain alphanumeric characters, underscores, or dashes."),
    image: yup.mixed(),
    imageUrl: yup.string(),
});
async function createProfile(chatSdk, args, setProgress) {
    if (chatSdk) {
        let imageUrl = args.imageUrl;
        setProgress("Creating your Profile...");
        const { instructions: claimInstructions, signers: claimSigners, output: { certificateMint }, } = await chatSdk.claimIdentifierInstructions({
            type: IdentifierType.User,
            identifier: args.username,
        });
        const { instructions, signers } = await chatSdk.initializeProfileInstructions({
            identifierCertificateMint: certificateMint,
            imageUrl,
            identifier: args.username,
        });
        await sendMultipleInstructions(chatSdk.errors || new Map(), chatSdk.provider, [claimInstructions[0], [...claimInstructions[1], ...instructions]], [claimSigners[0], [...claimSigners[1], ...signers]]);
    }
}
export function CreateProfileModal(props) {
    const formProps = useForm({
        //@ts-ignore
        resolver: yupResolver(validationSchema),
        defaultValues: {},
    });
    const { publicKey } = useWallet();
    const { register, handleSubmit, watch, clearErrors, setValue, setError, formState: { errors, isSubmitting }, } = formProps;
    const [step, setStep] = useState("");
    const { execute, loading, error } = useAsyncCallback(createProfile);
    const { chatSdk } = useChatSdk();
    const { awaitingApproval } = useProvider();
    const { handleErrors } = useErrorHandler();
    const { isOpen: loadWalletIsOpen, onClose, onOpen, } = useDisclosure({
        defaultIsOpen: true,
    });
    const { delegateWallet, needsInit, error: delegateError, loadingNeeds, loading: loadingDelegate, } = useLoadDelegate();
    const gaEventTracker = useAnalyticsEventTracker();
    const { username, image } = watch();
    const { account: profileAccount, info: profile, loading: loadingProfile, } = useWalletProfile(publicKey || undefined);
    const { wallet } = useWalletFromUsernameIdentifier(username);
    const { username: existingUsername } = useUsernameFromIdentifierCertificate(profile?.identifierCertificateMint, profile?.ownerWallet);
    const [isUploading, setIsUploading] = useState(false);
    useEffect(() => {
        if (profile) {
            setValue("imageUrl", profile.imageUrl);
        }
    }, [profile, setValue]);
    useEffect(() => {
        if (existingUsername)
            setValue("username", existingUsername);
    }, [existingUsername, setValue]);
    const userError = wallet && publicKey && !wallet.equals(publicKey) && (React.createElement(Box, null,
        "Username is already in owned by",
        " ",
        React.createElement(Link, { href: `https://explorer.solana.com/${wallet.toBase58()}` }, truncatePubkey(wallet))));
    handleErrors(error, delegateError);
    async function onSubmit(args) {
        if (!publicKey?.equals(STRATA_KEY) && args.username.length < 6 && !wallet) {
            setError("username", {
                message: "Username must be at least 6 characters.",
            });
            return;
        }
        await execute(chatSdk, args, setStep);
        if (props.onClose) {
            props.onClose();
        }
        gaEventTracker({
            action: "Create Profile",
        });
    }
    useEffect(() => {
        if (props.isOpen && !loadingNeeds && !needsInit) {
            onClose();
        }
    }, [loadingDelegate, props.isOpen, needsInit, onClose, loadingNeeds]);
    const onCloseCallback = useCallback(() => {
        props.onClose && props.onClose();
    }, [props.onClose]);
    const { result: chatStorage } = useChatStorageAccountKey();
    const hiddenFileInput = React.useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // @ts-ignore
        setValue("image", file || null);
        // @ts-ignore
        clearErrors("image");
    };
    const [imgUrl, setImgUrl] = useState();
    useEffect(() => {
        (async () => {
            if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImgUrl(event.target?.result || "");
                };
                reader.readAsDataURL(image);
                if (!imgUrl) {
                    setIsUploading(true);
                    randomizeFileName(image);
                    let innerImageUploaded = false;
                    try {
                        const uri = await uploadFiles(chatSdk.provider, [image], delegateWallet);
                        if (uri && uri.length > 0) {
                            setValue("imageUrl", uri[0]);
                            innerImageUploaded = true;
                        }
                    }
                    catch (e) {
                        handleErrors(e);
                    }
                    finally {
                        setIsUploading(false);
                        if (!innerImageUploaded) {
                            setValue("imageUrl", undefined);
                            setValue("image", undefined);
                            setImgUrl(undefined);
                            setError("image", {
                                message: "Image failed to upload, please try again",
                            });
                            if (hiddenFileInput.current) {
                                hiddenFileInput.current.value = "";
                            }
                        }
                    }
                }
            }
            else {
                setImgUrl(undefined);
            }
        })();
    }, [image]);
    if (props.isOpen && loadWalletIsOpen) {
        return (React.createElement(LoadWalletModal, { isOpen: true, onClose: () => {
                props.onClose && props.onClose();
                onClose();
            }, onLoaded: () => {
                onClose();
            } }));
    }
    return (React.createElement(Modal, { isOpen: true, onClose: onCloseCallback, size: "lg", isCentered: true, trapFocus: true, ...props },
        React.createElement(ModalOverlay, null),
        React.createElement(ModalContent, { borderRadius: "xl", shadow: "xl" },
            React.createElement(ModalBody, null,
                React.createElement(VStack, { pb: 4, pt: 4, spacing: 4, align: "left" },
                    React.createElement(FormProvider, { ...formProps },
                        React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                            React.createElement(Text, { fontSize: "xl", fontWeight: "bold", mb: 2 }, "Setup your Profile"),
                            React.createElement(VStack, null,
                                React.createElement(FormControlWithError, { id: "username", help: "Your username that will appear in the chat. You own your username. Upon claiming, you will receive a free Cardinal certificate NFT.", label: "Username", errors: errors },
                                    React.createElement(Input, { ...register("username") })),
                                userError && React.createElement(Alert, { status: "error" }, userError),
                                React.createElement(FormControl, { id: "image" },
                                    React.createElement(FormLabel, null, "Upload Picture"),
                                    React.createElement(HStack, { w: "full", spacing: 4 },
                                        React.createElement(Button, { size: "md", colorScheme: "primary", variant: "outline", onClick: () => hiddenFileInput.current.click(), disabled: isUploading }, "Choose Image"),
                                        image && (React.createElement(HStack, { spacing: 2, align: "center" },
                                            React.createElement(Image, { alt: image?.name, w: "32px", h: "32px", src: imgUrl }),
                                            React.createElement(Text, { color: "gray.500" }, image?.name),
                                            React.createElement(Icon, { w: "22px", h: "22px", color: "green.400", as: RiCheckFill })))),
                                    React.createElement("input", { id: "image", type: "file", accept: ".png,.jpg,.gif,.mp4,.svg", multiple: false, onChange: handleImageChange, ref: hiddenFileInput, style: { display: "none" } }),
                                    React.createElement(FormHelperText, { color: errors.image?.message && "red.400" }, errors.image?.message ||
                                        `The image that will be displayed as your pfp. Note that your first upload to SHDW can take up to 3 minutes depending on Solana confirmation times.`),
                                    isUploading && (React.createElement(Progress, { size: "xs", isIndeterminate: true, colorScheme: "orange", mt: 2 }))),
                                React.createElement(Button, { isDisabled: !!userError, isLoading: loading || isUploading, colorScheme: "primary", alignSelf: "flex-end", mr: 3, type: "submit", loadingText: isUploading ? "Uploading" : awaitingApproval ? "Awaiting Approval" : step }, "Save")))))))));
}
//# sourceMappingURL=CreateProfileModal.js.map
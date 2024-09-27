import React, { useEffect, useCallback, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VStack, Box, Text, ButtonGroup, Button, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, InputGroup, InputRightElement, Icon, Flex, HStack, Image, Progress, } from "@chakra-ui/react";
import { RiCheckLine, RiErrorWarningFill, RiCheckboxCircleFill, } from "react-icons/ri";
import { useWallet } from "@solana/wallet-adapter-react";
import { randomizeFileName, uploadFiles } from "@strata-foundation/chat";
import { useErrorHandler } from "@strata-foundation/react";
import { useChatSdk } from "../../contexts/chatSdk";
import { useChatStorageAccountKey } from "../../hooks/useChatStorageAccountKey";
import { useLoadDelegate } from "../../hooks/useLoadDelegate";
import { useWalletFromChatIdentifier } from "../../hooks/useWalletFromChatIdentifier";
import { FormControlWithError } from "../form/FormControlWithError";
import { STRATA_KEY } from "../../constants/globals";
const validationSchema = yup
    .object({
    name: yup.string().required().max(28),
    identifier: yup
        .string()
        .required()
        .max(28)
        .matches(/^[a-zA-Z0-9\_]+$/g, "must be alphanumeric and not have any spaces"),
    description: yup.string(),
    image: yup.mixed(),
    imageUrl: yup.string(),
})
    .required();
export const BasicInfo = ({ state, setState, onBack, onNext, }) => {
    const { publicKey: connectedWallet } = useWallet();
    const { chatSdk } = useChatSdk();
    const { handleErrors } = useErrorHandler();
    const { result: chatStorage } = useChatStorageAccountKey();
    const hiddenFileInput = useRef(null);
    const { imageUploaded } = state.wizardData;
    const [isUploading, setIsUploading] = useState(false);
    const [imgUrl, setImgUrl] = useState();
    const [isValidIdentifier, setIsValidIdentifier] = useState(null);
    const { delegateWallet, error: delegateError } = useLoadDelegate();
    handleErrors(delegateError);
    const { register, handleSubmit, watch, formState: { errors }, setValue, setError, clearErrors, } = useForm({
        mode: "onChange",
        //@ts-ignore
        resolver: yupResolver(validationSchema),
        defaultValues: {
            ...state.wizardData,
        },
    });
    const { name, identifier, image, imageUrl } = watch();
    const { publicKey } = useWallet();
    const { wallet: identifierOwner } = useWalletFromChatIdentifier(identifier);
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const helpTextColor = { color: "black", _dark: { color: "gray.400" } };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue("image", file || null);
        clearErrors("image");
    };
    const verifyIdentifier = useCallback((identifier, identifierOwner, connectedWallet) => {
        if (identifier === "") {
            setIsValidIdentifier(null);
            clearErrors("identifier");
        }
        else {
            if (identifier.length >= 6) {
                const ownsIdentifier = identifierOwner?.equals(connectedWallet);
                const isValid = !identifierOwner || ownsIdentifier;
                if (isValid) {
                    setIsValidIdentifier(true);
                }
                else {
                    setIsValidIdentifier(false);
                    setError("identifier", {
                        message: ".chat domain is already taken!",
                    });
                }
            }
        }
    }, []);
    useEffect(() => {
        verifyIdentifier(identifier, identifierOwner, connectedWallet);
    }, [identifier, identifierOwner]);
    const onSubmit = (data) => {
        if (!publicKey?.equals(STRATA_KEY) && data.identifier.length < 6 && !identifierOwner?.equals(connectedWallet)) {
            setError("identifier", {
                message: "Domain must be at least 6 characters.",
            });
            return;
        }
        setState({
            ...state,
            wizardData: {
                ...state.wizardData,
                ...data,
                imageUploaded: true,
            },
        });
        onNext();
    };
    useEffect(() => {
        (async () => {
            if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImgUrl(event.target?.result || "");
                };
                reader.readAsDataURL(image);
                if (!imageUrl) {
                    setIsUploading(true);
                    randomizeFileName(image);
                    let innerImageUploaded = false;
                    try {
                        const uri = await uploadFiles(chatSdk.provider, [image], delegateWallet);
                        if (uri && uri.length > 0) {
                            setValue("imageUrl", uri[0]);
                            innerImageUploaded = true;
                            setState({
                                ...state,
                                wizardData: {
                                    ...state.wizardData,
                                    imageUploaded: true,
                                },
                            });
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
    return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        React.createElement(VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
            React.createElement(Box, null,
                React.createElement(Text, { fontWeight: "bold", fontSize: "md" }, "Let's Start with the Basic info"),
                React.createElement(Text, { fontSize: "xs", fontWeight: "normal" }, "What do you want your chat to be called?")),
            React.createElement(FormControlWithError, { id: "name", label: "Name", errors: errors, help: "The name that will appear in the sidebar." },
                React.createElement(Input, { id: "name", variant: "filled", ...inputBg, ...register("name") })),
            React.createElement(FormControl, { isInvalid: !!errors.identifier?.message },
                React.createElement(FormLabel, { htmlFor: "identifier" }, ".chat Domain"),
                React.createElement(InputGroup, null,
                    React.createElement(Input, { id: "identifier", variant: "filled", ...inputBg, ...register("identifier") }),
                    isValidIdentifier && (React.createElement(InputRightElement, null,
                        React.createElement(RiCheckLine, { fontSize: "1.5rem" })))),
                !errors.identifier?.message ? (React.createElement(FormHelperText, { fontSize: "xs", ...helpTextColor, alignItems: "center", justifyContent: "center" }, isValidIdentifier ? (React.createElement(Flex, { alignItems: "center", color: "green.500" },
                    React.createElement(Icon, { as: RiCheckboxCircleFill, mr: 1, fontSize: "1.3rem" }),
                    React.createElement(Box, null, ".chat domain is available!"))) : ('The shortlink for the chat, i.e "solana" for solana.chat. You will receive an NFT representing ownership of the chat domain.'))) : (
                //@ts-ignore
                React.createElement(FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
                    React.createElement(Icon, { as: RiErrorWarningFill, mr: 1, fontSize: "1.3rem" }),
                    errors.identifier.message))),
            React.createElement(FormControlWithError, { id: "description", label: "Description", errors: errors, help: "The description of your chat (optional)" },
                React.createElement(Input, { id: "description", variant: "filled", ...inputBg, ...register("description") })),
            React.createElement(FormControl, { isInvalid: !!errors.image?.message },
                React.createElement(FormLabel, null, "Upload Picture"),
                React.createElement(HStack, { w: "full", spacing: 4 },
                    React.createElement(Button, { size: "sm", colorScheme: "primary", variant: "outline", onClick: () => hiddenFileInput.current.click(), disabled: isUploading }, "Choose Image"),
                    image && (React.createElement(HStack, { spacing: 2, align: "center" },
                        React.createElement(Image, { alt: image?.name, w: "32px", h: "32px", src: imgUrl }),
                        React.createElement(Text, { color: "gray.500" }, image?.name),
                        imageUploaded && (React.createElement(Icon, { w: "22px", h: "22px", color: "green.400", as: RiCheckboxCircleFill }))))),
                React.createElement("input", { id: "image", type: "file", accept: ".png,.jpg,.gif,.mp4,.svg", multiple: false, onChange: handleImageChange, ref: hiddenFileInput, style: { display: "none" } }),
                !errors.image?.message ? (React.createElement(FormHelperText, { fontSize: "xs", ...helpTextColor }, "The image that will appear in the sidebar.")) : (
                //@ts-ignore
                React.createElement(FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
                    React.createElement(Icon, { as: RiErrorWarningFill, mr: 2, fontSize: "1.3rem" }),
                    errors.image.message)),
                isUploading && (React.createElement(Progress, { size: "xs", isIndeterminate: true, colorScheme: "orange", mt: 2 }))),
            React.createElement(ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
                React.createElement(Button, { w: "full", onClick: onBack }, "Back"),
                React.createElement(Button, { w: "full", variant: "solid", type: "submit", disabled: !name ||
                        !isValidIdentifier ||
                        (!imageUrl && !image) ||
                        isUploading ||
                        !imageUploaded, isLoading: isUploading, loadingText: "Uploading image" }, "Next")))));
};
//# sourceMappingURL=BasicInfo.js.map
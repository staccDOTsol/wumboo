import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Text, Code, Stack, Image, ButtonGroup, Button, Flex, Heading, Progress, Alert, AlertIcon, AlertTitle, AlertDescription, } from "@chakra-ui/react";
import { CreateChatStep, ReadPostType, } from "./CreateChatModal";
const LabelCodeValue = ({ label, value, children, }) => (React.createElement(Flex, { gap: "2" },
    React.createElement(Code, { alignItems: "center", fontWeight: "bold", textTransform: "capitalize", lineHeight: "normal", py: 1, px: 2, display: "flex", flexShrink: 0 },
        label,
        ":"),
    value && (React.createElement(Text, { fontSize: "lg", noOfLines: 1, w: "auto" }, value)),
    children));
const NFTSummary = ({ permissionType, amount, collectionKey, onBack }) => (React.createElement(Stack, null,
    React.createElement(Box, null,
        React.createElement(Heading, { fontWeight: "bold", fontSize: "md", textTransform: "capitalize" },
            permissionType,
            " permission",
            " ",
            React.createElement(Button, { variant: "link", colorScheme: "primary", size: "xs", onClick: () => onBack({
                    read: CreateChatStep.ReadPermissions,
                    post: CreateChatStep.PostPermissions,
                }[permissionType]) }, "Edit")),
        React.createElement(Text, { fontSize: "xs", fontWeight: "normal" }, "You've decided to use an NFT collection.")),
    React.createElement(LabelCodeValue, { label: "Hold Amount", value: amount }),
    React.createElement(LabelCodeValue, { label: "Collection Key", value: collectionKey })));
const TokenSummary = ({ permissionType, isExisting, amount, mint, startingPrice, onBack }) => (React.createElement(Stack, null,
    React.createElement(Box, null,
        React.createElement(Heading, { fontWeight: "bold", fontSize: "md", textTransform: "capitalize" },
            permissionType,
            " permission",
            " ",
            React.createElement(Button, { variant: "link", colorScheme: "primary", size: "xs", onClick: () => onBack({
                    read: CreateChatStep.ReadPermissions,
                    post: CreateChatStep.PostPermissions,
                }[permissionType]) }, "Edit")),
        React.createElement(Text, { fontSize: "xs", fontWeight: "normal" }, isExisting ? (React.createElement(Text, null, "You've decided to use an existing token.")) : (React.createElement(Text, null, "You've decided to create a new token.")))),
    React.createElement(LabelCodeValue, { label: "Hold Amount", value: amount }),
    isExisting ? (React.createElement(LabelCodeValue, { label: "Existing Mint", value: mint })) : (React.createElement(LabelCodeValue, { label: "Starting Price (In SOL)", value: startingPrice }))));
export const Summary = ({ state, onBack, onNext }) => {
    //@ts-ignore
    const [imgUrl, setImgUrl] = useState();
    const { handleSubmit } = useForm();
    const onSubmit = (data) => onNext();
    const { status, subStatus, error, wizardData: { name, identifier, description, readType, readForm, postType, postForm, image, imageUrl, }, } = state;
    const isSubmitting = status === "submitting";
    useEffect(() => {
        if (image) {
            //@ts-ignore
            const reader = new FileReader();
            reader.onload = (event) => {
                setImgUrl(event.target?.result || "");
            };
            reader.readAsDataURL(image);
        }
        else {
            setImgUrl(undefined);
        }
    }, [image]);
    return (React.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        React.createElement(Stack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
            React.createElement(Box, null,
                React.createElement(Text, { fontWeight: "bold", fontSize: "md" }, "Please verify all the information up until this point"),
                React.createElement(Text, { fontSize: "xs", fontWeight: "normal" }, "You're almost there, one step away from your own gated chat!")),
            React.createElement(Stack, { w: "full", gap: 6 },
                React.createElement(Stack, null,
                    React.createElement(Heading, { fontSize: "lg" },
                        "Basic Info",
                        " ",
                        React.createElement(Button, { variant: "link", colorScheme: "primary", size: "xs", onClick: () => onBack(CreateChatStep.BasicInfo) }, "Edit")),
                    React.createElement(LabelCodeValue, { label: "name", value: name }),
                    React.createElement(LabelCodeValue, { label: "domain", value: identifier + ".chat" }),
                    React.createElement(LabelCodeValue, { label: "description", value: description }),
                    React.createElement(LabelCodeValue, { label: "image" },
                        React.createElement(Image, { alt: `${identifier}-chat-image`, w: "80px", h: "80px", src: imgUrl || imageUrl }))),
                React.createElement(Stack, { gap: 8 },
                    React.createElement(Stack, null, readType === ReadPostType.NFT ? (React.createElement(NFTSummary, { ...readForm, onBack: onBack, permissionType: "read" })) : (React.createElement(TokenSummary, { ...readForm, onBack: onBack, permissionType: "read" }))),
                    React.createElement(Stack, null, postType === ReadPostType.NFT ? (React.createElement(NFTSummary, { ...postForm, onBack: onBack, permissionType: "post" })) : (React.createElement(TokenSummary, { ...postForm, onBack: onBack, permissionType: "post" }))))),
            subStatus && (React.createElement(Text, { color: "primary.500", fontWeight: "bold" },
                subStatus,
                "\u00A0")),
            isSubmitting && (React.createElement(Progress, { size: "xs", isIndeterminate: true, colorScheme: "orange", mt: 2, w: "full" })),
            error && (React.createElement(Alert, { status: "error", variant: "subtle", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", height: "160px" },
                React.createElement(AlertIcon, { boxSize: "40px", mr: 0 }),
                React.createElement(AlertTitle, { mt: 2, mb: 1, fontSize: "lg" }, "Failed to create chat!"),
                React.createElement(AlertDescription, { maxWidth: "sm" },
                    error.message,
                    React.createElement("br", null),
                    "Please try again..."))),
            React.createElement(ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full", isDisabled: isSubmitting },
                React.createElement(Button, { w: "full", onClick: onBack }, "Back"),
                React.createElement(Button, { w: "full", variant: "solid", type: "submit", isLoading: isSubmitting, loadingText: "Creating Chat" }, "Create Chat")))));
};
//# sourceMappingURL=Summary.js.map
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Summary = void 0;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const react_2 = require("@chakra-ui/react");
const CreateChatModal_1 = require("./CreateChatModal");
const LabelCodeValue = ({ label, value, children, }) => (react_1.default.createElement(react_2.Flex, { gap: "2" },
    react_1.default.createElement(react_2.Code, { alignItems: "center", fontWeight: "bold", textTransform: "capitalize", lineHeight: "normal", py: 1, px: 2, display: "flex", flexShrink: 0 },
        label,
        ":"),
    value && (react_1.default.createElement(react_2.Text, { fontSize: "lg", noOfLines: 1, w: "auto" }, value)),
    children));
const NFTSummary = ({ permissionType, amount, collectionKey, onBack }) => (react_1.default.createElement(react_2.Stack, null,
    react_1.default.createElement(react_2.Box, null,
        react_1.default.createElement(react_2.Heading, { fontWeight: "bold", fontSize: "md", textTransform: "capitalize" },
            permissionType,
            " permission",
            " ",
            react_1.default.createElement(react_2.Button, { variant: "link", colorScheme: "primary", size: "xs", onClick: () => onBack({
                    read: CreateChatModal_1.CreateChatStep.ReadPermissions,
                    post: CreateChatModal_1.CreateChatStep.PostPermissions,
                }[permissionType]) }, "Edit")),
        react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" }, "You've decided to use an NFT collection.")),
    react_1.default.createElement(LabelCodeValue, { label: "Hold Amount", value: amount }),
    react_1.default.createElement(LabelCodeValue, { label: "Collection Key", value: collectionKey })));
const TokenSummary = ({ permissionType, isExisting, amount, mint, startingPrice, onBack }) => (react_1.default.createElement(react_2.Stack, null,
    react_1.default.createElement(react_2.Box, null,
        react_1.default.createElement(react_2.Heading, { fontWeight: "bold", fontSize: "md", textTransform: "capitalize" },
            permissionType,
            " permission",
            " ",
            react_1.default.createElement(react_2.Button, { variant: "link", colorScheme: "primary", size: "xs", onClick: () => onBack({
                    read: CreateChatModal_1.CreateChatStep.ReadPermissions,
                    post: CreateChatModal_1.CreateChatStep.PostPermissions,
                }[permissionType]) }, "Edit")),
        react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" }, isExisting ? (react_1.default.createElement(react_2.Text, null, "You've decided to use an existing token.")) : (react_1.default.createElement(react_2.Text, null, "You've decided to create a new token.")))),
    react_1.default.createElement(LabelCodeValue, { label: "Hold Amount", value: amount }),
    isExisting ? (react_1.default.createElement(LabelCodeValue, { label: "Existing Mint", value: mint })) : (react_1.default.createElement(LabelCodeValue, { label: "Starting Price (In SOL)", value: startingPrice }))));
const Summary = ({ state, onBack, onNext }) => {
    //@ts-ignore
    const [imgUrl, setImgUrl] = (0, react_1.useState)();
    const { handleSubmit } = (0, react_hook_form_1.useForm)();
    const onSubmit = (data) => onNext();
    const { status, subStatus, error, wizardData: { name, identifier, description, readType, readForm, postType, postForm, image, imageUrl, }, } = state;
    const isSubmitting = status === "submitting";
    (0, react_1.useEffect)(() => {
        if (image) {
            //@ts-ignore
            const reader = new FileReader();
            reader.onload = (event) => {
                var _a;
                setImgUrl(((_a = event.target) === null || _a === void 0 ? void 0 : _a.result) || "");
            };
            reader.readAsDataURL(image);
        }
        else {
            setImgUrl(undefined);
        }
    }, [image]);
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement(react_2.Stack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
            react_1.default.createElement(react_2.Box, null,
                react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "md" }, "Please verify all the information up until this point"),
                react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" }, "You're almost there, one step away from your own gated chat!")),
            react_1.default.createElement(react_2.Stack, { w: "full", gap: 6 },
                react_1.default.createElement(react_2.Stack, null,
                    react_1.default.createElement(react_2.Heading, { fontSize: "lg" },
                        "Basic Info",
                        " ",
                        react_1.default.createElement(react_2.Button, { variant: "link", colorScheme: "primary", size: "xs", onClick: () => onBack(CreateChatModal_1.CreateChatStep.BasicInfo) }, "Edit")),
                    react_1.default.createElement(LabelCodeValue, { label: "name", value: name }),
                    react_1.default.createElement(LabelCodeValue, { label: "domain", value: identifier + ".chat" }),
                    react_1.default.createElement(LabelCodeValue, { label: "description", value: description }),
                    react_1.default.createElement(LabelCodeValue, { label: "image" },
                        react_1.default.createElement(react_2.Image, { alt: `${identifier}-chat-image`, w: "80px", h: "80px", src: imgUrl || imageUrl }))),
                react_1.default.createElement(react_2.Stack, { gap: 8 },
                    react_1.default.createElement(react_2.Stack, null, readType === CreateChatModal_1.ReadPostType.NFT ? (react_1.default.createElement(NFTSummary, Object.assign({}, readForm, { onBack: onBack, permissionType: "read" }))) : (react_1.default.createElement(TokenSummary, Object.assign({}, readForm, { onBack: onBack, permissionType: "read" })))),
                    react_1.default.createElement(react_2.Stack, null, postType === CreateChatModal_1.ReadPostType.NFT ? (react_1.default.createElement(NFTSummary, Object.assign({}, postForm, { onBack: onBack, permissionType: "post" }))) : (react_1.default.createElement(TokenSummary, Object.assign({}, postForm, { onBack: onBack, permissionType: "post" })))))),
            subStatus && (react_1.default.createElement(react_2.Text, { color: "primary.500", fontWeight: "bold" },
                subStatus,
                "\u00A0")),
            isSubmitting && (react_1.default.createElement(react_2.Progress, { size: "xs", isIndeterminate: true, colorScheme: "orange", mt: 2, w: "full" })),
            error && (react_1.default.createElement(react_2.Alert, { status: "error", variant: "subtle", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", height: "160px" },
                react_1.default.createElement(react_2.AlertIcon, { boxSize: "40px", mr: 0 }),
                react_1.default.createElement(react_2.AlertTitle, { mt: 2, mb: 1, fontSize: "lg" }, "Failed to create chat!"),
                react_1.default.createElement(react_2.AlertDescription, { maxWidth: "sm" },
                    error.message,
                    react_1.default.createElement("br", null),
                    "Please try again..."))),
            react_1.default.createElement(react_2.ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full", isDisabled: isSubmitting },
                react_1.default.createElement(react_2.Button, { w: "full", onClick: onBack }, "Back"),
                react_1.default.createElement(react_2.Button, { w: "full", variant: "solid", type: "submit", isLoading: isSubmitting, loadingText: "Creating Chat" }, "Create Chat")))));
};
exports.Summary = Summary;
//# sourceMappingURL=Summary.js.map
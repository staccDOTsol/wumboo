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
exports.BasicInfo = void 0;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const yup = __importStar(require("yup"));
const react_2 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const chat_1 = require("@strata-foundation/chat");
const react_3 = require("@strata-foundation/react");
const chatSdk_1 = require("../../contexts/chatSdk");
const useChatStorageAccountKey_1 = require("../../hooks/useChatStorageAccountKey");
const useLoadDelegate_1 = require("../../hooks/useLoadDelegate");
const useWalletFromChatIdentifier_1 = require("../../hooks/useWalletFromChatIdentifier");
const FormControlWithError_1 = require("../form/FormControlWithError");
const globals_1 = require("../../constants/globals");
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
const BasicInfo = ({ state, setState, onBack, onNext, }) => {
    var _a, _b, _c, _d;
    const { publicKey: connectedWallet } = (0, wallet_adapter_react_1.useWallet)();
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { handleErrors } = (0, react_3.useErrorHandler)();
    const { result: chatStorage } = (0, useChatStorageAccountKey_1.useChatStorageAccountKey)();
    const hiddenFileInput = (0, react_1.useRef)(null);
    const { imageUploaded } = state.wizardData;
    const [isUploading, setIsUploading] = (0, react_1.useState)(false);
    const [imgUrl, setImgUrl] = (0, react_1.useState)();
    const [isValidIdentifier, setIsValidIdentifier] = (0, react_1.useState)(null);
    const { delegateWallet, error: delegateError } = (0, useLoadDelegate_1.useLoadDelegate)();
    handleErrors(delegateError);
    const { register, handleSubmit, watch, formState: { errors }, setValue, setError, clearErrors, } = (0, react_hook_form_1.useForm)({
        mode: "onChange",
        //@ts-ignore
        resolver: (0, yup_1.yupResolver)(validationSchema),
        defaultValues: Object.assign({}, state.wizardData),
    });
    const { name, identifier, image, imageUrl } = watch();
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { wallet: identifierOwner } = (0, useWalletFromChatIdentifier_1.useWalletFromChatIdentifier)(identifier);
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const helpTextColor = { color: "black", _dark: { color: "gray.400" } };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setValue("image", file || null);
        clearErrors("image");
    };
    const verifyIdentifier = (0, react_1.useCallback)((identifier, identifierOwner, connectedWallet) => {
        if (identifier === "") {
            setIsValidIdentifier(null);
            clearErrors("identifier");
        }
        else {
            if (identifier.length >= 6) {
                const ownsIdentifier = identifierOwner === null || identifierOwner === void 0 ? void 0 : identifierOwner.equals(connectedWallet);
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
    (0, react_1.useEffect)(() => {
        verifyIdentifier(identifier, identifierOwner, connectedWallet);
    }, [identifier, identifierOwner]);
    const onSubmit = (data) => {
        if (!(publicKey === null || publicKey === void 0 ? void 0 : publicKey.equals(globals_1.STRATA_KEY)) && data.identifier.length < 6 && !(identifierOwner === null || identifierOwner === void 0 ? void 0 : identifierOwner.equals(connectedWallet))) {
            setError("identifier", {
                message: "Domain must be at least 6 characters.",
            });
            return;
        }
        setState(Object.assign(Object.assign({}, state), { wizardData: Object.assign(Object.assign(Object.assign({}, state.wizardData), data), { imageUploaded: true }) }));
        onNext();
    };
    (0, react_1.useEffect)(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    var _a;
                    setImgUrl(((_a = event.target) === null || _a === void 0 ? void 0 : _a.result) || "");
                };
                reader.readAsDataURL(image);
                if (!imageUrl) {
                    setIsUploading(true);
                    (0, chat_1.randomizeFileName)(image);
                    let innerImageUploaded = false;
                    try {
                        const uri = yield (0, chat_1.uploadFiles)(chatSdk.provider, [image], delegateWallet);
                        if (uri && uri.length > 0) {
                            setValue("imageUrl", uri[0]);
                            innerImageUploaded = true;
                            setState(Object.assign(Object.assign({}, state), { wizardData: Object.assign(Object.assign({}, state.wizardData), { imageUploaded: true }) }));
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
        }))();
    }, [image]);
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
        react_1.default.createElement(react_2.VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
            react_1.default.createElement(react_2.Box, null,
                react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "md" }, "Let's Start with the Basic info"),
                react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" }, "What do you want your chat to be called?")),
            react_1.default.createElement(FormControlWithError_1.FormControlWithError, { id: "name", label: "Name", errors: errors, help: "The name that will appear in the sidebar." },
                react_1.default.createElement(react_2.Input, Object.assign({ id: "name", variant: "filled" }, inputBg, register("name")))),
            react_1.default.createElement(react_2.FormControl, { isInvalid: !!((_a = errors.identifier) === null || _a === void 0 ? void 0 : _a.message) },
                react_1.default.createElement(react_2.FormLabel, { htmlFor: "identifier" }, ".chat Domain"),
                react_1.default.createElement(react_2.InputGroup, null,
                    react_1.default.createElement(react_2.Input, Object.assign({ id: "identifier", variant: "filled" }, inputBg, register("identifier"))),
                    isValidIdentifier && (react_1.default.createElement(react_2.InputRightElement, null,
                        react_1.default.createElement(ri_1.RiCheckLine, { fontSize: "1.5rem" })))),
                !((_b = errors.identifier) === null || _b === void 0 ? void 0 : _b.message) ? (react_1.default.createElement(react_2.FormHelperText, Object.assign({ fontSize: "xs" }, helpTextColor, { alignItems: "center", justifyContent: "center" }), isValidIdentifier ? (react_1.default.createElement(react_2.Flex, { alignItems: "center", color: "green.500" },
                    react_1.default.createElement(react_2.Icon, { as: ri_1.RiCheckboxCircleFill, mr: 1, fontSize: "1.3rem" }),
                    react_1.default.createElement(react_2.Box, null, ".chat domain is available!"))) : ('The shortlink for the chat, i.e "solana" for solana.chat. You will receive an NFT representing ownership of the chat domain.'))) : (
                //@ts-ignore
                react_1.default.createElement(react_2.FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
                    react_1.default.createElement(react_2.Icon, { as: ri_1.RiErrorWarningFill, mr: 1, fontSize: "1.3rem" }),
                    errors.identifier.message))),
            react_1.default.createElement(FormControlWithError_1.FormControlWithError, { id: "description", label: "Description", errors: errors, help: "The description of your chat (optional)" },
                react_1.default.createElement(react_2.Input, Object.assign({ id: "description", variant: "filled" }, inputBg, register("description")))),
            react_1.default.createElement(react_2.FormControl, { isInvalid: !!((_c = errors.image) === null || _c === void 0 ? void 0 : _c.message) },
                react_1.default.createElement(react_2.FormLabel, null, "Upload Picture"),
                react_1.default.createElement(react_2.HStack, { w: "full", spacing: 4 },
                    react_1.default.createElement(react_2.Button, { size: "sm", colorScheme: "primary", variant: "outline", onClick: () => hiddenFileInput.current.click(), disabled: isUploading }, "Choose Image"),
                    image && (react_1.default.createElement(react_2.HStack, { spacing: 2, align: "center" },
                        react_1.default.createElement(react_2.Image, { alt: image === null || image === void 0 ? void 0 : image.name, w: "32px", h: "32px", src: imgUrl }),
                        react_1.default.createElement(react_2.Text, { color: "gray.500" }, image === null || image === void 0 ? void 0 : image.name),
                        imageUploaded && (react_1.default.createElement(react_2.Icon, { w: "22px", h: "22px", color: "green.400", as: ri_1.RiCheckboxCircleFill }))))),
                react_1.default.createElement("input", { id: "image", type: "file", accept: ".png,.jpg,.gif,.mp4,.svg", multiple: false, onChange: handleImageChange, ref: hiddenFileInput, style: { display: "none" } }),
                !((_d = errors.image) === null || _d === void 0 ? void 0 : _d.message) ? (react_1.default.createElement(react_2.FormHelperText, Object.assign({ fontSize: "xs" }, helpTextColor), "The image that will appear in the sidebar.")) : (
                //@ts-ignore
                react_1.default.createElement(react_2.FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
                    react_1.default.createElement(react_2.Icon, { as: ri_1.RiErrorWarningFill, mr: 2, fontSize: "1.3rem" }),
                    errors.image.message)),
                isUploading && (react_1.default.createElement(react_2.Progress, { size: "xs", isIndeterminate: true, colorScheme: "orange", mt: 2 }))),
            react_1.default.createElement(react_2.ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
                react_1.default.createElement(react_2.Button, { w: "full", onClick: onBack }, "Back"),
                react_1.default.createElement(react_2.Button, { w: "full", variant: "solid", type: "submit", disabled: !name ||
                        !isValidIdentifier ||
                        (!imageUrl && !image) ||
                        isUploading ||
                        !imageUploaded, isLoading: isUploading, loadingText: "Uploading image" }, "Next")))));
};
exports.BasicInfo = BasicInfo;
//# sourceMappingURL=BasicInfo.js.map
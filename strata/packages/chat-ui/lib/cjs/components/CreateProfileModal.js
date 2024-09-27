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
exports.CreateProfileModal = void 0;
const react_1 = require("@chakra-ui/react");
const yup_1 = require("@hookform/resolvers/yup");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const chat_1 = require("@strata-foundation/chat");
const react_2 = require("@strata-foundation/react");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const react_3 = __importStar(require("react"));
const react_async_hook_1 = require("react-async-hook");
const react_hook_form_1 = require("react-hook-form");
const ri_1 = require("react-icons/ri");
const yup = __importStar(require("yup"));
const globals_1 = require("../constants/globals");
const chatSdk_1 = require("../contexts/chatSdk");
const useAnalyticsEventTracker_1 = require("../hooks/useAnalyticsEventTracker");
const useChatStorageAccountKey_1 = require("../hooks/useChatStorageAccountKey");
const useLoadDelegate_1 = require("../hooks/useLoadDelegate");
const useUsernameFromIdentifierCertificate_1 = require("../hooks/useUsernameFromIdentifierCertificate");
const useWalletFromUsernameIdentifier_1 = require("../hooks/useWalletFromUsernameIdentifier");
const useWalletProfile_1 = require("../hooks/useWalletProfile");
const FormControlWithError_1 = require("./form/FormControlWithError");
const LoadWalletModal_1 = require("./LoadWalletModal");
const validationSchema = yup.object({
    username: yup
        .string()
        .required()
        .max(28)
        .matches(/^[a-zA-Z0-9_\-]*$/, "Must only contain alphanumeric characters, underscores, or dashes."),
    image: yup.mixed(),
    imageUrl: yup.string(),
});
function createProfile(chatSdk, args, setProgress) {
    return __awaiter(this, void 0, void 0, function* () {
        if (chatSdk) {
            let imageUrl = args.imageUrl;
            setProgress("Creating your Profile...");
            const { instructions: claimInstructions, signers: claimSigners, output: { certificateMint }, } = yield chatSdk.claimIdentifierInstructions({
                type: chat_1.IdentifierType.User,
                identifier: args.username,
            });
            const { instructions, signers } = yield chatSdk.initializeProfileInstructions({
                identifierCertificateMint: certificateMint,
                imageUrl,
                identifier: args.username,
            });
            yield (0, spl_utils_1.sendMultipleInstructions)(chatSdk.errors || new Map(), chatSdk.provider, [claimInstructions[0], [...claimInstructions[1], ...instructions]], [claimSigners[0], [...claimSigners[1], ...signers]]);
        }
    });
}
function CreateProfileModal(props) {
    var _a, _b;
    const formProps = (0, react_hook_form_1.useForm)({
        //@ts-ignore
        resolver: (0, yup_1.yupResolver)(validationSchema),
        defaultValues: {},
    });
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { register, handleSubmit, watch, clearErrors, setValue, setError, formState: { errors, isSubmitting }, } = formProps;
    const [step, setStep] = (0, react_3.useState)("");
    const { execute, loading, error } = (0, react_async_hook_1.useAsyncCallback)(createProfile);
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { awaitingApproval } = (0, react_2.useProvider)();
    const { handleErrors } = (0, react_2.useErrorHandler)();
    const { isOpen: loadWalletIsOpen, onClose, onOpen, } = (0, react_1.useDisclosure)({
        defaultIsOpen: true,
    });
    const { delegateWallet, needsInit, error: delegateError, loadingNeeds, loading: loadingDelegate, } = (0, useLoadDelegate_1.useLoadDelegate)();
    const gaEventTracker = (0, useAnalyticsEventTracker_1.useAnalyticsEventTracker)();
    const { username, image } = watch();
    const { account: profileAccount, info: profile, loading: loadingProfile, } = (0, useWalletProfile_1.useWalletProfile)(publicKey || undefined);
    const { wallet } = (0, useWalletFromUsernameIdentifier_1.useWalletFromUsernameIdentifier)(username);
    const { username: existingUsername } = (0, useUsernameFromIdentifierCertificate_1.useUsernameFromIdentifierCertificate)(profile === null || profile === void 0 ? void 0 : profile.identifierCertificateMint, profile === null || profile === void 0 ? void 0 : profile.ownerWallet);
    const [isUploading, setIsUploading] = (0, react_3.useState)(false);
    (0, react_3.useEffect)(() => {
        if (profile) {
            setValue("imageUrl", profile.imageUrl);
        }
    }, [profile, setValue]);
    (0, react_3.useEffect)(() => {
        if (existingUsername)
            setValue("username", existingUsername);
    }, [existingUsername, setValue]);
    const userError = wallet && publicKey && !wallet.equals(publicKey) && (react_3.default.createElement(react_1.Box, null,
        "Username is already in owned by",
        " ",
        react_3.default.createElement(react_1.Link, { href: `https://explorer.solana.com/${wallet.toBase58()}` }, (0, react_2.truncatePubkey)(wallet))));
    handleErrors(error, delegateError);
    function onSubmit(args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(publicKey === null || publicKey === void 0 ? void 0 : publicKey.equals(globals_1.STRATA_KEY)) && args.username.length < 6 && !wallet) {
                setError("username", {
                    message: "Username must be at least 6 characters.",
                });
                return;
            }
            yield execute(chatSdk, args, setStep);
            if (props.onClose) {
                props.onClose();
            }
            gaEventTracker({
                action: "Create Profile",
            });
        });
    }
    (0, react_3.useEffect)(() => {
        if (props.isOpen && !loadingNeeds && !needsInit) {
            onClose();
        }
    }, [loadingDelegate, props.isOpen, needsInit, onClose, loadingNeeds]);
    const onCloseCallback = (0, react_3.useCallback)(() => {
        props.onClose && props.onClose();
    }, [props.onClose]);
    const { result: chatStorage } = (0, useChatStorageAccountKey_1.useChatStorageAccountKey)();
    const hiddenFileInput = react_3.default.useRef(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        // @ts-ignore
        setValue("image", file || null);
        // @ts-ignore
        clearErrors("image");
    };
    const [imgUrl, setImgUrl] = (0, react_3.useState)();
    (0, react_3.useEffect)(() => {
        (() => __awaiter(this, void 0, void 0, function* () {
            if (image) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    var _a;
                    setImgUrl(((_a = event.target) === null || _a === void 0 ? void 0 : _a.result) || "");
                };
                reader.readAsDataURL(image);
                if (!imgUrl) {
                    setIsUploading(true);
                    (0, chat_1.randomizeFileName)(image);
                    let innerImageUploaded = false;
                    try {
                        const uri = yield (0, chat_1.uploadFiles)(chatSdk.provider, [image], delegateWallet);
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
        }))();
    }, [image]);
    if (props.isOpen && loadWalletIsOpen) {
        return (react_3.default.createElement(LoadWalletModal_1.LoadWalletModal, { isOpen: true, onClose: () => {
                props.onClose && props.onClose();
                onClose();
            }, onLoaded: () => {
                onClose();
            } }));
    }
    return (react_3.default.createElement(react_1.Modal, Object.assign({ isOpen: true, onClose: onCloseCallback, size: "lg", isCentered: true, trapFocus: true }, props),
        react_3.default.createElement(react_1.ModalOverlay, null),
        react_3.default.createElement(react_1.ModalContent, { borderRadius: "xl", shadow: "xl" },
            react_3.default.createElement(react_1.ModalBody, null,
                react_3.default.createElement(react_1.VStack, { pb: 4, pt: 4, spacing: 4, align: "left" },
                    react_3.default.createElement(react_hook_form_1.FormProvider, Object.assign({}, formProps),
                        react_3.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                            react_3.default.createElement(react_1.Text, { fontSize: "xl", fontWeight: "bold", mb: 2 }, "Setup your Profile"),
                            react_3.default.createElement(react_1.VStack, null,
                                react_3.default.createElement(FormControlWithError_1.FormControlWithError, { id: "username", help: "Your username that will appear in the chat. You own your username. Upon claiming, you will receive a free Cardinal certificate NFT.", label: "Username", errors: errors },
                                    react_3.default.createElement(react_1.Input, Object.assign({}, register("username")))),
                                userError && react_3.default.createElement(react_1.Alert, { status: "error" }, userError),
                                react_3.default.createElement(react_1.FormControl, { id: "image" },
                                    react_3.default.createElement(react_1.FormLabel, null, "Upload Picture"),
                                    react_3.default.createElement(react_1.HStack, { w: "full", spacing: 4 },
                                        react_3.default.createElement(react_1.Button, { size: "md", colorScheme: "primary", variant: "outline", onClick: () => hiddenFileInput.current.click(), disabled: isUploading }, "Choose Image"),
                                        image && (react_3.default.createElement(react_1.HStack, { spacing: 2, align: "center" },
                                            react_3.default.createElement(react_1.Image, { alt: image === null || image === void 0 ? void 0 : image.name, w: "32px", h: "32px", src: imgUrl }),
                                            react_3.default.createElement(react_1.Text, { color: "gray.500" }, image === null || image === void 0 ? void 0 : image.name),
                                            react_3.default.createElement(react_1.Icon, { w: "22px", h: "22px", color: "green.400", as: ri_1.RiCheckFill })))),
                                    react_3.default.createElement("input", { id: "image", type: "file", accept: ".png,.jpg,.gif,.mp4,.svg", multiple: false, onChange: handleImageChange, ref: hiddenFileInput, style: { display: "none" } }),
                                    react_3.default.createElement(react_1.FormHelperText, { color: ((_a = errors.image) === null || _a === void 0 ? void 0 : _a.message) && "red.400" }, ((_b = errors.image) === null || _b === void 0 ? void 0 : _b.message) ||
                                        `The image that will be displayed as your pfp. Note that your first upload to SHDW can take up to 3 minutes depending on Solana confirmation times.`),
                                    isUploading && (react_3.default.createElement(react_1.Progress, { size: "xs", isIndeterminate: true, colorScheme: "orange", mt: 2 }))),
                                react_3.default.createElement(react_1.Button, { isDisabled: !!userError, isLoading: loading || isUploading, colorScheme: "primary", alignSelf: "flex-end", mr: 3, type: "submit", loadingText: isUploading ? "Uploading" : awaitingApproval ? "Awaiting Approval" : step }, "Save")))))))));
}
exports.CreateProfileModal = CreateProfileModal;
//# sourceMappingURL=CreateProfileModal.js.map
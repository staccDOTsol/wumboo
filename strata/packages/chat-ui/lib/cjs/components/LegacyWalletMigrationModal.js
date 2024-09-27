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
exports.LegacyWalletMigrationModal = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const react_async_hook_1 = require("react-async-hook");
const ai_1 = require("react-icons/ai");
const chatSdk_1 = require("../contexts/chatSdk");
const useDelegateWallet_1 = require("../hooks/useDelegateWallet");
const Strata_1 = require("../svg/Strata");
const Wallet_1 = require("../svg/Wallet");
const LitProtocolWarning_1 = require("./LitProtocolWarning");
function migrate(mnemonic, chatSdk) {
    return __awaiter(this, void 0, void 0, function* () {
        if (mnemonic && chatSdk) {
            yield (chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.initializeSettings({
                settings: {
                    delegateWalletSeed: mnemonic,
                },
            }));
            localStorage.removeItem(useDelegateWallet_1.delegateWalletStorage.storageKey(chatSdk.provider.wallet.publicKey));
        }
    });
}
const DARK_BG = { bg: "gray.800" };
const LegacyWalletMigrationModal = () => {
    const { legacyMnemonic } = (0, useDelegateWallet_1.useDelegateWallet)();
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { handleErrors } = (0, react_2.useErrorHandler)();
    const [isOpen, setIsOpen] = (0, react_3.useState)(false);
    const { execute: exec, loading: migrating, error, } = (0, react_async_hook_1.useAsyncCallback)(migrate);
    handleErrors(error);
    (0, react_3.useEffect)(() => {
        if (legacyMnemonic) {
            setIsOpen(true);
        }
    }, [legacyMnemonic]);
    if (legacyMnemonic) {
        return (react_3.default.createElement(react_1.Modal, { size: "xl", isOpen: isOpen, onClose: () => { }, isCentered: true },
            react_3.default.createElement(react_1.ModalOverlay, null),
            react_3.default.createElement(react_1.ModalContent, { borderRadius: "xl", shadow: "xl" },
                react_3.default.createElement(react_1.ModalBody, { p: 0 },
                    react_3.default.createElement(react_1.Box, { position: "relative", p: 12, pt: 10, pb: 14, borderTopRadius: "lg", bg: "gray.200", _dark: DARK_BG },
                        react_3.default.createElement(react_1.Center, null,
                            react_3.default.createElement(react_1.HStack, { spacing: 8 },
                                react_3.default.createElement(react_1.Icon, { as: ai_1.AiOutlinePlus, w: "40px", h: "40px", color: "gray.600" }),
                                react_3.default.createElement(react_1.Icon, { as: Wallet_1.WalletIcon, w: "80px", h: "80px" }))),
                        react_3.default.createElement(react_1.Icon, { w: "62px", h: "59px", position: "absolute", bottom: "-28px", right: "calc(50% - 31px)", as: Strata_1.StrataIcon })),
                    react_3.default.createElement(react_1.VStack, { spacing: 6, align: "left", p: 12 },
                        react_3.default.createElement(react_1.Text, { textAlign: "center", fontSize: "xl", fontWeight: "bold" }, "Migrate chat wallet with Lit Protocol"),
                        react_3.default.createElement(LitProtocolWarning_1.LitProtocolWarning, null),
                        react_3.default.createElement(react_1.Button, { variant: "solid", colorScheme: "primary", onClick: () => __awaiter(void 0, void 0, void 0, function* () {
                                yield exec(legacyMnemonic, chatSdk);
                                setIsOpen(false);
                            }), loadingText: "Migrating...", isLoading: migrating }, "Migrate"))))));
    }
    return react_3.default.createElement("div", null);
};
exports.LegacyWalletMigrationModal = LegacyWalletMigrationModal;
//# sourceMappingURL=LegacyWalletMigrationModal.js.map
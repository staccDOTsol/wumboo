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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsHeader = void 0;
const react_1 = require("@chakra-ui/react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_2 = require("@strata-foundation/react");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const debounce_1 = __importDefault(require("lodash/debounce"));
const react_3 = __importStar(require("react"));
const ri_1 = require("react-icons/ri");
const chatSdk_1 = require("../../contexts/chatSdk");
const useChatOwnedAmounts_1 = require("../../hooks/useChatOwnedAmounts");
const useChat_1 = require("../../hooks/useChat");
const BuyMoreButton_1 = require("../BuyMoreButton");
const useChatPermissionsFromChat_1 = require("../../hooks/useChatPermissionsFromChat");
const spl_token_1 = require("@solana/spl-token");
const playSound = (0, debounce_1.default)(() => {
    const audio = new Audio("/notification.mp3");
    audio.addEventListener("canplaythrough", (event) => {
        // the audio is now playable; play it if permissions allow
        audio.play();
    });
}, 500);
const RoomsHeader = ({ chatKey }) => {
    const { info: chat } = (0, useChat_1.useChat)(chatKey);
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const readMintKey = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey;
    const postMintKey = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey;
    const [isMobile] = (0, react_1.useMediaQuery)("(max-width: 680px)");
    const readMint = (0, react_2.useMint)(readMintKey);
    const postMint = (0, react_2.useMint)(postMintKey);
    const { metadata: readMetadata, image: readImage } = (0, react_2.useTokenMetadata)(readMintKey);
    const { metadata: postMetadata, image: postImage } = (0, react_2.useTokenMetadata)(postMintKey);
    const { colorMode } = (0, react_1.useColorMode)();
    const { accelerator } = (0, react_2.useAccelerator)();
    const { cluster } = (0, react_2.useEndpoint)();
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { ownedReadAmount, ownedPostAmount, isSame } = (0, useChatOwnedAmounts_1.useChatOwnedAmounts)(publicKey || undefined, chatKey);
    const [settings, setSettings] = (0, react_2.useLocalStorage)("settings", {
        soundEnabled: true,
        visualEnabled: false,
    });
    (0, react_3.useEffect)(() => {
        const subId = (() => __awaiter(void 0, void 0, void 0, function* () {
            if (accelerator &&
                chatKey &&
                chatSdk &&
                publicKey &&
                (settings.soundEnabled || settings.visualEnabled)) {
                const subId = yield accelerator.onTransaction(cluster, chatKey, ({ logs, transaction, txid, blockTime }) => __awaiter(void 0, void 0, void 0, function* () {
                    const parts = yield chatSdk.getMessagePartsFromInflatedTx({
                        chat: chatKey,
                        txid,
                        blockTime,
                        logs,
                        transaction: {
                            signatures: [txid],
                            message: transaction.compileMessage(),
                        },
                    });
                    // Only notify for other people sending message
                    if (!document.hasFocus() &&
                        parts.some((part) => !part.sender.equals(publicKey))) {
                        playSound();
                    }
                }));
                return subId;
            }
        }))();
        return () => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                const id = yield subId;
                if (id && accelerator) {
                    accelerator.unsubscribeTransaction(id);
                }
            }))();
        };
    }, [settings, publicKey, accelerator, chatSdk, chatKey]);
    return (react_3.default.createElement(react_1.Flex, { align: "center", justify: "space-between", width: "100%", direction: "row" },
        react_3.default.createElement(react_1.Heading, { size: isMobile ? "md" : "md", noOfLines: 1 }, chat === null || chat === void 0 ? void 0 : chat.name),
        (chat === null || chat === void 0 ? void 0 : chat.name) && (react_3.default.createElement(react_1.Popover, { placement: "top-end" },
            react_3.default.createElement(react_1.PopoverTrigger, null,
                react_3.default.createElement(react_1.Box, { color: colorMode === "light" ? "black" : "white", _hover: { cursor: "pointer" } },
                    react_3.default.createElement(ri_1.RiSettings4Fill, { size: !isMobile ? 26 : 20 }))),
            react_3.default.createElement(react_1.Portal, null,
                react_3.default.createElement(react_1.PopoverContent, { mt: "10px", border: 0, bg: colorMode === "light" ? "gray.200" : "gray.800", borderRadius: "0 0 14px 14px" },
                    react_3.default.createElement(react_1.PopoverBody, { py: 6, px: 4 },
                        react_3.default.createElement(react_1.VStack, { alignItems: "start", spacing: 4 },
                            react_3.default.createElement(react_1.Heading, { size: "md" },
                                "Welcome To ",
                                chat.name),
                            react_3.default.createElement(react_1.Text, { color: colorMode === "light" ? "black.300" : "gray.400" }, "In order to participate in actions in this chat:"),
                            react_3.default.createElement(react_1.Box, { w: "full", fontSize: "sm" },
                                readMetadata && (react_3.default.createElement(react_1.HStack, { spacing: 1 },
                                    react_3.default.createElement(react_1.Text, null, "Read Message"),
                                    react_3.default.createElement(react_1.Flex, { grow: 1 },
                                        react_3.default.createElement(react_1.Divider, { variant: "dashed" })),
                                    react_3.default.createElement(react_1.Text, { fontWeight: "bold", textTransform: "capitalize" },
                                        "Hold",
                                        " ",
                                        (chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.defaultReadPermissionAmount) &&
                                            readMint &&
                                            (0, react_2.roundToDecimals)((0, spl_token_bonding_1.toNumber)(chatPermissions.defaultReadPermissionAmount, readMint), 4)),
                                    react_3.default.createElement(react_1.Avatar, { w: "18px", h: "18px", title: readMetadata === null || readMetadata === void 0 ? void 0 : readMetadata.data.symbol, src: readImage }))),
                                postMetadata && (react_3.default.createElement(react_1.HStack, { spacing: 1 },
                                    react_3.default.createElement(react_1.Text, null, "Post Message"),
                                    react_3.default.createElement(react_1.Flex, { grow: 1 },
                                        react_3.default.createElement(react_1.Divider, { variant: "dashed" })),
                                    react_3.default.createElement(react_1.Text, { fontWeight: "bold", textTransform: "capitalize" },
                                        Object.keys((chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionAction) || {})[0],
                                        " ",
                                        (chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionAmount) &&
                                            postMint &&
                                            (0, react_2.roundToDecimals)((0, spl_token_bonding_1.toNumber)(chatPermissions.postPermissionAmount, postMint), 4)),
                                    react_3.default.createElement(react_1.Avatar, { w: "18px", h: "18px", title: postMetadata === null || postMetadata === void 0 ? void 0 : postMetadata.data.symbol, src: postImage })))),
                            react_3.default.createElement(react_1.Box, { w: "full", fontSize: "sm" },
                                readMetadata && (react_3.default.createElement(react_1.HStack, { spacing: 1 },
                                    react_3.default.createElement(react_1.Text, null, "You currently have"),
                                    react_3.default.createElement(react_1.Flex, { grow: 1 },
                                        react_3.default.createElement(react_1.Divider, { variant: "dashed" })),
                                    react_3.default.createElement(react_1.Text, { fontWeight: "bold", textTransform: "capitalize" }, ownedReadAmount
                                        ? (0, react_2.roundToDecimals)(ownedReadAmount, 4)
                                        : 0),
                                    react_3.default.createElement(react_1.Avatar, { w: "18px", h: "18px", title: readMetadata === null || readMetadata === void 0 ? void 0 : readMetadata.data.symbol, src: readImage }))),
                                !isSame && postMetadata && (react_3.default.createElement(react_1.HStack, { spacing: 1 },
                                    react_3.default.createElement(react_1.Text, null, "You currently have"),
                                    react_3.default.createElement(react_1.Flex, { grow: 1 },
                                        react_3.default.createElement(react_1.Divider, { variant: "dashed" })),
                                    react_3.default.createElement(react_1.Text, { fontWeight: "bold", textTransform: "capitalize" }, ownedPostAmount
                                        ? (0, react_2.roundToDecimals)(ownedPostAmount, 4)
                                        : 0),
                                    react_3.default.createElement(react_1.Avatar, { w: "18px", h: "18px", title: readMetadata === null || readMetadata === void 0 ? void 0 : readMetadata.data.symbol, src: postImage })))),
                            react_3.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: readMintKey, btnProps: { w: "full", size: "md" } }),
                            !isSame &&
                                chatPermissions &&
                                !spl_token_1.NATIVE_MINT.equals(chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey) && (react_3.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey, btnProps: { px: 16, size: "md", variant: "solid" } })),
                            react_3.default.createElement(react_1.Box, { w: "full" },
                                react_3.default.createElement(react_1.Divider, { mt: 4, mb: 2 })),
                            react_3.default.createElement(react_1.Heading, { size: "md" }, "Settings"),
                            react_3.default.createElement(react_1.Box, { w: "full" },
                                react_3.default.createElement(react_1.FormControl, { display: "flex", alignItems: "center", justifyContent: "space-between" },
                                    react_3.default.createElement(react_1.FormLabel, { htmlFor: "noise-alerts", mb: "0" }, "Sound notifications"),
                                    react_3.default.createElement(react_1.Switch, { isChecked: settings.soundEnabled, id: "noise-alerts", colorScheme: "primary", onChange: (e) => setSettings(Object.assign(Object.assign({}, settings), { soundEnabled: e.target.checked })) })))))))))));
};
exports.RoomsHeader = RoomsHeader;
//# sourceMappingURL=RoomsHeader.js.map
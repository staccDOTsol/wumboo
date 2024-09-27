"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatboxWithGuards = void 0;
const react_1 = require("@chakra-ui/react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const react_2 = require("@strata-foundation/react");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const useChatPermissionsFromChat_1 = require("../../hooks/useChatPermissionsFromChat");
const react_3 = __importDefault(require("react"));
const useLoadDelegate_1 = require("../../hooks/useLoadDelegate");
const useChatOwnedAmounts_1 = require("../../hooks/useChatOwnedAmounts");
const BuyMoreButton_1 = require("../BuyMoreButton");
const LoadWalletModal_1 = require("../LoadWalletModal");
const Chatbox_1 = require("./Chatbox");
const spl_token_1 = require("@solana/spl-token");
const DARK_BG = {
    bg: "linear-gradient(0deg, rgba(17,24,39) 40%, rgba(21,24,38,0) 100%)",
};
function ChatboxWithGuards({ chatKey, onAddPendingMessage, files, setFiles, onUploadFile, }) {
    const { isOpen: loadWalletIsOpen, onOpen: onOpenLoadWallet, onClose: onCloseLoadWallet, } = (0, react_1.useDisclosure)();
    const { connected, publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { setVisible } = (0, wallet_adapter_react_ui_1.useWalletModal)();
    const { delegateWallet, needsTopOff, needsInit, loading: loadingDelegate, error: delegateError, } = (0, useLoadDelegate_1.useLoadDelegate)();
    const { isOpen: delegateIsOpen, onClose: closeDelegate, onOpen: openDelegate, } = (0, react_1.useDisclosure)({
        defaultIsOpen: false,
    });
    const { handleErrors } = (0, react_2.useErrorHandler)();
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const readMintKey = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey;
    const postMintKey = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey;
    const readMint = (0, react_2.useMint)(readMintKey);
    const postMint = (0, react_2.useMint)(postMintKey);
    const { metadata: readMetadata, image: readImage } = (0, react_2.useTokenMetadata)(readMintKey);
    const { metadata: postMetadata, image: postImage } = (0, react_2.useTokenMetadata)(postMintKey);
    const { ownedReadAmount, ownedPostAmount, isSame } = (0, useChatOwnedAmounts_1.useChatOwnedAmounts)(publicKey || undefined, chatKey);
    const postAmount = (chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionAmount) &&
        postMint &&
        (0, spl_token_bonding_1.toNumber)(chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionAmount, postMint);
    const hasEnough = typeof postAmount == "undefined" ||
        typeof ownedPostAmount == "undefined" ||
        ownedPostAmount >= postAmount;
    handleErrors(delegateError);
    return (react_3.default.createElement(react_1.Flex, { w: "full", position: "relative" }, !connected || !hasEnough || needsTopOff ? (react_3.default.createElement(react_1.Flex, { position: "absolute", bottom: "0", pb: 12, pt: 40, w: "full", justify: "center", bg: "linear-gradient(0deg, rgba(255,255,255) 40%, rgba(255,255,255,0) 100%)", _dark: DARK_BG },
        react_3.default.createElement(react_1.VStack, { w: "full", h: "full", justify: "center", align: "center", maxW: "360px" }, !connected ? (react_3.default.createElement(react_3.default.Fragment, null,
            react_3.default.createElement(react_1.Button, { size: "md", colorScheme: "primary", onClick: () => setVisible(true), px: 16 }, "Connect Wallet"))) : !hasEnough ? (react_3.default.createElement(react_3.default.Fragment, null,
            react_3.default.createElement(react_1.Text, { fontWeight: "bold", align: "center" }, "In order to participate in this chat:"),
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
                    react_3.default.createElement(react_1.Avatar, { w: "18px", h: "18px", title: postMetadata === null || postMetadata === void 0 ? void 0 : postMetadata.data.symbol, src: postImage })))),
            react_3.default.createElement(react_1.Box, { pt: 4 },
                react_3.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey, btnProps: { px: 16, size: "md", variant: "solid" } }),
                !isSame &&
                    chatPermissions &&
                    !spl_token_1.NATIVE_MINT.equals(chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey) && (react_3.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey, btnProps: { px: 16, size: "md", variant: "solid" } }))))) : needsTopOff ? (react_3.default.createElement(react_3.default.Fragment, null,
            react_3.default.createElement(LoadWalletModal_1.LoadWalletModal, { isOpen: loadWalletIsOpen, onClose: onCloseLoadWallet, onLoaded: () => onCloseLoadWallet() }),
            react_3.default.createElement(react_1.Flex, { justify: "center", mb: "6px" },
                react_3.default.createElement(react_1.Button, { isLoading: loadingDelegate, size: "md", colorScheme: "primary", onClick: () => onOpenLoadWallet(), px: 16 }, "Top Off Chat Wallet")))) : null))) : (react_3.default.createElement(react_1.VStack, { w: "full" },
        !delegateWallet && (react_3.default.createElement(react_1.HStack, { mb: -3, mt: 1, fontSize: "sm" },
            react_3.default.createElement(react_1.Text, { fontWeight: "bold" }, "Tired of approving transactions?"),
            react_3.default.createElement(react_1.Button, { fontSize: "sm", variant: "link", size: "md", colorScheme: "primary", onClick: () => openDelegate(), px: 16 }, "Load Delegate Wallet"))),
        (needsTopOff || needsInit) && (react_3.default.createElement(LoadWalletModal_1.LoadWalletModal, { isOpen: delegateIsOpen, onClose: closeDelegate, onLoaded: closeDelegate })),
        react_3.default.createElement(Chatbox_1.Chatbox, { chatKey: chatKey, onAddPendingMessage: onAddPendingMessage, files: files, setFiles: setFiles, onUploadFile: onUploadFile })))));
}
exports.ChatboxWithGuards = ChatboxWithGuards;
//# sourceMappingURL=ChatboxWithGuards.js.map
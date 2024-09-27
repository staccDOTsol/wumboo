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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemodMessage = exports.Message = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const chat_1 = require("@strata-foundation/chat");
const react_3 = require("@strata-foundation/react");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const moment_1 = __importDefault(require("moment"));
const react_async_hook_1 = require("react-async-hook");
const bs_1 = require("react-icons/bs");
const BuyMoreButton_1 = require("../BuyMoreButton");
const emojis_1 = require("../../contexts/emojis");
const sendMessage_1 = require("../../contexts/sendMessage");
const reply_1 = require("../../contexts/reply");
const useWalletProfile_1 = require("../../hooks/useWalletProfile");
const useChatOwnedAmounts_1 = require("../../hooks/useChatOwnedAmounts");
const useChatPermissionsFromChat_1 = require("../../hooks/useChatPermissionsFromChat");
const MessageBody_1 = require("./MessageBody");
const MessageToolbar_1 = require("./MessageToolbar");
const DisplayReply_1 = require("./DisplayReply");
const MessageHeader_1 = require("./MessageHeader");
const Reacts_1 = require("./Reacts");
const MessageStatus_1 = require("./MessageStatus");
const defaultOptions = {
    allowedTags: ["b", "i", "em", "strong", "a", "code", "ul", "li", "p"],
    allowedAttributes: {
        a: ["href", "target"],
    },
};
function Message(props) {
    const ref = (0, react_1.useRef)();
    const [isActive, setIsActive] = (0, react_1.useState)(false);
    (0, react_2.useOutsideClick)({
        ref: ref,
        handler: () => setIsActive(false),
    });
    const { id: messageId, getDecodedMessage, sender, readPermissionAmount, chatKey, txids, startBlockTime, htmlAllowlist = defaultOptions, reacts, type: messageType, showUser = true, pending = false, reply, scrollToMessage, } = props;
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { referenceMessageId: emojiReferenceMessageId, showPicker } = (0, emojis_1.useEmojis)();
    const { info: profile } = (0, useWalletProfile_1.useWalletProfile)(sender);
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const time = (0, react_1.useMemo)(() => {
        if (startBlockTime) {
            const t = new Date(0);
            t.setUTCSeconds(startBlockTime);
            return t;
        }
    }, [startBlockTime]);
    const readMint = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey;
    const mintAcc = (0, react_3.useMint)(readMint);
    const { metadata } = (0, react_3.useTokenMetadata)(readMint);
    const tokenAmount = mintAcc &&
        readPermissionAmount &&
        (0, spl_utils_1.humanReadable)(readPermissionAmount, mintAcc);
    const { ownedReadAmount, ownedPostAmount } = (0, useChatOwnedAmounts_1.useChatOwnedAmounts)(publicKey || undefined, chatKey);
    const notEnoughTokens = (0, react_1.useMemo)(() => {
        return (readPermissionAmount &&
            mintAcc &&
            (ownedReadAmount || 0) < (0, spl_utils_1.toNumber)(readPermissionAmount, mintAcc));
    }, [readPermissionAmount, mintAcc, ownedReadAmount]);
    // Re decode if not enough tokens changes
    const getDecodedMessageOrIdentity = (_) => getDecodedMessage ? getDecodedMessage() : Promise.resolve(undefined);
    const { result: message, loading: decoding, error: decodeError, } = (0, react_async_hook_1.useAsync)(getDecodedMessageOrIdentity, [notEnoughTokens]);
    const lockedColor = (0, react_2.useColorModeValue)("gray.400", "gray.600");
    const highlightedBg = (0, react_2.useColorModeValue)("gray.200", "gray.800");
    const { handleErrors } = (0, react_3.useErrorHandler)();
    const { sendMessage, error } = (0, sendMessage_1.useSendMessage)();
    handleErrors(error, decodeError);
    const handleOnReaction = (0, react_1.useCallback)(() => {
        showPicker(messageId);
    }, [showPicker, messageId]);
    const { replyMessage } = (0, reply_1.useReply)();
    const bg = (0, react_1.useMemo)(() => messageId === emojiReferenceMessageId ||
        messageId === (replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.id) ||
        isActive
        ? highlightedBg
        : "initial", [
        highlightedBg,
        emojiReferenceMessageId,
        messageId,
        replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.id,
        isActive,
    ]);
    const textColor = (0, react_2.useColorModeValue)("black", "white");
    const loadingSkeleton = (0, react_1.useMemo)(() => {
        return (react_1.default.createElement(react_2.Skeleton, { startColor: lockedColor, height: "20px" }, Array.from({ length: genLength(messageId || "") }, () => ".").join()));
    }, [messageId, lockedColor]);
    const buyMoreTrigger = (0, react_1.useCallback)((props) => {
        return (react_1.default.createElement(react_2.Tooltip, { label: `You need ${tokenAmount} ${metadata === null || metadata === void 0 ? void 0 : metadata.data.symbol} to read this message` },
            react_1.default.createElement(react_2.HStack, { onClick: props.onClick, spacing: 2, _hover: { cursor: "pointer" } },
                react_1.default.createElement(react_2.Skeleton, { startColor: lockedColor, height: "20px", speed: 100000 }, Array.from({ length: genLength(messageId || "") }, () => ".").join()),
                react_1.default.createElement(react_2.Icon, { color: lockedColor, as: bs_1.BsLockFill }))));
    }, [tokenAmount, metadata, lockedColor, messageId]);
    // LEGACY: If this is a reaction before message types were stored on the top level instead of json
    if ((message === null || message === void 0 ? void 0 : message.type) === chat_1.MessageType.React) {
        return null;
    }
    return (react_1.default.createElement(react_2.Box, { ref: ref, onMouseEnter: () => setIsActive(true), onMouseLeave: () => setIsActive(false), onClick: () => setIsActive(true), position: "relative" },
        isActive && (react_1.default.createElement(react_2.Flex, { position: "absolute", right: {
                base: 8,
                md: 28,
            }, top: -4, zIndex: 1, justifyContent: "flex-end", alignItems: "flex-end", onClick: (e) => e.preventDefault() },
            react_1.default.createElement(MessageToolbar_1.MessageToolbar, Object.assign({}, props)))),
        react_1.default.createElement(react_2.Box, { bg: bg },
            react_1.default.createElement(react_2.VStack, { spacing: 0, gap: 0, w: "full" },
                reply && (react_1.default.createElement(DisplayReply_1.DisplayReply, { reply: reply, scrollToMessage: scrollToMessage })),
                react_1.default.createElement(react_2.HStack, { pl: 2, pr: 2, pb: 1, pt: reply ? 0 : 1, w: "full", align: "start", spacing: 2, className: "strata-message" },
                    showUser ? (react_1.default.createElement(react_2.Avatar, { mt: "6px", size: "sm", src: profile === null || profile === void 0 ? void 0 : profile.imageUrl })) : (react_1.default.createElement(react_2.Box, { w: "34px" })),
                    react_1.default.createElement(react_2.VStack, { w: "full", align: "start", spacing: 0 },
                        showUser && (react_1.default.createElement(MessageHeader_1.MessageHeader, { chatKey: chatKey, sender: sender, startBlockTime: startBlockTime })),
                        react_1.default.createElement(react_2.Box, { w: "fit-content", position: "relative", textAlign: "left", wordBreak: "break-word", color: textColor, id: messageId }, !notEnoughTokens && message && messageType ? (react_1.default.createElement(MessageBody_1.MessageBody, { htmlAllowlist: htmlAllowlist, message: message, messageType: messageType })) : decoding ? (loadingSkeleton) : notEnoughTokens ? (react_1.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: readMint, trigger: buyMoreTrigger })) : (react_1.default.createElement(react_2.Tooltip, { label: `Failed to decode message` },
                            react_1.default.createElement(react_2.Skeleton, { startColor: lockedColor, height: "20px", speed: 100000 }, Array.from({ length: genLength(messageId || "") }, () => ".").join())))),
                        reacts && reacts.length > 0 && (react_1.default.createElement(Reacts_1.Reacts, { onAddReaction: handleOnReaction, reacts: reacts, onReact: (emoji, mine) => {
                                if (!mine)
                                    sendMessage({
                                        message: {
                                            type: chat_1.MessageType.React,
                                            emoji: emoji,
                                            referenceMessageId: messageId,
                                        },
                                    });
                            } }))),
                    react_1.default.createElement(react_2.HStack, { alignItems: "center", flexShrink: 0 },
                        showUser && (react_1.default.createElement(react_2.Hide, { below: "md" },
                            react_1.default.createElement(react_2.Text, { fontSize: "xs", color: "gray.500", _dark: { color: "gray.400" } }, (0, moment_1.default)(time).format("LT")))),
                        react_1.default.createElement(MessageStatus_1.MessageStatus, { txids: txids, pending: pending })))))));
}
exports.Message = Message;
const lengths = {};
function genLength(id) {
    if (!lengths[id]) {
        lengths[id] = 10 + Math.random() * 100;
    }
    return lengths[id];
}
exports.MemodMessage = react_1.default.memo(Message);
//# sourceMappingURL=Message.js.map
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
exports.Chatbox = void 0;
const react_1 = require("@chakra-ui/react");
const ai_1 = require("react-icons/ai");
const ai_2 = require("react-icons/ai");
const chat_1 = require("@strata-foundation/chat");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const react_async_hook_1 = require("react-async-hook");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const ai_3 = require("react-icons/ai");
const io_1 = require("react-icons/io");
const showdown_1 = require("showdown");
const sendMessage_1 = require("../../contexts/sendMessage");
const reply_1 = require("../../contexts/reply");
const useEmojiSearch_1 = require("../../hooks/useEmojiSearch");
const Files_1 = require("../Files");
const GifSearch_1 = require("../GifSearch");
const LongPromiseNotification_1 = require("../LongPromiseNotification");
const ChatInput_1 = require("./ChatInput");
const ReplyBar_1 = require("./ReplyBar");
const useAnalyticsEventTracker_1 = require("../../hooks/useAnalyticsEventTracker");
const useChatPermissionsFromChat_1 = require("../../hooks/useChatPermissionsFromChat");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const converter = new showdown_1.Converter({
    simpleLineBreaks: true,
});
const popoverWidth = {
    base: "full",
    md: "50%",
};
function Chatbox({ chatKey, onAddPendingMessage: inputOnAddPendingMessage, files, setFiles, onUploadFile, }) {
    const inputRef = (0, react_3.useRef)(null);
    const [input, setInput] = (0, react_3.useState)("");
    const { emojis, search, searchMatch, reset: resetEmoji } = (0, useEmojiSearch_1.useEmojiSearch)();
    const { isOpen: isGifyOpen, onToggle: onToggleGify, onClose: onCloseGify, } = (0, react_1.useDisclosure)();
    const gaEventTracker = (0, useAnalyticsEventTracker_1.useAnalyticsEventTracker)();
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const { metadata } = (0, react_2.useTokenMetadata)(chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey);
    const readMint = (0, react_2.useMint)(chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey);
    const chatBg = (0, react_1.useColorModeValue)("gray.100", "gray.800");
    const { handleErrors } = (0, react_2.useErrorHandler)();
    const { isOpen: isPermissionModalOpen, onClose: onPermissionsClose, onOpen: onPermissionsOpen } = (0, react_1.useDisclosure)();
    const [readPermissionInputAmount, setReadPermissionInputAmount] = (0, react_3.useState)();
    (0, react_3.useEffect)(() => {
        if (readMint && chatPermissions) {
            setReadPermissionInputAmount((0, spl_utils_1.toNumber)(chatPermissions.defaultReadPermissionAmount, readMint).toString());
        }
    }, [readMint, chatPermissions]);
    const [readPermissionAmount, setReadPermissionAmount] = (0, react_3.useState)();
    const [loading, setLoading] = (0, react_3.useState)(false);
    const { sendMessage: sendMessageImpl, error } = (0, sendMessage_1.useSendMessage)();
    const onCancelFile = (0, react_3.useCallback)((file) => setFiles((files) => files.filter((f) => f.file != file)), [setFiles]);
    const { replyMessage, hideReply } = (0, reply_1.useReply)();
    (0, react_3.useEffect)(() => {
        var _a;
        if (replyMessage)
            (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
    }, [replyMessage]);
    const onAddPendingMessage = (msg) => {
        setLoading(false);
        if (inputOnAddPendingMessage) {
            inputOnAddPendingMessage(msg);
        }
    };
    const { execute: sendMessage } = (0, react_async_hook_1.useAsyncCallback)((m) => __awaiter(this, void 0, void 0, function* () {
        setInput("");
        resetEmoji();
        setLoading(true);
        hideReply();
        try {
            if (replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.id)
                m.referenceMessageId = replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.id;
            const msgArgs = { message: m, onAddPendingMessage };
            if (readPermissionAmount) {
                msgArgs.readPermissionAmount = (0, spl_utils_1.toBN)(readPermissionAmount, readMint);
                setReadPermissionAmount(undefined);
            }
            // Show toast if uploading files
            if (m.fileAttachments && m.fileAttachments.length > 0) {
                const text = `Uploading ${m.fileAttachments.map((f) => f.name)} to SHDW Drive...`;
                react_hot_toast_1.default.custom((t) => (react_3.default.createElement(LongPromiseNotification_1.LongPromiseNotification, { estTimeMillis: 1 * 60 * 1000, text: text, onError: (e) => {
                        handleErrors(e);
                        react_hot_toast_1.default.dismiss(t.id);
                    }, exec: () => __awaiter(this, void 0, void 0, function* () {
                        yield sendMessageImpl(msgArgs);
                        return true;
                    }), onComplete: () => __awaiter(this, void 0, void 0, function* () {
                        react_hot_toast_1.default.dismiss(t.id);
                    }) })), {
                    duration: Infinity,
                });
                setFiles([]);
            }
            else {
                yield sendMessageImpl(msgArgs);
            }
        }
        finally {
            setLoading(false);
        }
        gaEventTracker({
            action: "Send Message",
        });
    }));
    const handleChange = (0, react_3.useCallback)((e) => __awaiter(this, void 0, void 0, function* () {
        const content = e.currentTarget.value;
        search(e);
        setInput(content);
    }), [setInput, search]);
    const handleKeyDown = (0, react_3.useCallback)((ev) => {
        if (ev.key === "Enter") {
            if (!ev.shiftKey) {
                ev.preventDefault();
                sendMessage({
                    type: chat_1.MessageType.Html,
                    html: converter.makeHtml(input.replace("\n", "\n\n")),
                    fileAttachments: files,
                });
            }
        }
    }, [sendMessage, files, input]);
    (0, react_3.useEffect)(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "0px";
            const scrollHeight = inputRef.current.scrollHeight;
            inputRef.current.style.height = scrollHeight + "px";
        }
    }, [inputRef, input]);
    const handleSendClick = (0, react_3.useCallback)(() => sendMessage({
        type: chat_1.MessageType.Html,
        html: converter.makeHtml(input),
        fileAttachments: files,
    }), [sendMessage, input, files]);
    const handleEmojiClick = (native) => {
        var _a;
        setInput([`:${searchMatch}`, `:${searchMatch}:`].reduce((acc, string) => acc.replace(string, native), input));
        (_a = inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
        resetEmoji();
    };
    handleErrors(error);
    return (react_3.default.createElement(react_3.default.Fragment, null,
        react_3.default.createElement(react_1.Flex, { direction: "column", position: "sticky", bottom: 0, p: 2, w: "full", minH: "76px" },
            react_3.default.createElement(react_1.Popover, { matchWidth: true, isOpen: emojis.length > 0, placement: "top", autoFocus: false, closeOnBlur: false },
                react_3.default.createElement(react_1.PopoverTrigger, null,
                    react_3.default.createElement(react_1.Flex, { w: "full" })),
                react_3.default.createElement(react_1.PopoverContent, { bg: chatBg, border: "none", w: popoverWidth },
                    react_3.default.createElement(react_1.PopoverBody, { px: 0, pt: 0 },
                        react_3.default.createElement(react_1.VStack, { spacing: 0, w: "full", align: "start" },
                            react_3.default.createElement(react_1.Text, { p: 2, fontSize: "xs", fontWeight: "bold", textTransform: "uppercase", lineHeight: "normal" },
                                "Emojis Matching :",
                                react_3.default.createElement(react_1.Text, { as: "span", textTransform: "none" }, searchMatch)),
                            react_3.default.createElement(react_1.Divider, null),
                            emojis.map((e, indx) => (react_3.default.createElement(react_1.HStack, { w: "full", p: 2, key: e.name, onClick: () => handleEmojiClick(e.skins[0].native), _hover: {
                                    cursor: "pointer",
                                    bg: "gray.200",
                                    _dark: {
                                        bg: "gray.700",
                                    },
                                } },
                                react_3.default.createElement(react_1.Text, { fontSize: "xl" }, e.skins[0].native),
                                react_3.default.createElement(react_1.Text, { fontSize: "sm" }, e.name)))))))),
            react_3.default.createElement(react_1.VStack, { p: "10px", spacing: 2, w: "full", align: "left", bg: chatBg, rounded: "lg" },
                react_3.default.createElement(Files_1.Files, { files: files, onCancelFile: onCancelFile }),
                readPermissionAmount && (react_3.default.createElement(react_1.HStack, { spacing: 1, alignItems: "center" },
                    react_3.default.createElement(react_1.Icon, { as: ai_1.AiFillLock }),
                    react_3.default.createElement(react_1.Text, null,
                        readPermissionAmount,
                        " ", metadata === null || metadata === void 0 ? void 0 :
                        metadata.data.symbol),
                    react_3.default.createElement(react_1.CloseButton, { color: "gray.400", _hover: { color: "gray.600", cursor: "pointer" }, onClick: () => setReadPermissionAmount(undefined) }))),
                react_3.default.createElement(ReplyBar_1.ReplyBar, null),
                react_3.default.createElement(react_1.HStack, { w: "full", alignItems: "flex-end" },
                    react_3.default.createElement(ChatInput_1.ChatInput, { inputRef: inputRef, onChange: handleChange, value: input, onKeyDown: handleKeyDown }),
                    react_3.default.createElement(react_1.Menu, { isLazy: true },
                        react_3.default.createElement(react_1.MenuButton, { as: react_1.IconButton, isLoading: loading, variant: "outline", "aria-label": "Attachment", icon: react_3.default.createElement(react_1.Icon, { w: "24px", h: "24px", as: ai_2.AiOutlinePlus }) }),
                        react_3.default.createElement(react_1.MenuList, null,
                            react_3.default.createElement(react_1.MenuItem, { icon: react_3.default.createElement(react_1.Icon, { mt: "3px", h: "16px", w: "16px", as: io_1.IoMdAttach }), onClick: onUploadFile }, "Upload File"),
                            react_3.default.createElement(react_1.MenuItem, { icon: react_3.default.createElement(react_1.Icon, { mt: "3px", h: "16px", w: "16px", as: ai_3.AiOutlineGif }), onClick: onToggleGify }, "GIF"))),
                    react_3.default.createElement(react_1.IconButton, { variant: "outline", "aria-label": "Additional Message Locking", onClick: onPermissionsOpen, icon: react_3.default.createElement(react_1.Icon, { w: "24px", h: "24px", as: ai_1.AiFillLock }) }),
                    react_3.default.createElement(react_1.Button, { isLoading: loading, colorScheme: "primary", variant: "outline", isDisabled: !input && files.length == 0, onClick: handleSendClick },
                        react_3.default.createElement(react_1.Icon, { as: ai_3.AiOutlineSend }))))),
        react_3.default.createElement(react_1.Modal, { isOpen: isGifyOpen, onClose: onCloseGify, size: "2xl", isCentered: true, trapFocus: true },
            react_3.default.createElement(react_1.ModalOverlay, null),
            react_3.default.createElement(react_1.ModalContent, { borderRadius: "xl", shadow: "xl" },
                react_3.default.createElement(react_1.ModalHeader, null, "Select GIF"),
                react_3.default.createElement(react_1.ModalCloseButton, null),
                react_3.default.createElement(react_1.ModalBody, null,
                    react_3.default.createElement(GifSearch_1.GifSearch, { onSelect: (gifyId) => {
                            onCloseGify();
                            sendMessage({
                                type: chat_1.MessageType.Gify,
                                gifyId,
                            });
                        } })))),
        react_3.default.createElement(react_1.Modal, { isOpen: isPermissionModalOpen, onClose: onPermissionsClose, isCentered: true },
            react_3.default.createElement(react_1.ModalContent, { p: 4, borderRadius: "xl" },
                react_3.default.createElement(react_1.ModalHeader, { pb: 0 }, "Change Read Amount"),
                react_3.default.createElement(react_1.ModalBody, null,
                    react_3.default.createElement(react_1.VStack, { spacing: 8 },
                        react_3.default.createElement(react_1.Text, null,
                            "Holders in the chat will need this amount of",
                            " ", metadata === null || metadata === void 0 ? void 0 :
                            metadata.data.symbol,
                            " to read this message."),
                        react_3.default.createElement(react_1.InputGroup, null,
                            react_3.default.createElement(react_1.Input, { borderRight: "none", value: readPermissionInputAmount, onChange: (e) => setReadPermissionInputAmount(e.target.value), type: "number", step: Math.pow(10, -((readMint === null || readMint === void 0 ? void 0 : readMint.decimals) || 0)) }),
                            react_3.default.createElement(react_1.InputRightAddon, null, metadata === null || metadata === void 0 ? void 0 : metadata.data.symbol)),
                        react_3.default.createElement(react_1.HStack, { w: "full", spacing: 2 },
                            react_3.default.createElement(react_1.Button, { w: "full", variant: "outline", onClick: () => onPermissionsClose() }, "Close"),
                            react_3.default.createElement(react_1.Button, { w: "full", colorScheme: "primary", onClick: () => {
                                    readPermissionInputAmount &&
                                        setReadPermissionAmount(Number(readPermissionInputAmount));
                                    onPermissionsClose();
                                } }, "Set Amount"))))))));
}
exports.Chatbox = Chatbox;
//# sourceMappingURL=Chatbox.js.map
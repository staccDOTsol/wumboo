import { Button, Divider, Flex, HStack, Icon, IconButton, Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay, Popover, PopoverBody, PopoverContent, Input, PopoverTrigger, Text, useColorModeValue, useDisclosure, VStack, Menu, MenuButton, MenuList, MenuItem, InputRightAddon, InputGroup, CloseButton, ModalCloseButton, } from "@chakra-ui/react";
import { AiFillLock } from "react-icons/ai";
import { AiOutlinePlus } from "react-icons/ai";
import { MessageType } from "@strata-foundation/chat";
import { useErrorHandler, useMint, useTokenMetadata } from "@strata-foundation/react";
import React, { useCallback, useEffect, useRef, useState, } from "react";
import { useAsyncCallback } from "react-async-hook";
import toast from "react-hot-toast";
import { AiOutlineGif, AiOutlineSend } from "react-icons/ai";
import { IoMdAttach } from "react-icons/io";
import { Converter } from "showdown";
import { useSendMessage } from "../../contexts/sendMessage";
import { useReply } from "../../contexts/reply";
import { useEmojiSearch } from "../../hooks/useEmojiSearch";
import { Files } from "../Files";
import { GifSearch } from "../GifSearch";
import { LongPromiseNotification } from "../LongPromiseNotification";
import { ChatInput } from "./ChatInput";
import { ReplyBar } from "./ReplyBar";
import { useAnalyticsEventTracker } from "../../hooks/useAnalyticsEventTracker";
import { useChatPermissionsFromChat } from "../../hooks/useChatPermissionsFromChat";
import { toBN, toNumber } from "@strata-foundation/spl-utils";
const converter = new Converter({
    simpleLineBreaks: true,
});
const popoverWidth = {
    base: "full",
    md: "50%",
};
export function Chatbox({ chatKey, onAddPendingMessage: inputOnAddPendingMessage, files, setFiles, onUploadFile, }) {
    const inputRef = useRef(null);
    const [input, setInput] = useState("");
    const { emojis, search, searchMatch, reset: resetEmoji } = useEmojiSearch();
    const { isOpen: isGifyOpen, onToggle: onToggleGify, onClose: onCloseGify, } = useDisclosure();
    const gaEventTracker = useAnalyticsEventTracker();
    const { info: chatPermissions } = useChatPermissionsFromChat(chatKey);
    const { metadata } = useTokenMetadata(chatPermissions?.readPermissionKey);
    const readMint = useMint(chatPermissions?.readPermissionKey);
    const chatBg = useColorModeValue("gray.100", "gray.800");
    const { handleErrors } = useErrorHandler();
    const { isOpen: isPermissionModalOpen, onClose: onPermissionsClose, onOpen: onPermissionsOpen } = useDisclosure();
    const [readPermissionInputAmount, setReadPermissionInputAmount] = useState();
    useEffect(() => {
        if (readMint && chatPermissions) {
            setReadPermissionInputAmount(toNumber(chatPermissions.defaultReadPermissionAmount, readMint).toString());
        }
    }, [readMint, chatPermissions]);
    const [readPermissionAmount, setReadPermissionAmount] = useState();
    const [loading, setLoading] = useState(false);
    const { sendMessage: sendMessageImpl, error } = useSendMessage();
    const onCancelFile = useCallback((file) => setFiles((files) => files.filter((f) => f.file != file)), [setFiles]);
    const { replyMessage, hideReply } = useReply();
    useEffect(() => {
        if (replyMessage)
            inputRef.current?.focus();
    }, [replyMessage]);
    const onAddPendingMessage = (msg) => {
        setLoading(false);
        if (inputOnAddPendingMessage) {
            inputOnAddPendingMessage(msg);
        }
    };
    const { execute: sendMessage } = useAsyncCallback(async (m) => {
        setInput("");
        resetEmoji();
        setLoading(true);
        hideReply();
        try {
            if (replyMessage?.id)
                m.referenceMessageId = replyMessage?.id;
            const msgArgs = { message: m, onAddPendingMessage };
            if (readPermissionAmount) {
                msgArgs.readPermissionAmount = toBN(readPermissionAmount, readMint);
                setReadPermissionAmount(undefined);
            }
            // Show toast if uploading files
            if (m.fileAttachments && m.fileAttachments.length > 0) {
                const text = `Uploading ${m.fileAttachments.map((f) => f.name)} to SHDW Drive...`;
                toast.custom((t) => (React.createElement(LongPromiseNotification, { estTimeMillis: 1 * 60 * 1000, text: text, onError: (e) => {
                        handleErrors(e);
                        toast.dismiss(t.id);
                    }, exec: async () => {
                        await sendMessageImpl(msgArgs);
                        return true;
                    }, onComplete: async () => {
                        toast.dismiss(t.id);
                    } })), {
                    duration: Infinity,
                });
                setFiles([]);
            }
            else {
                await sendMessageImpl(msgArgs);
            }
        }
        finally {
            setLoading(false);
        }
        gaEventTracker({
            action: "Send Message",
        });
    });
    const handleChange = useCallback(async (e) => {
        const content = e.currentTarget.value;
        search(e);
        setInput(content);
    }, [setInput, search]);
    const handleKeyDown = useCallback((ev) => {
        if (ev.key === "Enter") {
            if (!ev.shiftKey) {
                ev.preventDefault();
                sendMessage({
                    type: MessageType.Html,
                    html: converter.makeHtml(input.replace("\n", "\n\n")),
                    fileAttachments: files,
                });
            }
        }
    }, [sendMessage, files, input]);
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.style.height = "0px";
            const scrollHeight = inputRef.current.scrollHeight;
            inputRef.current.style.height = scrollHeight + "px";
        }
    }, [inputRef, input]);
    const handleSendClick = useCallback(() => sendMessage({
        type: MessageType.Html,
        html: converter.makeHtml(input),
        fileAttachments: files,
    }), [sendMessage, input, files]);
    const handleEmojiClick = (native) => {
        setInput([`:${searchMatch}`, `:${searchMatch}:`].reduce((acc, string) => acc.replace(string, native), input));
        inputRef.current?.focus();
        resetEmoji();
    };
    handleErrors(error);
    return (React.createElement(React.Fragment, null,
        React.createElement(Flex, { direction: "column", position: "sticky", bottom: 0, p: 2, w: "full", minH: "76px" },
            React.createElement(Popover, { matchWidth: true, isOpen: emojis.length > 0, placement: "top", autoFocus: false, closeOnBlur: false },
                React.createElement(PopoverTrigger, null,
                    React.createElement(Flex, { w: "full" })),
                React.createElement(PopoverContent, { bg: chatBg, border: "none", w: popoverWidth },
                    React.createElement(PopoverBody, { px: 0, pt: 0 },
                        React.createElement(VStack, { spacing: 0, w: "full", align: "start" },
                            React.createElement(Text, { p: 2, fontSize: "xs", fontWeight: "bold", textTransform: "uppercase", lineHeight: "normal" },
                                "Emojis Matching :",
                                React.createElement(Text, { as: "span", textTransform: "none" }, searchMatch)),
                            React.createElement(Divider, null),
                            emojis.map((e, indx) => (React.createElement(HStack, { w: "full", p: 2, key: e.name, onClick: () => handleEmojiClick(e.skins[0].native), _hover: {
                                    cursor: "pointer",
                                    bg: "gray.200",
                                    _dark: {
                                        bg: "gray.700",
                                    },
                                } },
                                React.createElement(Text, { fontSize: "xl" }, e.skins[0].native),
                                React.createElement(Text, { fontSize: "sm" }, e.name)))))))),
            React.createElement(VStack, { p: "10px", spacing: 2, w: "full", align: "left", bg: chatBg, rounded: "lg" },
                React.createElement(Files, { files: files, onCancelFile: onCancelFile }),
                readPermissionAmount && (React.createElement(HStack, { spacing: 1, alignItems: "center" },
                    React.createElement(Icon, { as: AiFillLock }),
                    React.createElement(Text, null,
                        readPermissionAmount,
                        " ",
                        metadata?.data.symbol),
                    React.createElement(CloseButton, { color: "gray.400", _hover: { color: "gray.600", cursor: "pointer" }, onClick: () => setReadPermissionAmount(undefined) }))),
                React.createElement(ReplyBar, null),
                React.createElement(HStack, { w: "full", alignItems: "flex-end" },
                    React.createElement(ChatInput, { inputRef: inputRef, onChange: handleChange, value: input, onKeyDown: handleKeyDown }),
                    React.createElement(Menu, { isLazy: true },
                        React.createElement(MenuButton, { as: IconButton, isLoading: loading, variant: "outline", "aria-label": "Attachment", icon: React.createElement(Icon, { w: "24px", h: "24px", as: AiOutlinePlus }) }),
                        React.createElement(MenuList, null,
                            React.createElement(MenuItem, { icon: React.createElement(Icon, { mt: "3px", h: "16px", w: "16px", as: IoMdAttach }), onClick: onUploadFile }, "Upload File"),
                            React.createElement(MenuItem, { icon: React.createElement(Icon, { mt: "3px", h: "16px", w: "16px", as: AiOutlineGif }), onClick: onToggleGify }, "GIF"))),
                    React.createElement(IconButton, { variant: "outline", "aria-label": "Additional Message Locking", onClick: onPermissionsOpen, icon: React.createElement(Icon, { w: "24px", h: "24px", as: AiFillLock }) }),
                    React.createElement(Button, { isLoading: loading, colorScheme: "primary", variant: "outline", isDisabled: !input && files.length == 0, onClick: handleSendClick },
                        React.createElement(Icon, { as: AiOutlineSend }))))),
        React.createElement(Modal, { isOpen: isGifyOpen, onClose: onCloseGify, size: "2xl", isCentered: true, trapFocus: true },
            React.createElement(ModalOverlay, null),
            React.createElement(ModalContent, { borderRadius: "xl", shadow: "xl" },
                React.createElement(ModalHeader, null, "Select GIF"),
                React.createElement(ModalCloseButton, null),
                React.createElement(ModalBody, null,
                    React.createElement(GifSearch, { onSelect: (gifyId) => {
                            onCloseGify();
                            sendMessage({
                                type: MessageType.Gify,
                                gifyId,
                            });
                        } })))),
        React.createElement(Modal, { isOpen: isPermissionModalOpen, onClose: onPermissionsClose, isCentered: true },
            React.createElement(ModalContent, { p: 4, borderRadius: "xl" },
                React.createElement(ModalHeader, { pb: 0 }, "Change Read Amount"),
                React.createElement(ModalBody, null,
                    React.createElement(VStack, { spacing: 8 },
                        React.createElement(Text, null,
                            "Holders in the chat will need this amount of",
                            " ",
                            metadata?.data.symbol,
                            " to read this message."),
                        React.createElement(InputGroup, null,
                            React.createElement(Input, { borderRight: "none", value: readPermissionInputAmount, onChange: (e) => setReadPermissionInputAmount(e.target.value), type: "number", step: Math.pow(10, -(readMint?.decimals || 0)) }),
                            React.createElement(InputRightAddon, null, metadata?.data.symbol)),
                        React.createElement(HStack, { w: "full", spacing: 2 },
                            React.createElement(Button, { w: "full", variant: "outline", onClick: () => onPermissionsClose() }, "Close"),
                            React.createElement(Button, { w: "full", colorScheme: "primary", onClick: () => {
                                    readPermissionInputAmount &&
                                        setReadPermissionAmount(Number(readPermissionInputAmount));
                                    onPermissionsClose();
                                } }, "Set Amount"))))))));
}
//# sourceMappingURL=Chatbox.js.map
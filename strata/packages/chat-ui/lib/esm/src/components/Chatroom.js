import React from "react";
import { ChatboxWithGuards } from "./chatbox/ChatboxWithGuards";
import { ChatMessages } from "./ChatMessages";
import { EmojiPickerPopover } from "./EmojiPicker";
import { FileUploadMask } from "./FileUploadMask";
import { useMessages, } from "../hooks/useMessages";
import { Flex } from "@chakra-ui/react";
import { randomizeFileName } from "@strata-foundation/chat";
import { useErrorHandler } from "@strata-foundation/react";
// @ts-ignore
import { useCallback, useEffect, useMemo, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { useDropzone } from "react-dropzone";
const DARK_BG = {
    bg: "gray.900",
};
export const Chatroom = ({ chatKey, accelerated, fetcher }) => {
    const { handleErrors } = useErrorHandler();
    const [files, setFiles] = useState([]);
    const [pendingMessages, setPendingMessages] = useState([]);
    const { messages, error, loadingInitial, loadingMore, hasMore, fetchMore, fetchNew, } = useMessages({
        chat: chatKey,
        accelerated,
        fetcher,
        numTransactions: 50,
    });
    handleErrors(error);
    const { execute: onFocus } = useAsyncCallback(async function () {
        let oldCount = messages.length;
        while (true) {
            await fetchNew(50);
            let newCount = messages.length;
            if (newCount - oldCount < 50)
                break;
        }
    });
    useEffect(() => {
        window.addEventListener("focus", onFocus);
        return () => {
            window.removeEventListener("focus", onFocus);
        };
    });
    const msgWeHave = useMemo(() => new Set(Array.from(messages?.map((message) => message.id) || [])), [messages]);
    useEffect(() => {
        setPendingMessages((pendingMessages) => pendingMessages.filter((p) => !msgWeHave.has(p.id)));
    }, [msgWeHave]);
    const messagesWithPending = useMemo(() => [
        ...(messages || []),
        ...pendingMessages.filter((p) => !msgWeHave.has(p.id)),
    ].sort((a, b) => b.startBlockTime - a.startBlockTime), [messages, msgWeHave, pendingMessages]);
    const onAddPendingMessage = useCallback((pending) => setPendingMessages((msgs) => [...(msgs || []), pending]), [setPendingMessages]);
    const onUpload = useCallback(async (newFiles) => {
        setFiles((files) => [
            ...files,
            ...[...newFiles].map((file) => {
                const ret = {
                    name: file.name,
                    file,
                };
                randomizeFileName(file); // so no conflicts with gengo
                return ret;
            }),
        ]);
    }, [setFiles]);
    const { getRootProps, getInputProps, open, isFocused, isDragAccept } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        onDrop: onUpload,
    });
    const rootProps = useMemo(() => getRootProps({ className: "dropzone" }), [getRootProps]);
    return (React.createElement(Flex, { position: "relative", direction: "column", w: "full", h: "full", grow: 1, bg: "white", _dark: DARK_BG, overflow: "hidden", ...rootProps },
        " ",
        (isFocused || isDragAccept) && React.createElement(FileUploadMask, null),
        React.createElement("input", { ...getInputProps() }),
        React.createElement(EmojiPickerPopover, { chatKey: chatKey }),
        React.createElement(ChatMessages, { isLoading: loadingInitial, isLoadingMore: loadingMore, messages: messagesWithPending, hasMore: hasMore, fetchMore: fetchMore }),
        React.createElement(ChatboxWithGuards, { chatKey: chatKey, onAddPendingMessage: onAddPendingMessage, files: files, setFiles: setFiles, onUploadFile: open })));
};
//# sourceMappingURL=Chatroom.js.map
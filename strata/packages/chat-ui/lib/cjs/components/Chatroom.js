"use strict";
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
exports.Chatroom = void 0;
const react_1 = __importDefault(require("react"));
const ChatboxWithGuards_1 = require("./chatbox/ChatboxWithGuards");
const ChatMessages_1 = require("./ChatMessages");
const EmojiPicker_1 = require("./EmojiPicker");
const FileUploadMask_1 = require("./FileUploadMask");
const useMessages_1 = require("../hooks/useMessages");
const react_2 = require("@chakra-ui/react");
const chat_1 = require("@strata-foundation/chat");
const react_3 = require("@strata-foundation/react");
// @ts-ignore
const react_4 = require("react");
const react_async_hook_1 = require("react-async-hook");
const react_dropzone_1 = require("react-dropzone");
const DARK_BG = {
    bg: "gray.900",
};
const Chatroom = ({ chatKey, accelerated, fetcher }) => {
    const { handleErrors } = (0, react_3.useErrorHandler)();
    const [files, setFiles] = (0, react_4.useState)([]);
    const [pendingMessages, setPendingMessages] = (0, react_4.useState)([]);
    const { messages, error, loadingInitial, loadingMore, hasMore, fetchMore, fetchNew, } = (0, useMessages_1.useMessages)({
        chat: chatKey,
        accelerated,
        fetcher,
        numTransactions: 50,
    });
    handleErrors(error);
    const { execute: onFocus } = (0, react_async_hook_1.useAsyncCallback)(function () {
        return __awaiter(this, void 0, void 0, function* () {
            let oldCount = messages.length;
            while (true) {
                yield fetchNew(50);
                let newCount = messages.length;
                if (newCount - oldCount < 50)
                    break;
            }
        });
    });
    (0, react_4.useEffect)(() => {
        window.addEventListener("focus", onFocus);
        return () => {
            window.removeEventListener("focus", onFocus);
        };
    });
    const msgWeHave = (0, react_4.useMemo)(() => new Set(Array.from((messages === null || messages === void 0 ? void 0 : messages.map((message) => message.id)) || [])), [messages]);
    (0, react_4.useEffect)(() => {
        setPendingMessages((pendingMessages) => pendingMessages.filter((p) => !msgWeHave.has(p.id)));
    }, [msgWeHave]);
    const messagesWithPending = (0, react_4.useMemo)(() => [
        ...(messages || []),
        ...pendingMessages.filter((p) => !msgWeHave.has(p.id)),
    ].sort((a, b) => b.startBlockTime - a.startBlockTime), [messages, msgWeHave, pendingMessages]);
    const onAddPendingMessage = (0, react_4.useCallback)((pending) => setPendingMessages((msgs) => [...(msgs || []), pending]), [setPendingMessages]);
    const onUpload = (0, react_4.useCallback)((newFiles) => __awaiter(void 0, void 0, void 0, function* () {
        setFiles((files) => [
            ...files,
            ...[...newFiles].map((file) => {
                const ret = {
                    name: file.name,
                    file,
                };
                (0, chat_1.randomizeFileName)(file); // so no conflicts with gengo
                return ret;
            }),
        ]);
    }), [setFiles]);
    const { getRootProps, getInputProps, open, isFocused, isDragAccept } = (0, react_dropzone_1.useDropzone)({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true,
        onDrop: onUpload,
    });
    const rootProps = (0, react_4.useMemo)(() => getRootProps({ className: "dropzone" }), [getRootProps]);
    return (react_1.default.createElement(react_2.Flex, Object.assign({ position: "relative", direction: "column", w: "full", h: "full", grow: 1, bg: "white", _dark: DARK_BG, overflow: "hidden" }, rootProps),
        " ",
        (isFocused || isDragAccept) && react_1.default.createElement(FileUploadMask_1.FileUploadMask, null),
        react_1.default.createElement("input", Object.assign({}, getInputProps())),
        react_1.default.createElement(EmojiPicker_1.EmojiPickerPopover, { chatKey: chatKey }),
        react_1.default.createElement(ChatMessages_1.ChatMessages, { isLoading: loadingInitial, isLoadingMore: loadingMore, messages: messagesWithPending, hasMore: hasMore, fetchMore: fetchMore }),
        react_1.default.createElement(ChatboxWithGuards_1.ChatboxWithGuards, { chatKey: chatKey, onAddPendingMessage: onAddPendingMessage, files: files, setFiles: setFiles, onUploadFile: open })));
};
exports.Chatroom = Chatroom;
//# sourceMappingURL=Chatroom.js.map
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
exports.EmojiPickerPopover = exports.EmojiPicker = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const data_1 = __importDefault(require("@emoji-mart/data"));
const react_3 = require("@strata-foundation/react");
const chat_1 = require("@strata-foundation/chat");
const react_device_detect_1 = require("react-device-detect");
const emojis_1 = require("../contexts/emojis");
const sendMessage_1 = require("../contexts/sendMessage");
const EmojiPicker = (props) => {
    const pickerRef = (0, react_1.useRef)();
    const moduleRef = (0, react_1.useRef)();
    const handleDivRef = (divEl) => {
        pickerRef.current = divEl;
        if (!moduleRef.current) {
            moduleRef.current = Promise.resolve().then(() => __importStar(require("emoji-mart"))).then((m) => new m.Picker(Object.assign(Object.assign({}, props), { ref: pickerRef, data: data_1.default })));
        }
    };
    (0, react_1.useEffect)(() => {
        var _a;
        if (pickerRef.current && pickerRef.current.firstChild) {
            if (props.noBoxShadow) {
                pickerRef.current.firstChild.style.boxShadow = "none";
            }
            if (props.autoFocus) {
                (_a = pickerRef.current.firstChild.shadowRoot
                    .querySelector('input[type="search"]')) === null || _a === void 0 ? void 0 : _a.focus();
            }
        }
    }, [props]);
    return react_1.default.createElement("div", { ref: handleDivRef });
};
exports.EmojiPicker = EmojiPicker;
const EmojiPickerPopover = ({ chatKey }) => {
    const [emoji, setEmoji] = (0, react_1.useState)();
    const { referenceMessageId, hidePicker } = (0, emojis_1.useEmojis)();
    const rgbBackground = (0, react_2.useColorModeValue)("243 244 246", "32 41 55");
    const rgbColor = (0, react_2.useColorModeValue)("white", "black");
    const rgbInput = (0, react_2.useColorModeValue)("255 255 255", "56 63 75");
    const colorBorder = (0, react_2.useColorModeValue)("#e4e7eb", "");
    const { handleErrors } = (0, react_3.useErrorHandler)();
    const { sendMessage, error } = (0, sendMessage_1.useSendMessage)();
    handleErrors(error);
    const reset = (0, react_1.useCallback)(() => {
        setEmoji(undefined);
        hidePicker();
    }, [hidePicker, setEmoji]);
    const preventClickBehavior = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    (0, react_1.useEffect)(() => {
        if (emoji) {
            sendMessage({
                message: {
                    type: chat_1.MessageType.React,
                    emoji: emoji.native,
                    referenceMessageId,
                },
            });
            reset();
        }
    }, [emoji, referenceMessageId, reset, sendMessage]);
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_device_detect_1.BrowserView, null,
            react_1.default.createElement(react_2.Flex, { w: !!referenceMessageId ? "full" : "none", h: !!referenceMessageId ? "full" : "none", position: "absolute", top: "0", right: "0", zIndex: "1", justifyContent: "end", onClick: reset },
                react_1.default.createElement(react_2.Fade, { in: !!referenceMessageId },
                    react_1.default.createElement(react_2.Flex, { display: !!referenceMessageId ? "flex" : "none", onClick: preventClickBehavior, sx: {
                            "--rgb-color": rgbColor,
                            "--rgb-background": rgbBackground,
                            "--rgb-input": rgbInput,
                            "--color-border": colorBorder,
                        } },
                        react_1.default.createElement(react_2.Flex, { bg: `rgb(${rgbBackground})` },
                            react_1.default.createElement(exports.EmojiPicker
                            // @ts-ignore
                            , { 
                                // @ts-ignore
                                onEmojiSelect: setEmoji, previewPosition: "none", searchPosition: "top", navPosition: "bottom", autoFocus: true })))))),
        react_1.default.createElement(react_device_detect_1.MobileView, null,
            react_1.default.createElement(react_2.Flex, { w: !!referenceMessageId ? "full" : "none", h: !!referenceMessageId ? "full" : "none", position: "fixed", top: "0", zIndex: "15", justifyContent: "center" },
                react_1.default.createElement(react_2.Fade, { in: !!referenceMessageId, style: { width: "100%" } },
                    react_1.default.createElement(react_2.Flex, { display: !!referenceMessageId ? "flex" : "none", onClick: reset, zIndex: "15", w: "full", h: "full", justifyContent: "flex-end", alignItems: "end", flexDirection: "column", position: "absolute", left: "0", sx: {
                            "--rgb-color": rgbColor,
                            "--rgb-background": rgbBackground,
                            "--rgb-input": rgbInput,
                            "--color-border": colorBorder,
                        } },
                        react_1.default.createElement(react_2.Flex, { flexGrow: 2 }),
                        react_1.default.createElement(react_2.Flex, { w: "full", onClick: preventClickBehavior, flexGrow: 0, justifyContent: "center", position: "absolute", left: "0", bg: `rgb(${rgbBackground})` },
                            react_1.default.createElement(exports.EmojiPicker
                            // @ts-ignore
                            , { 
                                // @ts-ignore
                                onEmojiSelect: setEmoji, previewPosition: "none", searchPosition: "top", navPosition: "bottom", noBoxShadow: true }))))))));
};
exports.EmojiPickerPopover = EmojiPickerPopover;
//# sourceMappingURL=EmojiPicker.js.map
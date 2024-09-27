import React, { useState, useCallback, useEffect, useRef } from "react";
import { Fade, Flex, useColorModeValue } from "@chakra-ui/react";
import data from "@emoji-mart/data";
import { useErrorHandler } from "@strata-foundation/react";
import { MessageType } from "@strata-foundation/chat";
import { BrowserView, MobileView } from "react-device-detect";
import { useEmojis } from "../contexts/emojis";
import { useSendMessage } from "../contexts/sendMessage";
export const EmojiPicker = (props) => {
    const pickerRef = useRef();
    const moduleRef = useRef();
    const handleDivRef = (divEl) => {
        pickerRef.current = divEl;
        if (!moduleRef.current) {
            moduleRef.current = import("emoji-mart").then((m) => new m.Picker({
                ...props,
                ref: pickerRef,
                data,
            }));
        }
    };
    useEffect(() => {
        if (pickerRef.current && pickerRef.current.firstChild) {
            if (props.noBoxShadow) {
                pickerRef.current.firstChild.style.boxShadow = "none";
            }
            if (props.autoFocus) {
                pickerRef.current.firstChild.shadowRoot
                    .querySelector('input[type="search"]')
                    ?.focus();
            }
        }
    }, [props]);
    return React.createElement("div", { ref: handleDivRef });
};
export const EmojiPickerPopover = ({ chatKey }) => {
    const [emoji, setEmoji] = useState();
    const { referenceMessageId, hidePicker } = useEmojis();
    const rgbBackground = useColorModeValue("243 244 246", "32 41 55");
    const rgbColor = useColorModeValue("white", "black");
    const rgbInput = useColorModeValue("255 255 255", "56 63 75");
    const colorBorder = useColorModeValue("#e4e7eb", "");
    const { handleErrors } = useErrorHandler();
    const { sendMessage, error } = useSendMessage();
    handleErrors(error);
    const reset = useCallback(() => {
        setEmoji(undefined);
        hidePicker();
    }, [hidePicker, setEmoji]);
    const preventClickBehavior = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };
    useEffect(() => {
        if (emoji) {
            sendMessage({
                message: {
                    type: MessageType.React,
                    emoji: emoji.native,
                    referenceMessageId,
                },
            });
            reset();
        }
    }, [emoji, referenceMessageId, reset, sendMessage]);
    return (React.createElement(React.Fragment, null,
        React.createElement(BrowserView, null,
            React.createElement(Flex, { w: !!referenceMessageId ? "full" : "none", h: !!referenceMessageId ? "full" : "none", position: "absolute", top: "0", right: "0", zIndex: "1", justifyContent: "end", onClick: reset },
                React.createElement(Fade, { in: !!referenceMessageId },
                    React.createElement(Flex, { display: !!referenceMessageId ? "flex" : "none", onClick: preventClickBehavior, sx: {
                            "--rgb-color": rgbColor,
                            "--rgb-background": rgbBackground,
                            "--rgb-input": rgbInput,
                            "--color-border": colorBorder,
                        } },
                        React.createElement(Flex, { bg: `rgb(${rgbBackground})` },
                            React.createElement(EmojiPicker
                            // @ts-ignore
                            , { 
                                // @ts-ignore
                                onEmojiSelect: setEmoji, previewPosition: "none", searchPosition: "top", navPosition: "bottom", autoFocus: true })))))),
        React.createElement(MobileView, null,
            React.createElement(Flex, { w: !!referenceMessageId ? "full" : "none", h: !!referenceMessageId ? "full" : "none", position: "fixed", top: "0", zIndex: "15", justifyContent: "center" },
                React.createElement(Fade, { in: !!referenceMessageId, style: { width: "100%" } },
                    React.createElement(Flex, { display: !!referenceMessageId ? "flex" : "none", onClick: reset, zIndex: "15", w: "full", h: "full", justifyContent: "flex-end", alignItems: "end", flexDirection: "column", position: "absolute", left: "0", sx: {
                            "--rgb-color": rgbColor,
                            "--rgb-background": rgbBackground,
                            "--rgb-input": rgbInput,
                            "--color-border": colorBorder,
                        } },
                        React.createElement(Flex, { flexGrow: 2 }),
                        React.createElement(Flex, { w: "full", onClick: preventClickBehavior, flexGrow: 0, justifyContent: "center", position: "absolute", left: "0", bg: `rgb(${rgbBackground})` },
                            React.createElement(EmojiPicker
                            // @ts-ignore
                            , { 
                                // @ts-ignore
                                onEmojiSelect: setEmoji, previewPosition: "none", searchPosition: "top", navPosition: "bottom", noBoxShadow: true }))))))));
};
//# sourceMappingURL=EmojiPicker.js.map
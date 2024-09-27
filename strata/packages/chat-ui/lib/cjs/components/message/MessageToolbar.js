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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageToolbar = void 0;
const reply_1 = require("../../contexts/reply");
const emojis_1 = require("../../contexts/emojis");
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const md_1 = require("react-icons/md");
const md_2 = require("react-icons/md");
const MessageToolbar = (_a) => {
    var { id: messageId } = _a, rest = __rest(_a, ["id"]);
    const { showPicker } = (0, emojis_1.useEmojis)();
    const handleOnReaction = (0, react_1.useCallback)(() => {
        showPicker(messageId);
    }, [showPicker, messageId]);
    const highlightedBg = (0, react_2.useColorModeValue)("gray.200", "gray.800");
    const iconButtonDark = (0, react_1.useMemo)(() => ({
        bg: "gray.900",
        _hover: {
            bg: highlightedBg,
        },
    }), [highlightedBg]);
    const { showReply } = (0, reply_1.useReply)();
    const handleOnReply = (0, react_1.useCallback)(() => {
        showReply(Object.assign({ id: messageId }, rest));
    }, [showReply, messageId]);
    return (react_1.default.createElement(react_2.Flex, { direction: "row", justifyContent: "end" },
        react_1.default.createElement(react_2.ButtonGroup, { size: "lg", isAttached: true, variant: "outline" },
            react_1.default.createElement(react_2.Tooltip, { placement: "top", label: "Add Reaction", fontSize: "xs", borderRadius: "md", bg: "gray.200", color: "black", _dark: {
                    bg: "gray.700",
                    color: "white",
                } },
                react_1.default.createElement(react_2.IconButton, { borderRight: "none", icon: react_1.default.createElement(react_2.Icon, { as: md_1.MdOutlineAddReaction }), w: "32px", h: "32px", variant: "outline", size: "md", "aria-label": "Add Reaction", bg: "white", _dark: iconButtonDark, onClick: handleOnReaction })),
            react_1.default.createElement(react_2.Tooltip, { placement: "top", label: "Reply", fontSize: "xs", borderRadius: "md", bg: "gray.200", color: "black", _dark: {
                    bg: "gray.700",
                    color: "white",
                } },
                react_1.default.createElement(react_2.IconButton, { icon: react_1.default.createElement(react_2.Icon, { as: md_2.MdReply }), w: "32px", h: "32px", variant: "outline", size: "md", "aria-label": "Reply", bg: "white", _dark: iconButtonDark, onClick: handleOnReply })))));
};
exports.MessageToolbar = MessageToolbar;
//# sourceMappingURL=MessageToolbar.js.map
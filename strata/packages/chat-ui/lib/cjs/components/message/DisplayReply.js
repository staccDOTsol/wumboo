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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayReply = void 0;
const react_1 = require("@chakra-ui/react");
const chat_1 = require("@strata-foundation/chat");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const react_async_hook_1 = require("react-async-hook");
const useUsernameFromIdentifierCertificate_1 = require("../../hooks/useUsernameFromIdentifierCertificate");
const useWalletProfile_1 = require("../../hooks/useWalletProfile");
const STYLE = {
    color: "gray.500",
    _hover: {
        cursor: "pointer",
        color: "black",
        _dark: {
            color: "white",
        },
    },
};
const BEFORE_STYLE = {
    content: `""`,
    position: "absolute",
    left: "50%",
    top: "8px",
    width: "2px",
    height: "12px",
    bg: "gray.300",
};
const AFTER_STYLE = {
    content: `""`,
    position: "absolute",
    left: "50%",
    top: "8px",
    width: "20px",
    height: "2px",
    bg: "gray.300",
};
function DisplayReply({ reply, scrollToMessage, }) {
    var _a, _b;
    const { result: decodedMessage } = (0, react_async_hook_1.useAsync)(reply.getDecodedMessage, []);
    const { info: profile } = (0, useWalletProfile_1.useWalletProfile)(reply.sender);
    const { username, loading: loadingUsername } = (0, useUsernameFromIdentifierCertificate_1.useUsernameFromIdentifierCertificate)(profile === null || profile === void 0 ? void 0 : profile.identifierCertificateMint, reply.sender);
    const name = (0, react_3.useMemo)(() => username || (reply.sender && (0, react_2.truncatePubkey)(reply.sender)), [username, (_a = reply === null || reply === void 0 ? void 0 : reply.sender) === null || _a === void 0 ? void 0 : _a.toBase58()]);
    return (react_3.default.createElement(react_1.HStack, { p: 1, pb: 0, w: "full", align: "start", spacing: 2, fontSize: "xs" },
        react_3.default.createElement(react_1.Flex, { w: "36px", h: "100%", flexShrink: 0, position: "relative", _before: BEFORE_STYLE, _after: AFTER_STYLE, _dark: {
                _before: {
                    bg: "gray.700",
                },
                _after: {
                    bg: "gray.700",
                },
            } }),
        react_3.default.createElement(react_1.HStack, Object.assign({ gap: 0, spacing: 1, onClick: () => scrollToMessage(reply.id) }, STYLE),
            react_3.default.createElement(react_1.Avatar, { size: "2xs", src: profile === null || profile === void 0 ? void 0 : profile.imageUrl }),
            react_3.default.createElement(react_1.Text, { fontSize: "xs", fontWeight: "semibold", color: "green.500", _dark: { color: "green.200" } }, name),
            decodedMessage ? (
            // successfully decoded
            react_3.default.createElement(react_3.default.Fragment, null, reply.type === chat_1.MessageType.Text ? (react_3.default.createElement(react_1.Text, { maxW: { base: "150px", md: "600px" }, noOfLines: 1 }, decodedMessage.text)) : reply.type === chat_1.MessageType.Html ? (react_3.default.createElement(react_1.Text, { maxW: { base: "150px", md: "600px" }, noOfLines: 1 }, (_b = decodedMessage.html) === null || _b === void 0 ? void 0 : _b.replace(/<[^>]*>?/gm, ""))) : (react_3.default.createElement(react_1.Text, null, "Click to see attachment")))) : (
            // need to fetch more messages
            react_3.default.createElement(react_1.Text, null, "Click to find reply")))));
}
exports.DisplayReply = DisplayReply;
//# sourceMappingURL=DisplayReply.js.map
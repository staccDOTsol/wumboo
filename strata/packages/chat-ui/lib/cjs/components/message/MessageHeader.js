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
exports.MessageHeader = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const TokenFlare_1 = require("../TokenFlare");
const moment_1 = __importDefault(require("moment"));
const useWalletProfile_1 = require("../../hooks/useWalletProfile");
const useUsernameFromIdentifierCertificate_1 = require("../../hooks/useUsernameFromIdentifierCertificate");
const react_3 = require("@strata-foundation/react");
const useChatPermissionsFromChat_1 = require("../../hooks/useChatPermissionsFromChat");
function MessageHeader({ chatKey, sender, startBlockTime, }) {
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const { info: profile } = (0, useWalletProfile_1.useWalletProfile)(sender);
    const { username } = (0, useUsernameFromIdentifierCertificate_1.useUsernameFromIdentifierCertificate)(profile === null || profile === void 0 ? void 0 : profile.identifierCertificateMint, sender);
    const name = (0, react_2.useMemo)(() => username || (sender && (0, react_3.truncatePubkey)(sender)), [username, sender === null || sender === void 0 ? void 0 : sender.toBase58()]);
    const time = (0, react_2.useMemo)(() => {
        if (startBlockTime) {
            const t = new Date(0);
            t.setUTCSeconds(startBlockTime);
            return t;
        }
    }, [startBlockTime]);
    const tokens = (0, react_2.useMemo)(() => [
        chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey,
        chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey,
    ].filter(react_3.truthy), [chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey, chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey]);
    return (react_2.default.createElement(react_1.HStack, { alignItems: "center" },
        react_2.default.createElement(react_1.Text, { fontSize: "sm", fontWeight: "semibold", color: "green.500", _dark: { color: "green.200" } }, name),
        react_2.default.createElement(react_1.Show, { below: "md" },
            react_2.default.createElement(react_1.Text, { fontSize: "xs", color: "gray.500", _dark: { color: "gray.400" } }, (0, moment_1.default)(time).format("LT"))),
        react_2.default.createElement(TokenFlare_1.TokenFlare, { chat: chatKey, wallet: sender, tokens: tokens })));
}
exports.MessageHeader = MessageHeader;
//# sourceMappingURL=MessageHeader.js.map
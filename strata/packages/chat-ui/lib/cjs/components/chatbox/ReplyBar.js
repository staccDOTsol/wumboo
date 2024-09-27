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
exports.ReplyBar = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const reply_1 = require("../../contexts/reply");
const useUsernameFromIdentifierCertificate_1 = require("../../hooks/useUsernameFromIdentifierCertificate");
const useWalletProfile_1 = require("../../hooks/useWalletProfile");
function ReplyBar() {
    const { replyMessage, hideReply } = (0, reply_1.useReply)();
    const { info: profile } = (0, useWalletProfile_1.useWalletProfile)(replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.sender);
    const { username } = (0, useUsernameFromIdentifierCertificate_1.useUsernameFromIdentifierCertificate)(profile === null || profile === void 0 ? void 0 : profile.identifierCertificateMint, replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.sender);
    const name = (0, react_3.useMemo)(() => username || ((replyMessage === null || replyMessage === void 0 ? void 0 : replyMessage.sender) && (0, react_2.truncatePubkey)(replyMessage.sender)), [username, replyMessage]);
    if (!replyMessage) {
        return null;
    }
    return (react_3.default.createElement(react_1.Text, { display: "flex", alignItems: "center" },
        "Replying to ",
        name,
        react_3.default.createElement(react_1.CloseButton, { color: "gray.400", _hover: { color: "gray.600", cursor: "pointer" }, onClick: hideReply })));
}
exports.ReplyBar = ReplyBar;
//# sourceMappingURL=ReplyBar.js.map
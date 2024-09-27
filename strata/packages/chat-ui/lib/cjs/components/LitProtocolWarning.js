"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LitProtocolWarning = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const LitProtocolWarning = () => {
    return (react_1.default.createElement(react_2.Alert, { status: "warning" },
        react_1.default.createElement(react_2.AlertIcon, null),
        react_1.default.createElement(react_2.Text, { fontSize: "sm" },
            "Do not approve any",
            " ",
            react_1.default.createElement(react_2.Link, { color: "primary.500", href: "https://litprotocol.com/" }, "Lit Protocol"),
            " ",
            "transactions on websites you do not trust. Your chat wallet is encrypted and could be decrypted if you give permission. Your chat wallet does not give access to your primary wallet, but can be used to impersonate you.")));
};
exports.LitProtocolWarning = LitProtocolWarning;
//# sourceMappingURL=LitProtocolWarning.js.map
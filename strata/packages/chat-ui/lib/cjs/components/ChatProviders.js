"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatProviders = void 0;
const react_1 = require("@strata-foundation/react");
const react_2 = __importDefault(require("react"));
const reply_1 = require("../contexts/reply");
const chatSdk_1 = require("../contexts/chatSdk");
const emojis_1 = require("../contexts/emojis");
const defaultOnError = (error) => console.log(error);
const ChatProviders = ({ children, onError = defaultOnError, resetCSS = false }) => (react_2.default.createElement(react_1.StrataProviders, { resetCSS: true, onError: onError },
    react_2.default.createElement(react_1.AcceleratorProvider, { url: "wss://prod-api.teamwumbo.com/accelerator" },
        react_2.default.createElement(chatSdk_1.ChatSdkProvider, null,
            react_2.default.createElement(react_1.GraphqlProvider, null,
                react_2.default.createElement(emojis_1.EmojisProvider, null,
                    react_2.default.createElement(reply_1.ReplyProvider, null, children)))))));
exports.ChatProviders = ChatProviders;
//# sourceMappingURL=ChatProviders.js.map
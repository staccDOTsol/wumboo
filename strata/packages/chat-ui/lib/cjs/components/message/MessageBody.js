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
exports.MessageBody = void 0;
const chat_1 = require("@strata-foundation/chat");
const react_1 = __importStar(require("react"));
const js_fetch_api_1 = require("@giphy/js-fetch-api");
const react_components_1 = require("@giphy/react-components");
const react_async_hook_1 = require("react-async-hook");
const react_2 = require("@chakra-ui/react");
const globals_1 = require("../../constants/globals");
const Files_1 = require("../Files");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
const gf = new js_fetch_api_1.GiphyFetch(globals_1.GIPHY_API_KEY);
function fetchGif(gifyId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (gifyId) {
            const { data } = yield gf.gif(gifyId);
            return data;
        }
    });
}
function GifyGif({ gifyId }) {
    const { result: data, loading } = (0, react_async_hook_1.useAsync)(fetchGif, [gifyId]);
    if (loading || !data) {
        return react_1.default.createElement(react_2.Skeleton, { w: "300px", h: "300px" });
    }
    return react_1.default.createElement(react_components_1.Gif, { gif: data, width: 300 });
}
function MessageBody({ message, messageType, htmlAllowlist, }) {
    const files = (0, react_1.useMemo)(() => [
        ...((message === null || message === void 0 ? void 0 : message.attachments) || []),
        ...((message === null || message === void 0 ? void 0 : message.decryptedAttachments) || []),
    ], [message]);
    return messageType === chat_1.MessageType.Gify ? (react_1.default.createElement(GifyGif, { gifyId: message.gifyId })) : message.type === chat_1.MessageType.Image ? (react_1.default.createElement(Files_1.Files, { files: files })) : message.type === chat_1.MessageType.Text ? (react_1.default.createElement(react_2.Text, { mt: "-4px" }, message.text)) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Files_1.Files, { files: files }),
        react_1.default.createElement("div", { dangerouslySetInnerHTML: {
                __html: message.html ? (0, sanitize_html_1.default)(message.html, htmlAllowlist) : "",
            } })));
}
exports.MessageBody = MessageBody;
//# sourceMappingURL=MessageBody.js.map
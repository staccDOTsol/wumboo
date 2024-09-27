"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatInput = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const ChatInput = (_a) => {
    var { onChange, inputRef } = _a, rest = __rest(_a, ["onChange", "inputRef"]);
    return (react_2.default.createElement(react_1.Textarea, Object.assign({ ref: inputRef, onChange: onChange, resize: "none", overflow: "hidden", rows: 1, px: 0, w: "full", h: "full", backgroundColor: "transparent", outline: "none", boxShadow: "none !important", border: "none !imporatnt", borderColor: "transparent !important", placeholder: "GM, Say Something....." }, rest)));
};
exports.ChatInput = ChatInput;
//# sourceMappingURL=ChatInput.js.map
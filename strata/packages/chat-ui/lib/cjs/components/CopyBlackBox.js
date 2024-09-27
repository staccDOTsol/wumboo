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
exports.CopyBlackBox = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const react_3 = require("@strata-foundation/react");
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const bs_1 = require("react-icons/bs");
function CopyBlackBox(_a) {
    var { text } = _a, rest = __rest(_a, ["text"]);
    return (react_2.default.createElement(react_1.Box, Object.assign({ p: 4, rounded: "lg", bg: (0, react_1.useColorModeValue)("gray.200", "gray.800") }, rest),
        react_2.default.createElement(react_1.HStack, { justify: "space-between" },
            react_2.default.createElement(react_1.Text, null, text),
            react_2.default.createElement(react_1.IconButton, { variant: "ghost", colorScheme: "primary", "aria-label": "Copy to Clipboard", onClick: () => {
                    navigator.clipboard.writeText(text);
                    react_hot_toast_1.default.custom((t) => (react_2.default.createElement(react_3.Notification, { show: t.visible, type: "info", heading: "Copied to Clipboard", message: text, onDismiss: () => react_hot_toast_1.default.dismiss(t.id) })));
                }, icon: react_2.default.createElement(react_1.Icon, { as: bs_1.BsClipboard }) }))));
}
exports.CopyBlackBox = CopyBlackBox;
//# sourceMappingURL=CopyBlackBox.js.map
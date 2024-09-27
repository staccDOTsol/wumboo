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
exports.FormControlWithError = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
function FormControlWithError(_a) {
    var _b, _c;
    var { id, label, help = "", children, errors } = _a, rest = __rest(_a, ["id", "label", "help", "children", "errors"]);
    const helpTextColor = { color: "black", _dark: { color: "gray.400" } };
    return (react_1.default.createElement(react_2.FormControl, Object.assign({ id: id, isInvalid: !!((_b = errors[id]) === null || _b === void 0 ? void 0 : _b.message) }, rest),
        label && react_1.default.createElement(react_2.FormLabel, { htmlFor: id }, label),
        children,
        !((_c = errors[id]) === null || _c === void 0 ? void 0 : _c.message) ? (react_1.default.createElement(react_2.FormHelperText, Object.assign({ fontSize: "xs" }, helpTextColor), help)) : (react_1.default.createElement(react_2.FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
            react_1.default.createElement(react_2.Icon, { as: ri_1.RiErrorWarningFill, mr: 1, fontSize: "1.3rem" }),
            errors[id].message))));
}
exports.FormControlWithError = FormControlWithError;
//# sourceMappingURL=FormControlWithError.js.map
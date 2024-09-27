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
exports.ProgressStep = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
const ProgressStep = (_a) => {
    var { step, isActive, isCompleted, isLast } = _a, avatarProps = __rest(_a, ["step", "isActive", "isCompleted", "isLast"]);
    const nameOrIcon = isCompleted
        ? { icon: react_1.default.createElement(ri_1.RiCheckLine, { fontSize: "1.2rem", color: "white" }) }
        : { name: `${step}` };
    const bg = isActive
        ? { bg: "primary.500" }
        : isCompleted
            ? { bg: "green.500" }
            : { bg: "gray.300", _dark: { bg: "gray.800" } };
    const dividerColor = isCompleted
        ? { borderColor: "green.500" }
        : { borderColor: "gray.300", _dark: { borderColor: "gray.800" } };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_2.Avatar, Object.assign({ ariaLabel: `Progress Step ${step}` }, nameOrIcon, bg, avatarProps)),
        !isLast && react_1.default.createElement(react_2.Divider, Object.assign({}, dividerColor))));
};
exports.ProgressStep = ProgressStep;
//# sourceMappingURL=ProgressStep.js.map
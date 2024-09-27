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
exports.RadioCardWithAffordance = exports.RadioCard = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const RadioCard = (_a) => {
    var { 
    //@ts-ignore
    children, disabled = false } = _a, props = __rest(_a, ["children", "disabled"]);
    const { getInputProps, getCheckboxProps } = (0, react_2.useRadio)(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const bg = (0, react_2.useColorModeValue)("gray.200", "gray.800");
    return (react_1.default.createElement(react_2.Box, { onClick: (e) => {
            if (disabled) {
                e.preventDefault();
                e.stopPropagation();
            }
        } },
        react_1.default.createElement(react_2.Box, { as: "label" },
            react_1.default.createElement("input", Object.assign({}, input)),
            react_1.default.createElement(react_2.Box, Object.assign({}, checkbox, { mt: { base: 2, md: 0 }, mr: 2, cursor: "pointer", borderWidth: "1px", borderRadius: "md", bg: bg, _checked: {
                    bg: "orange.600",
                    color: "white",
                    borderColor: "orange.600",
                } }), children))));
};
exports.RadioCard = RadioCard;
const RadioCardWithAffordance = (_a) => {
    var { 
    //@ts-ignore
    children, disabled = false, containerProps = {} } = _a, props = __rest(_a, ["children", "disabled", "containerProps"]);
    const { getInputProps, getCheckboxProps } = (0, react_2.useRadio)(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const bg = (0, react_2.useColorModeValue)("gray.200", "gray.800");
    return (react_1.default.createElement(react_2.Box, Object.assign({ w: "full", maxW: { base: "auto", md: "242px" }, flexGrow: 1, flexShrink: 1, flexBasis: 0 }, containerProps, { onClick: (e) => {
            if (disabled) {
                e.preventDefault();
                e.stopPropagation();
            }
        } }),
        react_1.default.createElement(react_2.Box, { as: "label", textAlign: "center" },
            react_1.default.createElement("input", Object.assign({}, input)),
            react_1.default.createElement(react_2.Stack, Object.assign({}, checkbox, { cursor: disabled ? "inherit" : "pointer", opacity: disabled ? 0.4 : 1, borderWidth: "1px", borderRadius: "md", borderColor: "gray.500", position: "relative", mb: 2, _hover: disabled
                    ? {}
                    : {
                        borderColor: "white",
                    }, _checked: {
                    bg: bg,
                    borderColor: "white",
                }, flexDirection: "column", justifyContent: "space-between" }),
                react_1.default.createElement(react_2.Flex, { justifyContent: "right", position: "absolute", top: 4, right: 2 },
                    react_1.default.createElement(react_2.Flex, { w: 4, h: 4, rounded: "full", bg: input.checked ? "orange.500" : "gray.200", _hover: disabled ? {} : { bg: "orange.500" }, justifyContent: "center", alignItems: "center" },
                        react_1.default.createElement(react_2.Box, Object.assign({}, (input.checked
                            ? { w: 1.5, h: 1.5 }
                            : { w: 3, h: 3 }), { rounded: "full", bg: "white" })))),
                children))));
};
exports.RadioCardWithAffordance = RadioCardWithAffordance;
//# sourceMappingURL=RadioCard.js.map
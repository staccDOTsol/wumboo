"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const Container = (props) => {
    const { colorMode } = (0, react_2.useColorMode)();
    const bgColor = { light: "gray.50", dark: "gray.900" };
    const color = { light: "black", dark: "white" };
    return (react_1.default.createElement(react_2.Flex, Object.assign({ direction: "row", alignItems: "center", justifyContent: "flex-start", width: "100vw", bg: bgColor[colorMode], color: color[colorMode] }, props)));
};
exports.Container = Container;
//# sourceMappingURL=Container.js.map
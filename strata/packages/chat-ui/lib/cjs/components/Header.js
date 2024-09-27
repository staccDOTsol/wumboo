"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const fi_1 = require("react-icons/fi");
//@ts-ignore
const Header = ({ children, onSidebarOpen }) => (react_1.default.createElement(react_2.Flex, { as: "header", align: "center", justify: "space-between", w: "full", px: 4, bg: "white", _dark: {
        bg: "gray.900",
    }, borderBottomWidth: "1px", color: "inherit", minH: "16", gap: 4 },
    react_1.default.createElement(react_2.IconButton, { "aria-label": "Menu", display: {
            base: "inline-flex",
            md: "none",
        }, onClick: onSidebarOpen, icon: react_1.default.createElement(fi_1.FiMenu, null), size: "md" }),
    react_1.default.createElement(react_2.Flex, { align: "center", w: "full" }, children)));
exports.Header = Header;
//# sourceMappingURL=Header.js.map
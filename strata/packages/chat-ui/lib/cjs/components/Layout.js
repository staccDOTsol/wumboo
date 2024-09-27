"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const Sidebar_1 = require("./Sidebar");
const useWindowSize_1 = require("../hooks/useWindowSize");
const DARK_BG = {
    bg: "gray.900",
};
const ML = {
    base: 0,
    md: 80,
};
const Layout = ({ children, isSidebarOpen, onSidebarClose, }) => {
    const [width, height] = (0, useWindowSize_1.useWindowSize)();
    const breakpointDisplay = (0, react_2.useBreakpointValue)({
        base: "none",
        md: "unset",
    });
    return (react_1.default.createElement(react_2.Flex, { as: "section", bg: "gray.50", _dark: DARK_BG, h: height, w: width },
        breakpointDisplay === "unset" && react_1.default.createElement(Sidebar_1.Sidebar, null),
        react_1.default.createElement(react_2.Drawer, { isOpen: isSidebarOpen, onClose: onSidebarClose, placement: "left" },
            react_1.default.createElement(react_2.DrawerOverlay, null),
            react_1.default.createElement(react_2.DrawerContent, null, isSidebarOpen && (react_1.default.createElement(Sidebar_1.Sidebar, { w: "full", borderRight: "none", onClose: onSidebarClose })))),
        react_1.default.createElement(react_2.Flex, { ml: ML, transition: ".3s ease", direction: "column", h: "full", w: "full" }, children)));
};
exports.Layout = Layout;
//# sourceMappingURL=Layout.js.map
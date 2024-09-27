import React from "react";
import { Flex, Drawer, DrawerOverlay, DrawerContent, useBreakpointValue, } from "@chakra-ui/react";
import { Sidebar } from "./Sidebar";
import { useWindowSize } from "../hooks/useWindowSize";
const DARK_BG = {
    bg: "gray.900",
};
const ML = {
    base: 0,
    md: 80,
};
export const Layout = ({ children, isSidebarOpen, onSidebarClose, }) => {
    const [width, height] = useWindowSize();
    const breakpointDisplay = useBreakpointValue({
        base: "none",
        md: "unset",
    });
    return (React.createElement(Flex, { as: "section", bg: "gray.50", _dark: DARK_BG, h: height, w: width },
        breakpointDisplay === "unset" && React.createElement(Sidebar, null),
        React.createElement(Drawer, { isOpen: isSidebarOpen, onClose: onSidebarClose, placement: "left" },
            React.createElement(DrawerOverlay, null),
            React.createElement(DrawerContent, null, isSidebarOpen && (React.createElement(Sidebar, { w: "full", borderRight: "none", onClose: onSidebarClose })))),
        React.createElement(Flex, { ml: ML, transition: ".3s ease", direction: "column", h: "full", w: "full" }, children)));
};
//# sourceMappingURL=Layout.js.map
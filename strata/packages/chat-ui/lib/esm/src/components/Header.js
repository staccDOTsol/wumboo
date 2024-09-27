import React from "react";
import { IconButton, Flex } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
//@ts-ignore
export const Header = ({ children, onSidebarOpen }) => (React.createElement(Flex, { as: "header", align: "center", justify: "space-between", w: "full", px: 4, bg: "white", _dark: {
        bg: "gray.900",
    }, borderBottomWidth: "1px", color: "inherit", minH: "16", gap: 4 },
    React.createElement(IconButton, { "aria-label": "Menu", display: {
            base: "inline-flex",
            md: "none",
        }, onClick: onSidebarOpen, icon: React.createElement(FiMenu, null), size: "md" }),
    React.createElement(Flex, { align: "center", w: "full" }, children)));
//# sourceMappingURL=Header.js.map
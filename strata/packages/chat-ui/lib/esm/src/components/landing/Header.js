import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Container, DarkMode, Flex, HStack, Icon, IconButton, Text, Image, Link, useDisclosure, VStack, } from "@chakra-ui/react";
import { ProfileButton } from "../../../src/components/ProfileButton";
import React from "react";
import { route, routes } from "../../routes";
import { CreateChatModal } from "../CreateChat/CreateChatModal";
import { RiMenuAddLine } from "react-icons/ri";
const NavLink = ({ href, children }) => (React.createElement(Link, { px: 2, py: 1, href: href, fontSize: "sm" }, children));
export const Header = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose, } = useDisclosure();
    const Links = [
        { link: "My Chats", href: route(routes.chats) },
        {
            link: "Developer Docs",
            href: "https://docs.strataprotocol.com/im/getting_started",
        },
    ];
    const CreateChat = (React.createElement(Button, { onClick: () => onChatOpen(), colorScheme: "primary", variant: isOpen ? "ghost" : "outline", leftIcon: React.createElement(Icon, { color: "white", as: RiMenuAddLine }), px: 8 },
        React.createElement(Text, { color: "white" }, "Create Chat")));
    return (React.createElement(React.Fragment, null,
        React.createElement(CreateChatModal, { isOpen: isChatOpen, onClose: onChatClose }),
        React.createElement(Box, { zIndex: 100, color: "white", bg: "black.300", w: "full" },
            React.createElement(Center, { w: "full", height: "56px", alignItems: "center" },
                React.createElement(Container, { maxW: "container.lg", w: "full", display: "flex", justifyContent: "space-between", alignItems: "center" },
                    React.createElement(IconButton, { size: "md", bg: "black.300", icon: isOpen ? React.createElement(CloseIcon, null) : React.createElement(HamburgerIcon, null), "aria-label": "Open Menu", display: { md: "none" }, _active: {
                            bg: "black.300",
                        }, _hover: {
                            bg: "black.300",
                        }, onClick: isOpen ? onClose : onOpen }),
                    React.createElement(HStack, { spacing: 8, alignItems: "center" },
                        React.createElement(Link, { href: "/" },
                            React.createElement(Image, { alt: "strata.im", src: "/logo.svg" })),
                        React.createElement(HStack, { as: "nav", spacing: 4, display: { base: "none", md: "flex" } }, Links.map((link) => (React.createElement(NavLink, { key: link.link, href: link.href }, link.link))))),
                    React.createElement(HStack, { align: "center", justify: ["center", "space-between", "flex-end", "flex-end"], direction: ["column", "row", "row", "row"], pt: "0" },
                        React.createElement(Flex, { justify: "center", align: "center", display: { base: "none", md: "flex" } },
                            React.createElement(DarkMode, null,
                                React.createElement(HStack, null,
                                    CreateChat,
                                    React.createElement(ProfileButton, null)))),
                        React.createElement(Flex, { justify: "center", display: { base: "flex", md: "none" } },
                            React.createElement(DarkMode, null,
                                React.createElement(ProfileButton, { size: "sm" })))))),
            isOpen ? (React.createElement(Box, { pb: 4, display: { md: "none" } },
                React.createElement(VStack, { as: "nav", spacing: 4 },
                    CreateChat,
                    Links.map((link) => (React.createElement(NavLink, { key: link.link, href: link.href }, link.link)))))) : null)));
};
//# sourceMappingURL=Header.js.map
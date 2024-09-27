"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = void 0;
const icons_1 = require("@chakra-ui/icons");
const react_1 = require("@chakra-ui/react");
const ProfileButton_1 = require("../../../src/components/ProfileButton");
const react_2 = __importDefault(require("react"));
const routes_1 = require("../../routes");
const CreateChatModal_1 = require("../CreateChat/CreateChatModal");
const ri_1 = require("react-icons/ri");
const NavLink = ({ href, children }) => (react_2.default.createElement(react_1.Link, { px: 2, py: 1, href: href, fontSize: "sm" }, children));
const Header = () => {
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    const { isOpen: isChatOpen, onOpen: onChatOpen, onClose: onChatClose, } = (0, react_1.useDisclosure)();
    const Links = [
        { link: "My Chats", href: (0, routes_1.route)(routes_1.routes.chats) },
        {
            link: "Developer Docs",
            href: "https://docs.strataprotocol.com/im/getting_started",
        },
    ];
    const CreateChat = (react_2.default.createElement(react_1.Button, { onClick: () => onChatOpen(), colorScheme: "primary", variant: isOpen ? "ghost" : "outline", leftIcon: react_2.default.createElement(react_1.Icon, { color: "white", as: ri_1.RiMenuAddLine }), px: 8 },
        react_2.default.createElement(react_1.Text, { color: "white" }, "Create Chat")));
    return (react_2.default.createElement(react_2.default.Fragment, null,
        react_2.default.createElement(CreateChatModal_1.CreateChatModal, { isOpen: isChatOpen, onClose: onChatClose }),
        react_2.default.createElement(react_1.Box, { zIndex: 100, color: "white", bg: "black.300", w: "full" },
            react_2.default.createElement(react_1.Center, { w: "full", height: "56px", alignItems: "center" },
                react_2.default.createElement(react_1.Container, { maxW: "container.lg", w: "full", display: "flex", justifyContent: "space-between", alignItems: "center" },
                    react_2.default.createElement(react_1.IconButton, { size: "md", bg: "black.300", icon: isOpen ? react_2.default.createElement(icons_1.CloseIcon, null) : react_2.default.createElement(icons_1.HamburgerIcon, null), "aria-label": "Open Menu", display: { md: "none" }, _active: {
                            bg: "black.300",
                        }, _hover: {
                            bg: "black.300",
                        }, onClick: isOpen ? onClose : onOpen }),
                    react_2.default.createElement(react_1.HStack, { spacing: 8, alignItems: "center" },
                        react_2.default.createElement(react_1.Link, { href: "/" },
                            react_2.default.createElement(react_1.Image, { alt: "strata.im", src: "/logo.svg" })),
                        react_2.default.createElement(react_1.HStack, { as: "nav", spacing: 4, display: { base: "none", md: "flex" } }, Links.map((link) => (react_2.default.createElement(NavLink, { key: link.link, href: link.href }, link.link))))),
                    react_2.default.createElement(react_1.HStack, { align: "center", justify: ["center", "space-between", "flex-end", "flex-end"], direction: ["column", "row", "row", "row"], pt: "0" },
                        react_2.default.createElement(react_1.Flex, { justify: "center", align: "center", display: { base: "none", md: "flex" } },
                            react_2.default.createElement(react_1.DarkMode, null,
                                react_2.default.createElement(react_1.HStack, null,
                                    CreateChat,
                                    react_2.default.createElement(ProfileButton_1.ProfileButton, null)))),
                        react_2.default.createElement(react_1.Flex, { justify: "center", display: { base: "flex", md: "none" } },
                            react_2.default.createElement(react_1.DarkMode, null,
                                react_2.default.createElement(ProfileButton_1.ProfileButton, { size: "sm" })))))),
            isOpen ? (react_2.default.createElement(react_1.Box, { pb: 4, display: { md: "none" } },
                react_2.default.createElement(react_1.VStack, { as: "nav", spacing: 4 },
                    CreateChat,
                    Links.map((link) => (react_2.default.createElement(NavLink, { key: link.link, href: link.href }, link.link)))))) : null)));
};
exports.Header = Header;
//# sourceMappingURL=Header.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
const ProfileButton_1 = require("./ProfileButton");
const ChatSidebarPreview_1 = require("./rooms/ChatSidebarPreview");
const react_3 = require("@strata-foundation/react");
const globals_1 = require("../constants/globals");
const router_1 = require("next/router");
const useChat_1 = require("../hooks/useChat");
const useChatKeyFromIdentifier_1 = require("../hooks/useChatKeyFromIdentifier");
const CreateChatButton_1 = require("./CreateChat/CreateChatButton");
const DARK_BG = {
    bg: "gray.900",
};
const Sidebar = (props) => {
    const [input, setInput] = (0, react_1.useState)("");
    const { colorMode, toggleColorMode } = (0, react_2.useColorMode)();
    const [chats, setChats] = (0, react_3.useLocalStorage)("chats", globals_1.VISIBLE_CHATS);
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const { chatKey, loading: loadingId } = (0, useChatKeyFromIdentifier_1.useChatKeyFromIdentifier)(id);
    const { info: chat } = (0, useChat_1.useChat)(chatKey);
    (0, react_1.useEffect)(() => {
        if (chat && id && chats.indexOf(id) === -1) {
            setChats([...new Set([...chats, id])]);
        }
    }, [setChats, chats, chat, id]);
    const handleSearch = (e) => {
        const content = e.currentTarget.value;
        setInput(content);
    };
    return (react_1.default.createElement(react_2.VStack, Object.assign({ position: "relative", h: "full", grow: 1, as: "nav", pos: "fixed", top: "0", left: "0", overflowX: "hidden", overflowY: "auto", bg: "white", _dark: DARK_BG, color: "inherit", borderRightWidth: "1px", w: "80", pt: 3, pb: 0, gap: 1 }, props),
        react_1.default.createElement(react_2.Flex, { gap: 2, px: 4, pb: 2, w: "full" },
            react_1.default.createElement(react_2.InputGroup, null,
                react_1.default.createElement(react_2.InputLeftElement, { pointerEvents: "none" },
                    react_1.default.createElement(react_2.Icon, { as: ri_1.RiSearch2Line })),
                react_1.default.createElement(react_2.Input, { type: "search", variant: "filled", placeholder: "Search", value: input, onChange: handleSearch })),
            react_1.default.createElement(CreateChatButton_1.CreateChatButton, { colorScheme: "gray", rounded: "full", variant: "outline", "aria-label": "Create Chat Button" })),
        react_1.default.createElement(react_2.Flex, { direction: "column", as: "nav", w: "full", px: 4, fontSize: "sm", color: "gray.600", "aria-label": "Main Navigation", grow: 1, gap: 2, overflowY: "scroll" }, chats
            .filter((identifier) => identifier.includes(input))
            .map((identifier) => (react_1.default.createElement(ChatSidebarPreview_1.ChatSidebarPreview, { onClose: () => {
                setChats([...chats.filter((c) => c !== identifier)]);
            }, key: identifier, identifier: identifier, onClick: () => {
                setInput("");
                props.onClose && props.onClose();
            } })))),
        react_1.default.createElement(react_2.VStack, { w: "full", gap: 0, spacing: 0, px: 0 },
            react_1.default.createElement(react_2.Divider, null),
            react_1.default.createElement(react_2.IconButton, { w: "full", colorScheme: "gray", variant: "ghost", rounded: "none", "aria-label": "Toggle Dark Mode", icon: colorMode === "light" ? (react_1.default.createElement(react_2.Icon, { as: ri_1.RiMoonLine })) : (react_1.default.createElement(react_2.Icon, { as: ri_1.RiSunLine })), onClick: toggleColorMode }),
            react_1.default.createElement(react_2.Divider, null),
            react_1.default.createElement(react_2.Flex, { pt: 3.5, pb: 3.5, align: "center", justifyContent: "space-evenly", w: "full" },
                react_1.default.createElement(ProfileButton_1.ProfileButton, { size: "lg" })))));
};
exports.Sidebar = Sidebar;
//# sourceMappingURL=Sidebar.js.map
import React, { useEffect, useState } from "react";
import { Divider, Icon, IconButton, Input, InputGroup, InputLeftElement, useColorMode, VStack, Flex, } from "@chakra-ui/react";
import { RiSearch2Line, RiSunLine, RiMoonLine } from "react-icons/ri";
import { ProfileButton } from "./ProfileButton";
import { ChatSidebarPreview } from "./rooms/ChatSidebarPreview";
import { useLocalStorage } from "@strata-foundation/react";
import { VISIBLE_CHATS } from "../constants/globals";
import { useRouter } from "next/router";
import { useChat } from "../hooks/useChat";
import { useChatKeyFromIdentifier } from "../hooks/useChatKeyFromIdentifier";
import { CreateChatButton } from "./CreateChat/CreateChatButton";
const DARK_BG = {
    bg: "gray.900",
};
export const Sidebar = (props) => {
    const [input, setInput] = useState("");
    const { colorMode, toggleColorMode } = useColorMode();
    const [chats, setChats] = useLocalStorage("chats", VISIBLE_CHATS);
    const router = useRouter();
    const { id } = router.query;
    const { chatKey, loading: loadingId } = useChatKeyFromIdentifier(id);
    const { info: chat } = useChat(chatKey);
    useEffect(() => {
        if (chat && id && chats.indexOf(id) === -1) {
            setChats([...new Set([...chats, id])]);
        }
    }, [setChats, chats, chat, id]);
    const handleSearch = (e) => {
        const content = e.currentTarget.value;
        setInput(content);
    };
    return (React.createElement(VStack, { position: "relative", h: "full", grow: 1, as: "nav", pos: "fixed", top: "0", left: "0", overflowX: "hidden", overflowY: "auto", bg: "white", _dark: DARK_BG, color: "inherit", borderRightWidth: "1px", w: "80", pt: 3, pb: 0, gap: 1, ...props },
        React.createElement(Flex, { gap: 2, px: 4, pb: 2, w: "full" },
            React.createElement(InputGroup, null,
                React.createElement(InputLeftElement, { pointerEvents: "none" },
                    React.createElement(Icon, { as: RiSearch2Line })),
                React.createElement(Input, { type: "search", variant: "filled", placeholder: "Search", value: input, onChange: handleSearch })),
            React.createElement(CreateChatButton, { colorScheme: "gray", rounded: "full", variant: "outline", "aria-label": "Create Chat Button" })),
        React.createElement(Flex, { direction: "column", as: "nav", w: "full", px: 4, fontSize: "sm", color: "gray.600", "aria-label": "Main Navigation", grow: 1, gap: 2, overflowY: "scroll" }, chats
            .filter((identifier) => identifier.includes(input))
            .map((identifier) => (React.createElement(ChatSidebarPreview, { onClose: () => {
                setChats([...chats.filter((c) => c !== identifier)]);
            }, key: identifier, identifier: identifier, onClick: () => {
                setInput("");
                props.onClose && props.onClose();
            } })))),
        React.createElement(VStack, { w: "full", gap: 0, spacing: 0, px: 0 },
            React.createElement(Divider, null),
            React.createElement(IconButton, { w: "full", colorScheme: "gray", variant: "ghost", rounded: "none", "aria-label": "Toggle Dark Mode", icon: colorMode === "light" ? (React.createElement(Icon, { as: RiMoonLine })) : (React.createElement(Icon, { as: RiSunLine })), onClick: toggleColorMode }),
            React.createElement(Divider, null),
            React.createElement(Flex, { pt: 3.5, pb: 3.5, align: "center", justifyContent: "space-evenly", w: "full" },
                React.createElement(ProfileButton, { size: "lg" })))));
};
//# sourceMappingURL=Sidebar.js.map
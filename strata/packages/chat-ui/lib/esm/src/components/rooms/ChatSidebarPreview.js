import { Avatar, SkeletonCircle, SkeletonText, Text, useColorMode, useColorModeValue, VStack, Flex, CloseButton, } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useChat } from "../../hooks/useChat";
import { useChatKeyFromIdentifier } from "../../hooks/useChatKeyFromIdentifier";
import { route, routes } from "../../routes";
export function ChatSidebarPreview({ identifier, onClick, onClose }) {
    const { chatKey, loading: loadingId } = useChatKeyFromIdentifier(identifier);
    const { info: chat, loading: loadingChat } = useChat(chatKey);
    const loading = loadingId || loadingChat;
    const { colorMode } = useColorMode();
    const router = useRouter();
    const { id } = router.query;
    const highlightedBg = useColorModeValue("gray.200", "gray.800");
    const subtext = useColorModeValue("gray.500", "gray.400");
    const [closeVisible, setCloseVisible] = useState(false);
    //push to url for specific chat
    const handleClick = async () => {
        await router.push(route(routes.chat, { id: identifier }), undefined, {
            shallow: true,
        });
        onClick && onClick();
    };
    return (React.createElement(Flex, { onMouseEnter: () => setCloseVisible(true), onMouseLeave: () => setCloseVisible(false), position: "relative", overflow: "none", minW: "200px", align: "center", bg: identifier === id ? highlightedBg : undefined, px: 4, py: 3, cursor: "pointer", borderRadius: "10px", _hover: { bg: colorMode === "light" ? "gray.200" : "gray.700" }, onClick: handleClick },
        React.createElement(CloseButton, { color: useColorModeValue("gray.600", "gray.400"), _hover: { color: "gray.600", cursor: "pointer" }, display: closeVisible ? "block" : "none", position: "absolute", right: "0px", top: "0px", onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            } }),
        loading ? (React.createElement(SkeletonCircle, { mr: 2 })) : (React.createElement(Avatar, { mr: 2, size: "md", src: chat?.imageUrl })),
        loading ? (React.createElement(SkeletonText, { width: "200px" })) : (React.createElement(VStack, { spacing: 0, align: "start" },
            React.createElement(Text, { fontSize: "md", _dark: { color: "white" } }, chat?.name),
            React.createElement(Text, { fontSize: "sm", color: subtext },
                identifier,
                ".chat")))));
}
//# sourceMappingURL=ChatSidebarPreview.js.map
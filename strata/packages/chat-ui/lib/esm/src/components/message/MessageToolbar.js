import { useReply } from "../../contexts/reply";
import { useEmojis } from "../../contexts/emojis";
import React, { useCallback, useMemo } from "react";
import { ButtonGroup, Flex, Icon, IconButton, useColorModeValue, Tooltip, } from "@chakra-ui/react";
import { MdOutlineAddReaction } from "react-icons/md";
import { MdReply } from "react-icons/md";
export const MessageToolbar = ({ id: messageId, ...rest }) => {
    const { showPicker } = useEmojis();
    const handleOnReaction = useCallback(() => {
        showPicker(messageId);
    }, [showPicker, messageId]);
    const highlightedBg = useColorModeValue("gray.200", "gray.800");
    const iconButtonDark = useMemo(() => ({
        bg: "gray.900",
        _hover: {
            bg: highlightedBg,
        },
    }), [highlightedBg]);
    const { showReply } = useReply();
    const handleOnReply = useCallback(() => {
        showReply({ id: messageId, ...rest });
    }, [showReply, messageId]);
    return (React.createElement(Flex, { direction: "row", justifyContent: "end" },
        React.createElement(ButtonGroup, { size: "lg", isAttached: true, variant: "outline" },
            React.createElement(Tooltip, { placement: "top", label: "Add Reaction", fontSize: "xs", borderRadius: "md", bg: "gray.200", color: "black", _dark: {
                    bg: "gray.700",
                    color: "white",
                } },
                React.createElement(IconButton, { borderRight: "none", icon: React.createElement(Icon, { as: MdOutlineAddReaction }), w: "32px", h: "32px", variant: "outline", size: "md", "aria-label": "Add Reaction", bg: "white", _dark: iconButtonDark, onClick: handleOnReaction })),
            React.createElement(Tooltip, { placement: "top", label: "Reply", fontSize: "xs", borderRadius: "md", bg: "gray.200", color: "black", _dark: {
                    bg: "gray.700",
                    color: "white",
                } },
                React.createElement(IconButton, { icon: React.createElement(Icon, { as: MdReply }), w: "32px", h: "32px", variant: "outline", size: "md", "aria-label": "Reply", bg: "white", _dark: iconButtonDark, onClick: handleOnReply })))));
};
//# sourceMappingURL=MessageToolbar.js.map
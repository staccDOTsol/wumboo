import { Avatar, Flex, HStack, Text } from "@chakra-ui/react";
import { MessageType } from "@strata-foundation/chat";
import { truncatePubkey } from "@strata-foundation/react";
import React, { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { useUsernameFromIdentifierCertificate } from "../../hooks/useUsernameFromIdentifierCertificate";
import { useWalletProfile } from "../../hooks/useWalletProfile";
const STYLE = {
    color: "gray.500",
    _hover: {
        cursor: "pointer",
        color: "black",
        _dark: {
            color: "white",
        },
    },
};
const BEFORE_STYLE = {
    content: `""`,
    position: "absolute",
    left: "50%",
    top: "8px",
    width: "2px",
    height: "12px",
    bg: "gray.300",
};
const AFTER_STYLE = {
    content: `""`,
    position: "absolute",
    left: "50%",
    top: "8px",
    width: "20px",
    height: "2px",
    bg: "gray.300",
};
export function DisplayReply({ reply, scrollToMessage, }) {
    const { result: decodedMessage } = useAsync(reply.getDecodedMessage, []);
    const { info: profile } = useWalletProfile(reply.sender);
    const { username, loading: loadingUsername } = useUsernameFromIdentifierCertificate(profile?.identifierCertificateMint, reply.sender);
    const name = useMemo(() => username || (reply.sender && truncatePubkey(reply.sender)), [username, reply?.sender?.toBase58()]);
    return (React.createElement(HStack, { p: 1, pb: 0, w: "full", align: "start", spacing: 2, fontSize: "xs" },
        React.createElement(Flex, { w: "36px", h: "100%", flexShrink: 0, position: "relative", _before: BEFORE_STYLE, _after: AFTER_STYLE, _dark: {
                _before: {
                    bg: "gray.700",
                },
                _after: {
                    bg: "gray.700",
                },
            } }),
        React.createElement(HStack, { gap: 0, spacing: 1, onClick: () => scrollToMessage(reply.id), ...STYLE },
            React.createElement(Avatar, { size: "2xs", src: profile?.imageUrl }),
            React.createElement(Text, { fontSize: "xs", fontWeight: "semibold", color: "green.500", _dark: { color: "green.200" } }, name),
            decodedMessage ? (
            // successfully decoded
            React.createElement(React.Fragment, null, reply.type === MessageType.Text ? (React.createElement(Text, { maxW: { base: "150px", md: "600px" }, noOfLines: 1 }, decodedMessage.text)) : reply.type === MessageType.Html ? (React.createElement(Text, { maxW: { base: "150px", md: "600px" }, noOfLines: 1 }, decodedMessage.html?.replace(/<[^>]*>?/gm, ""))) : (React.createElement(Text, null, "Click to see attachment")))) : (
            // need to fetch more messages
            React.createElement(Text, null, "Click to find reply")))));
}
//# sourceMappingURL=DisplayReply.js.map
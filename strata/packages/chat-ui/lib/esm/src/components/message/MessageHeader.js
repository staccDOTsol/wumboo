import { HStack, Text, Show } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TokenFlare } from "../TokenFlare";
import moment from "moment";
import { useWalletProfile } from "../../hooks/useWalletProfile";
import { useUsernameFromIdentifierCertificate } from "../../hooks/useUsernameFromIdentifierCertificate";
import { truncatePubkey, truthy } from "@strata-foundation/react";
import { useChatPermissionsFromChat } from "../../hooks/useChatPermissionsFromChat";
export function MessageHeader({ chatKey, sender, startBlockTime, }) {
    const { info: chatPermissions } = useChatPermissionsFromChat(chatKey);
    const { info: profile } = useWalletProfile(sender);
    const { username } = useUsernameFromIdentifierCertificate(profile?.identifierCertificateMint, sender);
    const name = useMemo(() => username || (sender && truncatePubkey(sender)), [username, sender?.toBase58()]);
    const time = useMemo(() => {
        if (startBlockTime) {
            const t = new Date(0);
            t.setUTCSeconds(startBlockTime);
            return t;
        }
    }, [startBlockTime]);
    const tokens = useMemo(() => [
        chatPermissions?.readPermissionKey,
        chatPermissions?.postPermissionKey,
    ].filter(truthy), [chatPermissions?.readPermissionKey, chatPermissions?.postPermissionKey]);
    return (React.createElement(HStack, { alignItems: "center" },
        React.createElement(Text, { fontSize: "sm", fontWeight: "semibold", color: "green.500", _dark: { color: "green.200" } }, name),
        React.createElement(Show, { below: "md" },
            React.createElement(Text, { fontSize: "xs", color: "gray.500", _dark: { color: "gray.400" } }, moment(time).format("LT"))),
        React.createElement(TokenFlare, { chat: chatKey, wallet: sender, tokens: tokens })));
}
//# sourceMappingURL=MessageHeader.js.map
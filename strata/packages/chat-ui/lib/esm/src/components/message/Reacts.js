import { Button, HStack, Icon, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text, } from "@chakra-ui/react";
import { truncatePubkey, useErrorHandler } from "@strata-foundation/react";
import React from "react";
import { MdOutlineAddReaction } from "react-icons/md";
import { useInflatedReacts } from "../../hooks/useInflatedReacts";
import { useWalletProfile } from "../../hooks/useWalletProfile";
import { useUsernameFromIdentifierCertificate } from "../../hooks/useUsernameFromIdentifierCertificate";
const MAX_MENTIONS_DISPLAY = 3;
function ProfileName({ sender }) {
    const { info: profile } = useWalletProfile(sender);
    const { username } = useUsernameFromIdentifierCertificate(profile?.identifierCertificateMint, sender);
    const name = username || (sender && truncatePubkey(sender));
    return React.createElement(Text, null,
        name,
        " ");
}
export function Reacts({ reacts, onReact, onAddReaction, }) {
    const { reacts: inflatedReacts, error: reactError, loading: reactsLoading, } = useInflatedReacts(reacts);
    const { handleErrors } = useErrorHandler();
    handleErrors(reactError);
    if (inflatedReacts && inflatedReacts.length > 0) {
        return (React.createElement(HStack, { mt: 2, pt: 1 },
            inflatedReacts.map(({ emoji, messages, mine }) => (React.createElement(Popover, { matchWidth: true, trigger: "hover", key: emoji },
                React.createElement(PopoverTrigger, null,
                    React.createElement(Button, { onClick: () => onReact(emoji, mine), borderLeftRadius: "20px", width: "55px", borderRightRadius: "20px", p: 0, variant: mine ? "solid" : "outline", size: "sm", key: emoji },
                        React.createElement(HStack, { spacing: 1 },
                            React.createElement(Text, { lineHeight: 0, fontSize: "lg" }, emoji),
                            React.createElement(Text, { lineHeight: 0, fontSize: "sm" }, messages.length)))),
                React.createElement(PopoverContent, { width: "fit-content", fontSize: "xs", borderRadius: "md", bg: "gray.200", border: 0, color: "black", py: 0, px: 0, _dark: {
                        bg: "gray.700",
                        color: "white",
                    } },
                    React.createElement(PopoverBody, null,
                        React.createElement(HStack, { spacing: 1 },
                            messages
                                .slice(0, MAX_MENTIONS_DISPLAY)
                                .map((message, index) => (React.createElement(HStack, { key: message.id, spacing: 0 },
                                React.createElement(ProfileName, { sender: message.sender }),
                                messages.length - 1 != index && React.createElement(Text, null, ", ")))),
                            messages.length > MAX_MENTIONS_DISPLAY && (React.createElement(Text, null,
                                "and ",
                                messages.length - MAX_MENTIONS_DISPLAY,
                                " others")))))))),
            React.createElement(Button, { borderLeftRadius: "20px", width: "55px", borderRightRadius: "20px", variant: "outline", size: "sm", onClick: onAddReaction },
                React.createElement(Icon, { as: MdOutlineAddReaction }))));
    }
    return React.createElement("div", null);
}
//# sourceMappingURL=Reacts.js.map
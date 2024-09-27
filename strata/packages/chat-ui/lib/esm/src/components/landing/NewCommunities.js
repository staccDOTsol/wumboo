import React, { useMemo } from "react";
import { useChatIdFromIdentifierCertificate } from "../../../src/hooks/useChatIdFromIdentifierCertificate";
import { useChats } from "../../../src/hooks/useChats";
import { Button, HStack, Image, SimpleGrid, Stack, Text, useColorModeValue, VStack, } from "@chakra-ui/react";
import { usePublicKey } from "@strata-foundation/react";
import { useRouter } from "next/router";
import { route, routes } from "../../routes";
import { ActiveUsers } from "./ActiveUsers";
import { FEATURED_COMMUNITIES } from "./FeaturedCommunities";
import { useAsync } from "react-async-hook";
import { SplTokenMetadata } from "@strata-foundation/spl-utils";
const Community = ({ imageUrl, name, metadataUrl, identifierCertificateMint, dailyActiveUsers, }) => {
    const mintKey = usePublicKey(identifierCertificateMint);
    const { chatId: id } = useChatIdFromIdentifierCertificate(mintKey);
    const router = useRouter();
    const { result: data, } = useAsync(SplTokenMetadata.getArweaveMetadata, [metadataUrl]);
    const description = useMemo(() => {
        const truncateLength = 100;
        if (!data?.description)
            return undefined;
        if (data.description.length > truncateLength) {
            return data.description.slice(0, truncateLength) + "...";
        }
        return data.description;
    }, [data]);
    return (React.createElement(VStack, { position: "relative", p: "0", rounded: "2xl", borderColor: useColorModeValue("gray.100", "gray.700"), borderWidth: "1px" },
        React.createElement(Image, { roundedTop: "2xl", style: { height: "60%" }, objectFit: "cover", w: "full", alt: name, src: imageUrl }),
        React.createElement(VStack, { spacing: 6, w: "full", p: 4 },
            React.createElement(VStack, { align: "stretch", w: "full", spacing: 2 },
                React.createElement(Text, { mb: "-10px", lineHeight: "120%", fontWeight: "extrabold", noOfLines: 2, textAlign: "left", fontSize: "2xl" }, name),
                React.createElement(Text, { fontSize: "12px", color: useColorModeValue("gray.700", "gray.100") },
                    id,
                    ".chat"),
                React.createElement(Text, { align: "left", color: useColorModeValue("gray.600", "gray.200") }, description)),
            React.createElement(HStack, { spacing: 2 }, typeof dailyActiveUsers !== "undefined" && (React.createElement(ActiveUsers, { num: dailyActiveUsers, fontSize: "12px" }))),
            React.createElement(Button, { w: "full", onClick: () => router.push(route(routes.chat, {
                    id,
                }), undefined, {
                    shallow: true,
                }), colorScheme: "primary" }, "Join Now!"))));
};
const featuredKeys = new Set(FEATURED_COMMUNITIES.map((c) => c.publicKey));
export const NewCommunities = () => {
    const { chats } = useChats();
    if (chats.length == 0)
        return null;
    return (React.createElement(Stack, { direction: "column", align: "start", spacing: 4, w: "full", pb: "100px", pt: 8 },
        React.createElement(Stack, { gap: 2 },
            React.createElement(Text, { fontSize: "sm", fontWeight: "semibold", color: "cyan.500" }, "BE A PART OF SOMETHING"),
            React.createElement(Text, { fontSize: "3xl", fontWeight: "bold" }, "New Communities"),
            React.createElement(Text, { w: "400px" }, "Join one of the already existing communities and begin chatting with your peers!")),
        React.createElement(SimpleGrid, { columns: { sm: 2, md: 3, lg: 4 }, spacing: 4 }, chats
            .filter((chat) => !featuredKeys.has(chat.publicKey))
            .map((chat) => (React.createElement(Community, { key: chat.publicKey, ...chat }))))));
};
//# sourceMappingURL=NewCommunities.js.map
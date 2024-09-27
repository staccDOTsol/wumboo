import React from "react";
import { useChatIdFromIdentifierCertificate } from "../../../src/hooks/useChatIdFromIdentifierCertificate";
import { useChats } from "../../../src/hooks/useChats";
import { Button, Center, HStack, Image, Stack, Text, useBreakpoint, useColorModeValue, VStack, } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { usePublicKey } from "@strata-foundation/react";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { route, routes } from "../../routes";
import { ActiveUsers } from "./ActiveUsers";
export const FEATURED_COMMUNITIES = [
    {
        name: "Solana Chat",
        description: "A place for the Solana community to unwind",
        publicKey: "EzNMGtFA62nvDfCybZi4vhfeJUoMJyMijcKoC8heoyHK",
        image: "https://solana.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Findex_low_cost.5dfdb6d1.png&w=2048&q=90",
    },
    {
        name: "Taiyo Robotics",
        description: '"Trying out some innovative sh*t that may one day lead to web3 discord. What you’ve all cried about for so long!" - Tom',
        publicKey: "ExLKWwbRGzE8Cy2z1bWPCk7iKE9iFZeVYFUgxhVUe98h",
        image: "/Taiyo.jpg",
    },
    {
        name: "Open Collective Chat",
        description: "Solana’s first decentralized art collective. Share, discover, and support 1:1 artists.",
        publicKey: "HN8GF8nKHLnymPUwn4cfNmtSwAcErRweDDDGzyhj6wKH",
        image: "/OC.jpg",
    },
];
const Community = ({ identifierCertificateMint, name, description, dailyActiveUsers, image, }) => {
    const mintKey = usePublicKey(identifierCertificateMint);
    const { chatId: id } = useChatIdFromIdentifierCertificate(mintKey);
    const router = useRouter();
    const breakpoint = useBreakpoint();
    return (React.createElement(Stack, { p: "0", h: { base: "600px", md: "400px" }, direction: { base: "column-reverse", md: "row" }, w: "full", rounded: "2xl", borderColor: useColorModeValue("gray.200", "gray.700"), borderWidth: "1px" },
        React.createElement(Center, { p: 8, flexGrow: 1 },
            React.createElement(VStack, { align: "start", spacing: 6 },
                React.createElement(VStack, { align: "start", w: "full", spacing: 2 },
                    React.createElement(Text, { mb: "-10px", lineHeight: "120%", fontWeight: "extrabold", noOfLines: 2, textAlign: "left", fontSize: "4xl" }, name),
                    React.createElement(Text, { fontSize: "12px", color: useColorModeValue("gray.700", "gray.100") },
                        id,
                        ".chat"),
                    React.createElement(Text, { align: "left", color: useColorModeValue("gray.600", "gray.200") }, description)),
                React.createElement(HStack, { spacing: 2 },
                    typeof dailyActiveUsers !== "undefined" && (React.createElement(ActiveUsers, { num: dailyActiveUsers, fontSize: "12px" })),
                    " "),
                React.createElement(Button, { colorScheme: "primary", onClick: () => router.push(route(routes.chat, {
                        id,
                    }), undefined, {
                        shallow: true,
                    }) }, "Join Now!"))),
        React.createElement(Image, { roundedTopLeft: { base: "2xl", md: "none" }, roundedTopRight: "2xl", roundedBottomRight: { base: "none", md: "2xl" }, style: {
                height: breakpoint && new Set(["base", "sm"]).has(breakpoint)
                    ? "200px"
                    : undefined,
                width: breakpoint && new Set(["base", "sm"]).has(breakpoint)
                    ? "100%"
                    : "60%",
            }, objectFit: { base: "cover", md: "scale-down" }, alt: name, src: image })));
};
const chatKeys = FEATURED_COMMUNITIES.map(({ publicKey }) => new PublicKey(publicKey));
export const FeaturedCommunities = () => {
    const { chats } = useChats(chatKeys, {
        minActiveUsers: 0,
    });
    const chatsWithDescription = useMemo(() => FEATURED_COMMUNITIES.map((community) => ({
        ...community,
        ...chats.find((chat) => chat.publicKey === community.publicKey),
    })), [chats]);
    return (
    // @ts-ignore
    React.createElement(Carousel, { interval: 10000, swipeable: true, emulateTouch: true, infiniteLoop: true, autoPlay: true }, chatsWithDescription.map((chat) => (React.createElement(Community, { key: chat.publicKey, ...chat })))));
};
//# sourceMappingURL=FeaturedCommunities.js.map
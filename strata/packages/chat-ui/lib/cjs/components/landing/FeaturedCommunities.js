"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeaturedCommunities = exports.FEATURED_COMMUNITIES = void 0;
const react_1 = __importDefault(require("react"));
const useChatIdFromIdentifierCertificate_1 = require("../../../src/hooks/useChatIdFromIdentifierCertificate");
const useChats_1 = require("../../../src/hooks/useChats");
const react_2 = require("@chakra-ui/react");
const web3_js_1 = require("@solana/web3.js");
const react_3 = require("@strata-foundation/react");
const router_1 = require("next/router");
const react_4 = require("react");
const react_responsive_carousel_1 = require("react-responsive-carousel");
require("react-responsive-carousel/lib/styles/carousel.min.css"); // requires a loader
const routes_1 = require("../../routes");
const ActiveUsers_1 = require("./ActiveUsers");
exports.FEATURED_COMMUNITIES = [
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
    const mintKey = (0, react_3.usePublicKey)(identifierCertificateMint);
    const { chatId: id } = (0, useChatIdFromIdentifierCertificate_1.useChatIdFromIdentifierCertificate)(mintKey);
    const router = (0, router_1.useRouter)();
    const breakpoint = (0, react_2.useBreakpoint)();
    return (react_1.default.createElement(react_2.Stack, { p: "0", h: { base: "600px", md: "400px" }, direction: { base: "column-reverse", md: "row" }, w: "full", rounded: "2xl", borderColor: (0, react_2.useColorModeValue)("gray.200", "gray.700"), borderWidth: "1px" },
        react_1.default.createElement(react_2.Center, { p: 8, flexGrow: 1 },
            react_1.default.createElement(react_2.VStack, { align: "start", spacing: 6 },
                react_1.default.createElement(react_2.VStack, { align: "start", w: "full", spacing: 2 },
                    react_1.default.createElement(react_2.Text, { mb: "-10px", lineHeight: "120%", fontWeight: "extrabold", noOfLines: 2, textAlign: "left", fontSize: "4xl" }, name),
                    react_1.default.createElement(react_2.Text, { fontSize: "12px", color: (0, react_2.useColorModeValue)("gray.700", "gray.100") },
                        id,
                        ".chat"),
                    react_1.default.createElement(react_2.Text, { align: "left", color: (0, react_2.useColorModeValue)("gray.600", "gray.200") }, description)),
                react_1.default.createElement(react_2.HStack, { spacing: 2 },
                    typeof dailyActiveUsers !== "undefined" && (react_1.default.createElement(ActiveUsers_1.ActiveUsers, { num: dailyActiveUsers, fontSize: "12px" })),
                    " "),
                react_1.default.createElement(react_2.Button, { colorScheme: "primary", onClick: () => router.push((0, routes_1.route)(routes_1.routes.chat, {
                        id,
                    }), undefined, {
                        shallow: true,
                    }) }, "Join Now!"))),
        react_1.default.createElement(react_2.Image, { roundedTopLeft: { base: "2xl", md: "none" }, roundedTopRight: "2xl", roundedBottomRight: { base: "none", md: "2xl" }, style: {
                height: breakpoint && new Set(["base", "sm"]).has(breakpoint)
                    ? "200px"
                    : undefined,
                width: breakpoint && new Set(["base", "sm"]).has(breakpoint)
                    ? "100%"
                    : "60%",
            }, objectFit: { base: "cover", md: "scale-down" }, alt: name, src: image })));
};
const chatKeys = exports.FEATURED_COMMUNITIES.map(({ publicKey }) => new web3_js_1.PublicKey(publicKey));
const FeaturedCommunities = () => {
    const { chats } = (0, useChats_1.useChats)(chatKeys, {
        minActiveUsers: 0,
    });
    const chatsWithDescription = (0, react_4.useMemo)(() => exports.FEATURED_COMMUNITIES.map((community) => (Object.assign(Object.assign({}, community), chats.find((chat) => chat.publicKey === community.publicKey)))), [chats]);
    return (
    // @ts-ignore
    react_1.default.createElement(react_responsive_carousel_1.Carousel, { interval: 10000, swipeable: true, emulateTouch: true, infiniteLoop: true, autoPlay: true }, chatsWithDescription.map((chat) => (react_1.default.createElement(Community, Object.assign({ key: chat.publicKey }, chat))))));
};
exports.FeaturedCommunities = FeaturedCommunities;
//# sourceMappingURL=FeaturedCommunities.js.map
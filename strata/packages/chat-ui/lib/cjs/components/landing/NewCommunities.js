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
exports.NewCommunities = void 0;
const react_1 = __importStar(require("react"));
const useChatIdFromIdentifierCertificate_1 = require("../../../src/hooks/useChatIdFromIdentifierCertificate");
const useChats_1 = require("../../../src/hooks/useChats");
const react_2 = require("@chakra-ui/react");
const react_3 = require("@strata-foundation/react");
const router_1 = require("next/router");
const routes_1 = require("../../routes");
const ActiveUsers_1 = require("./ActiveUsers");
const FeaturedCommunities_1 = require("./FeaturedCommunities");
const react_async_hook_1 = require("react-async-hook");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const Community = ({ imageUrl, name, metadataUrl, identifierCertificateMint, dailyActiveUsers, }) => {
    const mintKey = (0, react_3.usePublicKey)(identifierCertificateMint);
    const { chatId: id } = (0, useChatIdFromIdentifierCertificate_1.useChatIdFromIdentifierCertificate)(mintKey);
    const router = (0, router_1.useRouter)();
    const { result: data, } = (0, react_async_hook_1.useAsync)(spl_utils_1.SplTokenMetadata.getArweaveMetadata, [metadataUrl]);
    const description = (0, react_1.useMemo)(() => {
        const truncateLength = 100;
        if (!(data === null || data === void 0 ? void 0 : data.description))
            return undefined;
        if (data.description.length > truncateLength) {
            return data.description.slice(0, truncateLength) + "...";
        }
        return data.description;
    }, [data]);
    return (react_1.default.createElement(react_2.VStack, { position: "relative", p: "0", rounded: "2xl", borderColor: (0, react_2.useColorModeValue)("gray.100", "gray.700"), borderWidth: "1px" },
        react_1.default.createElement(react_2.Image, { roundedTop: "2xl", style: { height: "60%" }, objectFit: "cover", w: "full", alt: name, src: imageUrl }),
        react_1.default.createElement(react_2.VStack, { spacing: 6, w: "full", p: 4 },
            react_1.default.createElement(react_2.VStack, { align: "stretch", w: "full", spacing: 2 },
                react_1.default.createElement(react_2.Text, { mb: "-10px", lineHeight: "120%", fontWeight: "extrabold", noOfLines: 2, textAlign: "left", fontSize: "2xl" }, name),
                react_1.default.createElement(react_2.Text, { fontSize: "12px", color: (0, react_2.useColorModeValue)("gray.700", "gray.100") },
                    id,
                    ".chat"),
                react_1.default.createElement(react_2.Text, { align: "left", color: (0, react_2.useColorModeValue)("gray.600", "gray.200") }, description)),
            react_1.default.createElement(react_2.HStack, { spacing: 2 }, typeof dailyActiveUsers !== "undefined" && (react_1.default.createElement(ActiveUsers_1.ActiveUsers, { num: dailyActiveUsers, fontSize: "12px" }))),
            react_1.default.createElement(react_2.Button, { w: "full", onClick: () => router.push((0, routes_1.route)(routes_1.routes.chat, {
                    id,
                }), undefined, {
                    shallow: true,
                }), colorScheme: "primary" }, "Join Now!"))));
};
const featuredKeys = new Set(FeaturedCommunities_1.FEATURED_COMMUNITIES.map((c) => c.publicKey));
const NewCommunities = () => {
    const { chats } = (0, useChats_1.useChats)();
    if (chats.length == 0)
        return null;
    return (react_1.default.createElement(react_2.Stack, { direction: "column", align: "start", spacing: 4, w: "full", pb: "100px", pt: 8 },
        react_1.default.createElement(react_2.Stack, { gap: 2 },
            react_1.default.createElement(react_2.Text, { fontSize: "sm", fontWeight: "semibold", color: "cyan.500" }, "BE A PART OF SOMETHING"),
            react_1.default.createElement(react_2.Text, { fontSize: "3xl", fontWeight: "bold" }, "New Communities"),
            react_1.default.createElement(react_2.Text, { w: "400px" }, "Join one of the already existing communities and begin chatting with your peers!")),
        react_1.default.createElement(react_2.SimpleGrid, { columns: { sm: 2, md: 3, lg: 4 }, spacing: 4 }, chats
            .filter((chat) => !featuredKeys.has(chat.publicKey))
            .map((chat) => (react_1.default.createElement(Community, Object.assign({ key: chat.publicKey }, chat)))))));
};
exports.NewCommunities = NewCommunities;
//# sourceMappingURL=NewCommunities.js.map
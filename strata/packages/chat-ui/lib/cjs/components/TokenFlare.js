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
exports.TokenFlare = void 0;
const useChatPermissionsFromChat_1 = require("../hooks/useChatPermissionsFromChat");
const react_1 = require("@chakra-ui/react");
const web3_js_1 = require("@solana/web3.js");
const react_2 = require("@strata-foundation/react");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const react_3 = __importStar(require("react"));
const useChatOwnedAmounts_1 = require("../hooks/useChatOwnedAmounts");
function IndividualTokenFlare({ token, wallet, chat, }) {
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chat);
    const { ownedReadAmount, ownedPostAmount, isSame, loading } = (0, useChatOwnedAmounts_1.useChatOwnedAmounts)(wallet, chat);
    const { image, metadata } = (0, react_2.useTokenMetadata)(token);
    const color = (0, react_1.useColorModeValue)("gray.500", "gray.400");
    if (loading || !chatPermissions)
        return null;
    const isReadToken = token.equals(chatPermissions.readPermissionKey);
    const amount = isReadToken ? ownedReadAmount : ownedPostAmount;
    return (react_3.default.createElement(react_1.HStack, { paddingLeft: "2px", spacing: 1, alignItems: "flex-end" },
        react_3.default.createElement(react_1.Avatar, { alignSelf: "center", w: "12px", h: "12px", mt: "-1.5px", title: metadata === null || metadata === void 0 ? void 0 : metadata.data.symbol, src: image }),
        react_3.default.createElement(react_1.Text, { fontSize: "xs", color: color }, (0, spl_utils_1.numberWithCommas)((0, react_2.roundToDecimals)(amount || 0, 2)))));
}
function TokenFlare({ tokens, wallet, chat, }) {
    const uniqueTokens = (0, react_3.useMemo)(() => [...new Set(tokens.map((t) => t.toBase58()))].map((t) => new web3_js_1.PublicKey(t)), [tokens]);
    return (react_3.default.createElement(react_3.Fragment, null, uniqueTokens.map((token) => (react_3.default.createElement(IndividualTokenFlare, { key: token === null || token === void 0 ? void 0 : token.toBase58(), token: token, wallet: wallet, chat: chat })))));
}
exports.TokenFlare = TokenFlare;
//# sourceMappingURL=TokenFlare.js.map
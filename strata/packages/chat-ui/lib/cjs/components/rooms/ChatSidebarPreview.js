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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSidebarPreview = void 0;
const react_1 = require("@chakra-ui/react");
const router_1 = require("next/router");
const react_2 = __importStar(require("react"));
const useChat_1 = require("../../hooks/useChat");
const useChatKeyFromIdentifier_1 = require("../../hooks/useChatKeyFromIdentifier");
const routes_1 = require("../../routes");
function ChatSidebarPreview({ identifier, onClick, onClose }) {
    const { chatKey, loading: loadingId } = (0, useChatKeyFromIdentifier_1.useChatKeyFromIdentifier)(identifier);
    const { info: chat, loading: loadingChat } = (0, useChat_1.useChat)(chatKey);
    const loading = loadingId || loadingChat;
    const { colorMode } = (0, react_1.useColorMode)();
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const highlightedBg = (0, react_1.useColorModeValue)("gray.200", "gray.800");
    const subtext = (0, react_1.useColorModeValue)("gray.500", "gray.400");
    const [closeVisible, setCloseVisible] = (0, react_2.useState)(false);
    //push to url for specific chat
    const handleClick = () => __awaiter(this, void 0, void 0, function* () {
        yield router.push((0, routes_1.route)(routes_1.routes.chat, { id: identifier }), undefined, {
            shallow: true,
        });
        onClick && onClick();
    });
    return (react_2.default.createElement(react_1.Flex, { onMouseEnter: () => setCloseVisible(true), onMouseLeave: () => setCloseVisible(false), position: "relative", overflow: "none", minW: "200px", align: "center", bg: identifier === id ? highlightedBg : undefined, px: 4, py: 3, cursor: "pointer", borderRadius: "10px", _hover: { bg: colorMode === "light" ? "gray.200" : "gray.700" }, onClick: handleClick },
        react_2.default.createElement(react_1.CloseButton, { color: (0, react_1.useColorModeValue)("gray.600", "gray.400"), _hover: { color: "gray.600", cursor: "pointer" }, display: closeVisible ? "block" : "none", position: "absolute", right: "0px", top: "0px", onClick: (e) => {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            } }),
        loading ? (react_2.default.createElement(react_1.SkeletonCircle, { mr: 2 })) : (react_2.default.createElement(react_1.Avatar, { mr: 2, size: "md", src: chat === null || chat === void 0 ? void 0 : chat.imageUrl })),
        loading ? (react_2.default.createElement(react_1.SkeletonText, { width: "200px" })) : (react_2.default.createElement(react_1.VStack, { spacing: 0, align: "start" },
            react_2.default.createElement(react_1.Text, { fontSize: "md", _dark: { color: "white" } }, chat === null || chat === void 0 ? void 0 : chat.name),
            react_2.default.createElement(react_1.Text, { fontSize: "sm", color: subtext },
                identifier,
                ".chat")))));
}
exports.ChatSidebarPreview = ChatSidebarPreview;
//# sourceMappingURL=ChatSidebarPreview.js.map
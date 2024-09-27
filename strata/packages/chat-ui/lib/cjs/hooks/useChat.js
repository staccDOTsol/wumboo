"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChat = void 0;
const react_1 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useChat = (chat) => {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return (0, react_1.useAccount)(chat, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.chatDecoder);
};
exports.useChat = useChat;
//# sourceMappingURL=useChat.js.map
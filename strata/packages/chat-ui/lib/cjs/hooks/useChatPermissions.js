"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatPermissions = void 0;
const react_1 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useChatPermissions = (chatPermissions) => {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return (0, react_1.useAccount)(chatPermissions, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.chatPermissionsDecoder);
};
exports.useChatPermissions = useChatPermissions;
//# sourceMappingURL=useChatPermissions.js.map
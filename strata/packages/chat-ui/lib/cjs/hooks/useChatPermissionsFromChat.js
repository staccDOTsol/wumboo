"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatPermissionsFromChat = void 0;
const useChatPermissions_1 = require("./useChatPermissions");
const useChatPermissionsKey_1 = require("./useChatPermissionsKey");
function useChatPermissionsFromChat(chat) {
    const { key: chatPermissionsKey, loading } = (0, useChatPermissionsKey_1.useChatPermissionsKey)(chat);
    const ret = (0, useChatPermissions_1.useChatPermissions)(chatPermissionsKey);
    return Object.assign(Object.assign({}, ret), { loading: loading || ret.loading });
}
exports.useChatPermissionsFromChat = useChatPermissionsFromChat;
//# sourceMappingURL=useChatPermissionsFromChat.js.map
import { useChatPermissions } from "./useChatPermissions";
import { useChatPermissionsKey } from "./useChatPermissionsKey";
export function useChatPermissionsFromChat(chat) {
    const { key: chatPermissionsKey, loading } = useChatPermissionsKey(chat);
    const ret = useChatPermissions(chatPermissionsKey);
    return {
        ...ret,
        loading: loading || ret.loading
    };
}
//# sourceMappingURL=useChatPermissionsFromChat.js.map
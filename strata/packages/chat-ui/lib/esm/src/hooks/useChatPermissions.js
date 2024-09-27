import { useAccount } from "@strata-foundation/react";
import { useChatSdk } from "../contexts/chatSdk";
export const useChatPermissions = (chatPermissions) => {
    const { chatSdk } = useChatSdk();
    return useAccount(chatPermissions, chatSdk?.chatPermissionsDecoder);
};
//# sourceMappingURL=useChatPermissions.js.map
import { useAccount } from "@strata-foundation/react";
import { useChatSdk } from "../contexts/chatSdk";
export const useChat = (chat) => {
    const { chatSdk } = useChatSdk();
    return useAccount(chat, chatSdk?.chatDecoder);
};
//# sourceMappingURL=useChat.js.map
import { useAccount } from "@strata-foundation/react";
import { useChatSdk } from "../contexts/chatSdk";
export const useSettings = (settings) => {
    const { chatSdk } = useChatSdk();
    return useAccount(settings, chatSdk?.settingsDecoder);
};
//# sourceMappingURL=useSettings.js.map
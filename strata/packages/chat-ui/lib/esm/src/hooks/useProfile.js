import { useAccount } from "@strata-foundation/react";
import { useChatSdk } from "../contexts/chatSdk";
export const useProfile = (profile) => {
    const { chatSdk } = useChatSdk();
    return useAccount(profile, chatSdk?.profileDecoder);
};
//# sourceMappingURL=useProfile.js.map
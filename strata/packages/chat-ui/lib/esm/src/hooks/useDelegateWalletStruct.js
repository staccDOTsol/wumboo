import { useAccount } from "@strata-foundation/react";
import { useChatSdk } from "../contexts/chatSdk";
export const useDelegateWalletStruct = (key) => {
    const { chatSdk } = useChatSdk();
    return useAccount(key, chatSdk?.delegateWalletDecoder);
};
//# sourceMappingURL=useDelegateWalletStruct.js.map
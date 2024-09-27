import { PublicKey } from "@solana/web3.js";
import { ChatSdk } from "@strata-foundation/chat";
import { useAsync } from "react-async-hook";
export function useChatPermissionsKey(chat) {
    const { result, loading } = useAsync(async (chat) => chat ? ChatSdk.chatPermissionsKey(new PublicKey(chat)) : undefined, [chat?.toBase58()]);
    return {
        loading: loading,
        key: result ? result[0] : undefined,
    };
}
//# sourceMappingURL=useChatPermissionsKey.js.map
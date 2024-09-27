import { PublicKey } from "@solana/web3.js";
import { ChatSdk } from "@strata-foundation/chat";
import { useAsync } from "react-async-hook";
export function useDelegateWalletStructKey(delegateWallet) {
    const { result, loading } = useAsync(async (delegateWallet) => delegateWallet
        ? ChatSdk.delegateWalletKey(new PublicKey(delegateWallet))
        : undefined, [delegateWallet?.toBase58()]);
    return {
        loading: loading,
        key: result ? result[0] : undefined,
    };
}
//# sourceMappingURL=useDelegateWalletStructKey.js.map
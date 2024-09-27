import { PublicKey } from "@solana/web3.js";
import { ChatSdk } from "@strata-foundation/chat";
import { useAsync } from "react-async-hook";
export function useChatKey(identifierCertificateMint) {
    const { result, loading } = useAsync(async (identifierCertificateMint) => identifierCertificateMint
        ? ChatSdk.chatKey(new PublicKey(identifierCertificateMint))
        : undefined, [identifierCertificateMint?.toBase58()]);
    return {
        loading: loading,
        key: result ? result[0] : undefined,
    };
}
//# sourceMappingURL=useChatKey.js.map
import { ENTRY_SEED, NAMESPACES_PROGRAM_ID } from "@cardinal/namespaces";
import { utils } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { useAccount } from "@strata-foundation/react";
import { useAsync } from "react-async-hook";
import { useChatSdk } from "../contexts/chatSdk";
import { useChatKey } from "./useChatKey";
export function useChatKeyFromIdentifier(identifier) {
    const { chatSdk } = useChatSdk();
    const { result: namespaces, loading: loading1, error, } = useAsync(async (chatSdk) => chatSdk ? chatSdk.getNamespaces() : undefined, [chatSdk]);
    const { result: entryKey, loading: loading2, error: error2, } = useAsync(async (identifier, chatNamespace) => identifier && chatNamespace
        ? PublicKey.findProgramAddressSync([
            utils.bytes.utf8.encode(ENTRY_SEED),
            new PublicKey(chatNamespace).toBytes(),
            utils.bytes.utf8.encode(identifier),
        ], NAMESPACES_PROGRAM_ID)
        : undefined, [identifier, namespaces?.chatNamespace.toBase58()]);
    const { info: entry, loading: loading3 } = useAccount(entryKey ? entryKey[0] : undefined, chatSdk?.entryDecoder);
    const { key: chatKey, loading: loading4 } = useChatKey(entry?.mint);
    return {
        loading: loading1 || loading2 || loading3 || loading4,
        chatKey,
        error: error || error2
    };
}
//# sourceMappingURL=useChatKeyFromIdentifier.js.map
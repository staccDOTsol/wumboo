import { PublicKey } from "@solana/web3.js";
export declare function useChatPermissionsFromChat(chat: PublicKey | undefined): {
    loading: boolean;
    account?: import("@solana/web3.js").AccountInfo<Buffer>;
    info?: import("@strata-foundation/chat").IChatPermissions;
};
//# sourceMappingURL=useChatPermissionsFromChat.d.ts.map
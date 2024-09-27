import { PublicKey } from "@solana/web3.js";
export declare function useWalletProfile(wallet: PublicKey | undefined): {
    loading: boolean;
    account?: import("@solana/web3.js").AccountInfo<Buffer>;
    info?: import("@strata-foundation/chat").IProfile;
};
//# sourceMappingURL=useWalletProfile.d.ts.map
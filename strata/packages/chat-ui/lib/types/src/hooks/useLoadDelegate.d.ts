import { Keypair } from "@solana/web3.js";
export declare function useLoadDelegate(): {
    delegateWallet: Keypair;
    mnemonic: string;
    loadingNeeds: boolean;
    needsInit: boolean;
    needsTopOff: boolean;
    loadDelegate: (sol: number) => Promise<void>;
    loading: boolean;
    error: Error;
};
//# sourceMappingURL=useLoadDelegate.d.ts.map
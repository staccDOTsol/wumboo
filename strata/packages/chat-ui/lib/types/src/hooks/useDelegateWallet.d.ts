import { Keypair, PublicKey } from "@solana/web3.js";
interface IDelegateWalletStorage {
    getDelegateWalletMnemonic(wallet: PublicKey): string | undefined;
    getDelegateWallet(wallet: PublicKey): Keypair | undefined;
    setDelegateWallet(wallet: PublicKey, mnemonic: string): void;
}
export declare function getKeypairFromMnemonic(mnemonic: string): Keypair;
export declare class LocalDelegateWalletStorage implements IDelegateWalletStorage {
    storageKey(wallet: PublicKey): string;
    getDelegateWallet(wallet: PublicKey): Keypair | undefined;
    getDelegateWalletMnemonic(wallet: PublicKey): string | undefined;
    setDelegateWallet(wallet: PublicKey, mnemonic: string): void;
}
export declare const delegateWalletStorage: LocalDelegateWalletStorage;
interface DelegateWalletReturn {
    loading: boolean;
    error?: Error;
    legacyKeypair?: Keypair;
    keypair: Keypair | undefined;
    legacyMnemonic?: string;
    mnemonic?: string;
}
export declare function useDelegateWallet(): DelegateWalletReturn;
export {};
//# sourceMappingURL=useDelegateWallet.d.ts.map
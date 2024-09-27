import { PublicKey } from "@solana/web3.js";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Wallet } from "@coral-xyz/anchor";
export declare type Keypair = {
    publicKey: PublicKey;
    secretKey: Uint8Array;
};
interface GenericFile {
    readonly buffer: Uint8Array;
    readonly fileName: string;
    readonly displayName: string;
    readonly uniqueName: string;
    readonly contentType: string | null;
    readonly extension: string | null;
    readonly tags: any[];
}
export declare function uploadFiles(provider: AnchorProvider | undefined, files: GenericFile[], delegateWallet: Wallet, tries?: number): Promise<string[] | undefined>;
export declare function randomizeFileName(file: File): void;
export {};
//# sourceMappingURL=shdw.d.ts.map
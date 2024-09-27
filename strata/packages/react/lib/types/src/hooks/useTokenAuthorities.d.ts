import { PublicKey } from "@solana/web3.js";
import { IUseMetaplexTokenMetadataResult } from "./useMetaplexMetadata";
export interface IUseTokenAuthoritiesResult extends IUseMetaplexTokenMetadataResult {
    hasMintAuth: boolean;
    hasUpdateAuth: boolean;
    hasFreezeAuth: boolean;
    hasAnyAuth: boolean;
}
/**
 * Get all metaplex metadata around a token and information about whether the public key holds any authorities
 *
 * @param token
 * @returns
 */
export declare function useTokenAuthorities(mint: PublicKey | undefined | null, wallet: PublicKey | undefined): IUseTokenAuthoritiesResult;
//# sourceMappingURL=useTokenAuthorities.d.ts.map
import { useMetaplexTokenMetadata } from "./useMetaplexMetadata";
/**
 * Get all metaplex metadata around a token and information about whether the public key holds any authorities
 *
 * @param token
 * @returns
 */
export function useTokenAuthorities(mint, wallet) {
    const allMetadata = useMetaplexTokenMetadata(mint);
    const hasUpdateAuth = !!(wallet && allMetadata.metadata?.updateAuthority == wallet?.toString());
    const hasMintAuth = !!(wallet && allMetadata.mint?.mintAuthority && allMetadata.mint?.mintAuthority.equals(wallet));
    const hasFreezeAuth = !!(wallet && allMetadata.mint?.freezeAuthority && allMetadata.mint?.freezeAuthority.equals(wallet));
    return {
        ...allMetadata,
        hasUpdateAuth,
        hasMintAuth,
        hasFreezeAuth,
        hasAnyAuth: hasUpdateAuth || hasMintAuth || hasFreezeAuth,
    };
}
//# sourceMappingURL=useTokenAuthorities.js.map
import { NATIVE_MINT, u64 } from "@solana/spl-token";
import { useWallet } from "@solana/wallet-adapter-react";
import { SplTokenBonding, } from "@strata-foundation/spl-token-bonding";
import React, { useEffect, useState } from "react";
import { useAsync } from "react-async-hook";
import { useStrataSdks } from "./useStrataSdks";
import { useAccount } from "./useAccount";
import { useAssociatedAccount } from "./useAssociatedAccount";
import { useMint } from "./useMint";
import { useTwWrappedSolMint } from "./useTwWrappedSolMint";
import { useTokenBonding } from "./useTokenBonding";
import { useTokenAccount } from "./useTokenAccount";
export function supplyAsNum(mint) {
    return amountAsNum(mint.supply, mint);
}
export function amountAsNum(amount, mint) {
    const decimals = new u64(Math.pow(10, mint.decimals).toString());
    const decimal = amount.mod(decimals).toNumber() / decimals.toNumber();
    return amount.div(decimals).toNumber() + decimal;
}
export function useSolOwnedAmount(ownerPublicKey) {
    const { info: lamports, loading } = useAccount(ownerPublicKey, (_, account) => account.lamports);
    const result = React.useMemo(() => (lamports || 0) / Math.pow(10, 9), [lamports]);
    return {
        amount: result,
        loading,
    };
}
export function useUserOwnedAmount(wallet, token) {
    const { amount: solOwnedAmount } = useSolOwnedAmount(wallet || undefined);
    const { associatedAccount, loading: loadingAssoc } = useAssociatedAccount(wallet, token);
    const wrappedSolMint = useTwWrappedSolMint();
    const mint = useMint(token);
    const [amount, setAmount] = useState();
    useEffect(() => {
        if (token?.equals(NATIVE_MINT) ||
            (wrappedSolMint && token?.equals(wrappedSolMint))) {
            setAmount(solOwnedAmount);
        }
        else if (mint && associatedAccount) {
            setAmount(amountAsNum(associatedAccount.amount, mint));
        }
        else if (mint && !associatedAccount && !loadingAssoc) {
            setAmount(0);
        }
    }, [loadingAssoc, associatedAccount, mint, solOwnedAmount, wrappedSolMint]);
    return typeof amount === "undefined" ? amount : Number(amount);
}
export function useOwnedAmount(token) {
    const { publicKey } = useWallet();
    return useUserOwnedAmount(publicKey || undefined, token);
}
/**
 * Get an {@link IPricingCurve} Object that can estimate pricing on this bonding curve,
 * in real time.
 *
 * @param tokenBonding
 * @returns
 */
export function useBondingPricing(tokenBonding) {
    const { tokenBondingSdk } = useStrataSdks();
    const { info: tokenBondingAcct } = useTokenBonding(tokenBonding);
    const { info: reserves } = useTokenAccount(tokenBondingAcct?.baseStorage);
    const targetMint = useMint(tokenBondingAcct?.targetMint);
    const getPricing = async (tokenBondingSdk, key, tokenBondingAcct, // Make the pricing be re-fetched whenever the bonding changes.
    reserves, // Make the pricing be re-fetched whenever the reserves change.
    mint // Make the pricing be re-fetched whenever the supply change. This doesn't account for
    // collective changes, but will due for now. TODO: Account for collective changes too
    ) => {
        return tokenBondingSdk && key && tokenBondingSdk.getPricing(key);
    };
    const { result: pricing, loading, error, } = useAsync(getPricing, [
        tokenBondingSdk,
        tokenBonding,
        tokenBondingAcct,
        reserves,
        targetMint,
    ]);
    return {
        pricing: pricing || undefined,
        tokenBonding: tokenBondingAcct,
        loading,
        error,
    };
}
const tokenBondingKey = async (mint, index) => mint && (await SplTokenBonding.tokenBondingKey(mint, index))[0];
/**
 * Same as {@link useBondingPricing}, just from a mint instead of the token bonding key
 *
 * @param mint
 * @param index
 * @returns
 */
export function useBondingPricingFromMint(mint, index) {
    const { result: key, loading } = useAsync(tokenBondingKey, [
        mint,
        index || 0,
    ]);
    const bondingPricing = useBondingPricing(key);
    return {
        ...bondingPricing,
        loading: bondingPricing.loading || loading,
    };
}
//# sourceMappingURL=bondingPricing.js.map
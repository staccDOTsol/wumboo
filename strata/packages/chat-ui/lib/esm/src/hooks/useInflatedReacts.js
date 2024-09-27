import { useWallet } from "@solana/wallet-adapter-react";
import { useAsync } from "react-async-hook";
function dedupeByProfile(reacts) {
    const seen = new Set();
    return reacts.filter((value) => {
        const k = value.message.sender.toBase58();
        if (!seen.has(k)) {
            seen.add(k);
            return value;
        }
    });
}
async function getReacts(myWallet, messages) {
    if (!messages) {
        return undefined;
    }
    const reacts = await Promise.all(messages.map(async (message) => {
        const decoded = await message.getDecodedMessage();
        return {
            decoded,
            message,
        };
    }));
    const grouped = reacts.reduce((acc, react) => {
        if (react.decoded?.emoji) {
            const reacts = acc[react.decoded.emoji] || [];
            acc[react.decoded.emoji] = [...reacts, react];
        }
        return acc;
    }, {});
    const dedupedAndCoerced = Object.entries(grouped).map(([emoji, reacts]) => {
        const deduped = dedupeByProfile(reacts);
        const count = reacts.length;
        const mine = myWallet && reacts.some(({ message }) => message.sender.equals(myWallet));
        return {
            emoji,
            count,
            messages: deduped.map(({ message }) => message),
            mine: Boolean(mine),
        };
    });
    return dedupedAndCoerced;
}
/**
 * Get all reactions to a message, removing duplicates.
 */
export function useInflatedReacts(reacts) {
    const { publicKey } = useWallet();
    const { result, error, loading: loadingResult } = useAsync(getReacts, [publicKey || undefined, reacts]);
    return {
        reacts: result,
        error,
        loading: loadingResult
    };
}
//# sourceMappingURL=useInflatedReacts.js.map
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useInflatedReacts = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_async_hook_1 = require("react-async-hook");
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
function getReacts(myWallet, messages) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!messages) {
            return undefined;
        }
        const reacts = yield Promise.all(messages.map((message) => __awaiter(this, void 0, void 0, function* () {
            const decoded = yield message.getDecodedMessage();
            return {
                decoded,
                message,
            };
        })));
        const grouped = reacts.reduce((acc, react) => {
            var _a;
            if ((_a = react.decoded) === null || _a === void 0 ? void 0 : _a.emoji) {
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
    });
}
/**
 * Get all reactions to a message, removing duplicates.
 */
function useInflatedReacts(reacts) {
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { result, error, loading: loadingResult } = (0, react_async_hook_1.useAsync)(getReacts, [publicKey || undefined, reacts]);
    return {
        reacts: result,
        error,
        loading: loadingResult
    };
}
exports.useInflatedReacts = useInflatedReacts;
//# sourceMappingURL=useInflatedReacts.js.map
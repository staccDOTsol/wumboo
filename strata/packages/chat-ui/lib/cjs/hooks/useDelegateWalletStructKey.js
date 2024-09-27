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
exports.useDelegateWalletStructKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_async_hook_1 = require("react-async-hook");
function useDelegateWalletStructKey(delegateWallet) {
    const { result, loading } = (0, react_async_hook_1.useAsync)((delegateWallet) => __awaiter(this, void 0, void 0, function* () {
        return delegateWallet
            ? chat_1.ChatSdk.delegateWalletKey(new web3_js_1.PublicKey(delegateWallet))
            : undefined;
    }), [delegateWallet === null || delegateWallet === void 0 ? void 0 : delegateWallet.toBase58()]);
    return {
        loading: loading,
        key: result ? result[0] : undefined,
    };
}
exports.useDelegateWalletStructKey = useDelegateWalletStructKey;
//# sourceMappingURL=useDelegateWalletStructKey.js.map
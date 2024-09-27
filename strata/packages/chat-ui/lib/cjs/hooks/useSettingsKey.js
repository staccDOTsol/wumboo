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
exports.useSettingsKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_async_hook_1 = require("react-async-hook");
function useSettingsKey(wallet) {
    const { result, loading } = (0, react_async_hook_1.useAsync)((wallet) => __awaiter(this, void 0, void 0, function* () { return wallet ? chat_1.ChatSdk.settingsKey(new web3_js_1.PublicKey(wallet)) : undefined; }), [wallet === null || wallet === void 0 ? void 0 : wallet.toBase58()]);
    return {
        loading: loading,
        key: result ? result[0] : undefined,
    };
}
exports.useSettingsKey = useSettingsKey;
//# sourceMappingURL=useSettingsKey.js.map
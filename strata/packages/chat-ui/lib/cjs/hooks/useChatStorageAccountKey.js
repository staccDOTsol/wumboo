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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatStorageAccountKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
const react_async_hook_1 = require("react-async-hook");
const useDelegateWallet_1 = require("./useDelegateWallet");
const PROGRAM_ID = new web3_js_1.PublicKey("2e1wdyNhUvE76y6yUCvah2KaviavMJYKoRun8acMRBZZ");
function getStorageAccount(key, accountSeed) {
    return web3_js_1.PublicKey.findProgramAddress([
        Buffer.from("storage-account"),
        key.toBytes(),
        accountSeed.toTwos(2).toArrayLike(Buffer, "le", 4),
    ], PROGRAM_ID);
}
function useChatStorageAccountKey() {
    const { keypair: delegateWallet } = (0, useDelegateWallet_1.useDelegateWallet)();
    return (0, react_async_hook_1.useAsync)((wallet) => __awaiter(this, void 0, void 0, function* () {
        return wallet
            ? (yield getStorageAccount(new web3_js_1.PublicKey(wallet), new bn_js_1.default(0)))[0]
            : undefined;
    }), [delegateWallet === null || delegateWallet === void 0 ? void 0 : delegateWallet.publicKey.toBase58()]);
}
exports.useChatStorageAccountKey = useChatStorageAccountKey;
//# sourceMappingURL=useChatStorageAccountKey.js.map
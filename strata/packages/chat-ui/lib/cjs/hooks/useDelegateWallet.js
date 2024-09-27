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
exports.useDelegateWallet = exports.delegateWalletStorage = exports.LocalDelegateWalletStorage = exports.getKeypairFromMnemonic = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const web3_js_1 = require("@solana/web3.js");
const react_1 = require("@strata-foundation/react");
const bip39_1 = require("bip39");
const react_2 = require("react");
const react_async_hook_1 = require("react-async-hook");
const useWalletSettings_1 = require("./useWalletSettings");
const storage = typeof localStorage !== "undefined"
    ? localStorage
    : require("localstorage-memory");
const mnemonicCache = {};
function getKeypairFromMnemonic(mnemonic) {
    if (!mnemonicCache[mnemonic]) {
        const seed = (0, bip39_1.mnemonicToSeedSync)(mnemonic, ""); // (mnemonic, password)
        const ret = web3_js_1.Keypair.fromSeed(seed.slice(0, 32));
        mnemonicCache[mnemonic] = ret;
    }
    return mnemonicCache[mnemonic];
}
exports.getKeypairFromMnemonic = getKeypairFromMnemonic;
class LocalDelegateWalletStorage {
    storageKey(wallet) {
        return "delegate-wallet-" + (wallet === null || wallet === void 0 ? void 0 : wallet.toBase58());
    }
    getDelegateWallet(wallet) {
        const mnemonic = this.getDelegateWalletMnemonic(wallet);
        if (mnemonic) {
            return getKeypairFromMnemonic(mnemonic);
        }
    }
    getDelegateWalletMnemonic(wallet) {
        const item = storage.getItem(this.storageKey(wallet));
        if (item) {
            return item;
        }
    }
    setDelegateWallet(wallet, mnemonic) {
        storage.setItem(this.storageKey(wallet), mnemonic);
    }
}
exports.LocalDelegateWalletStorage = LocalDelegateWalletStorage;
exports.delegateWalletStorage = new LocalDelegateWalletStorage();
function useDelegateWallet() {
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const [legacyDelegateData] = (0, react_1.useLocalStorage)(publicKey ? exports.delegateWalletStorage.storageKey(publicKey) : "", undefined);
    const delegateWalletLegacy = (0, react_2.useMemo)(() => {
        if (legacyDelegateData && publicKey) {
            try {
                if (legacyDelegateData) {
                    return exports.delegateWalletStorage.getDelegateWallet(publicKey);
                }
            }
            catch (e) {
                // ignore
                console.error(e);
            }
        }
    }, [legacyDelegateData, publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58()]);
    const { info: settings, account, loading } = (0, useWalletSettings_1.useWalletSettings)();
    const { loading: loadingMnemonic, result: mnemonic, error, } = (0, react_async_hook_1.useAsync)((settings) => __awaiter(this, void 0, void 0, function* () {
        if (settings) {
            return settings === null || settings === void 0 ? void 0 : settings.getDelegateWalletSeed();
        }
        return undefined;
    }), [settings]);
    const keypair = (0, react_2.useMemo)(() => (mnemonic ? getKeypairFromMnemonic(mnemonic) : undefined), [mnemonic]);
    return {
        error,
        loading: loadingMnemonic || loading || Boolean(!settings && account),
        legacyKeypair: delegateWalletLegacy,
        mnemonic: mnemonic,
        keypair,
        legacyMnemonic: legacyDelegateData,
    };
}
exports.useDelegateWallet = useDelegateWallet;
//# sourceMappingURL=useDelegateWallet.js.map
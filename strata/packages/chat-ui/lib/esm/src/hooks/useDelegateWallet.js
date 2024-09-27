import { useWallet } from "@solana/wallet-adapter-react";
import { Keypair } from "@solana/web3.js";
import { useLocalStorage } from "@strata-foundation/react";
import { mnemonicToSeedSync } from "bip39";
import { useMemo } from "react";
import { useAsync } from "react-async-hook";
import { useWalletSettings } from "./useWalletSettings";
const storage = typeof localStorage !== "undefined"
    ? localStorage
    : require("localstorage-memory");
const mnemonicCache = {};
export function getKeypairFromMnemonic(mnemonic) {
    if (!mnemonicCache[mnemonic]) {
        const seed = mnemonicToSeedSync(mnemonic, ""); // (mnemonic, password)
        const ret = Keypair.fromSeed(seed.slice(0, 32));
        mnemonicCache[mnemonic] = ret;
    }
    return mnemonicCache[mnemonic];
}
export class LocalDelegateWalletStorage {
    storageKey(wallet) {
        return "delegate-wallet-" + wallet?.toBase58();
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
export const delegateWalletStorage = new LocalDelegateWalletStorage();
export function useDelegateWallet() {
    const { publicKey } = useWallet();
    const [legacyDelegateData] = useLocalStorage(publicKey ? delegateWalletStorage.storageKey(publicKey) : "", undefined);
    const delegateWalletLegacy = useMemo(() => {
        if (legacyDelegateData && publicKey) {
            try {
                if (legacyDelegateData) {
                    return delegateWalletStorage.getDelegateWallet(publicKey);
                }
            }
            catch (e) {
                // ignore
                console.error(e);
            }
        }
    }, [legacyDelegateData, publicKey?.toBase58()]);
    const { info: settings, account, loading } = useWalletSettings();
    const { loading: loadingMnemonic, result: mnemonic, error, } = useAsync(async (settings) => {
        if (settings) {
            return settings?.getDelegateWalletSeed();
        }
        return undefined;
    }, [settings]);
    const keypair = useMemo(() => (mnemonic ? getKeypairFromMnemonic(mnemonic) : undefined), [mnemonic]);
    return {
        error,
        loading: loadingMnemonic || loading || Boolean(!settings && account),
        legacyKeypair: delegateWalletLegacy,
        mnemonic: mnemonic,
        keypair,
        legacyMnemonic: legacyDelegateData,
    };
}
//# sourceMappingURL=useDelegateWallet.js.map
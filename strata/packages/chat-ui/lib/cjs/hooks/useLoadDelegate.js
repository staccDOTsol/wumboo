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
exports.useLoadDelegate = void 0;
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_1 = require("@strata-foundation/react");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const react_async_hook_1 = require("react-async-hook");
const chatSdk_1 = require("../contexts/chatSdk");
const useDelegateWallet_1 = require("./useDelegateWallet");
const useDelegateWalletStruct_1 = require("./useDelegateWalletStruct");
const useDelegateWalletStructKey_1 = require("./useDelegateWalletStructKey");
const bip39_1 = require("bip39");
function runLoadDelegate(delegateWalletKeypair, chatSdk, sol) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (chatSdk) {
            const structKey = delegateWalletKeypair &&
                (yield chat_1.ChatSdk.delegateWalletKey(delegateWalletKeypair.publicKey))[0];
            const structExists = structKey &&
                (yield chatSdk.provider.connection.getAccountInfo(structKey));
            const instructions = [];
            const signers = [];
            if (!structExists) {
                if (!delegateWalletKeypair) {
                    const mnemonic = (0, bip39_1.generateMnemonic)();
                    delegateWalletKeypair = (0, useDelegateWallet_1.getKeypairFromMnemonic)(mnemonic);
                    const { instructions: settingsInstructions, signers: settingsSigners } = yield chatSdk.initializeSettingsInstructions({
                        settings: {
                            delegateWalletSeed: mnemonic,
                        },
                    });
                    instructions.push(...settingsInstructions);
                    signers.push(...settingsSigners);
                }
                const { instructions: delInstructions, signers: delSigners } = yield chatSdk.initializeDelegateWalletInstructions({
                    delegateWalletKeypair,
                });
                instructions.push(...delInstructions);
                signers.push(...delSigners);
            }
            const balance = (_a = (yield chatSdk.provider.connection.getAccountInfo(delegateWalletKeypair.publicKey))) === null || _a === void 0 ? void 0 : _a.lamports;
            const solLamports = sol * Math.pow(10, 9);
            if (balance || 0 < solLamports) {
                instructions.push(web3_js_1.SystemProgram.transfer({
                    fromPubkey: chatSdk.wallet.publicKey,
                    toPubkey: delegateWalletKeypair.publicKey,
                    lamports: solLamports,
                }));
            }
            yield (0, spl_utils_1.sendInstructions)(chatSdk.errors || new Map(), chatSdk.provider, instructions, signers);
        }
    });
}
function useLoadDelegate() {
    const { keypair: delegateWallet, mnemonic, loading: loadingDelegate, error: delError, } = (0, useDelegateWallet_1.useDelegateWallet)();
    const { key: structKey, loading: loadingKey } = (0, useDelegateWalletStructKey_1.useDelegateWalletStructKey)(delegateWallet === null || delegateWallet === void 0 ? void 0 : delegateWallet.publicKey);
    const { account, loading: loadingStruct } = (0, useDelegateWalletStruct_1.useDelegateWalletStruct)(structKey);
    const { amount: balance, loading: loadingBalance } = (0, react_1.useSolOwnedAmount)(delegateWallet === null || delegateWallet === void 0 ? void 0 : delegateWallet.publicKey);
    const { execute: loadDelegate, error, loading, } = (0, react_async_hook_1.useAsyncCallback)(runLoadDelegate);
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return {
        delegateWallet,
        mnemonic,
        loadingNeeds: loadingDelegate || loadingStruct || loadingBalance || loadingKey,
        needsInit: !loadingDelegate && !loadingStruct && !loadingKey && !account,
        needsTopOff: !loadingDelegate &&
            delegateWallet &&
            !loadingBalance &&
            balance < 0.001,
        loadDelegate: (sol) => {
            return loadDelegate(delegateWallet, chatSdk, sol);
        },
        loading,
        error: error || delError,
    };
}
exports.useLoadDelegate = useLoadDelegate;
//# sourceMappingURL=useLoadDelegate.js.map
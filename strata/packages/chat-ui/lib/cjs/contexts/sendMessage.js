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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSendMessage = exports.SendMessageProvider = exports.SendMessageContext = exports.useStrataSendMessage = void 0;
const web3_js_1 = require("@solana/web3.js");
const react_1 = __importDefault(require("react"));
const react_2 = require("@strata-foundation/react");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const react_3 = require("react");
const react_async_hook_1 = require("react-async-hook");
const chatSdk_1 = require("../contexts/chatSdk");
const useChat_1 = require("../hooks/useChat");
const useDelegateWallet_1 = require("../hooks/useDelegateWallet");
const useChatPermissionsFromChat_1 = require("../hooks/useChatPermissionsFromChat");
function sendMessage({ chatKey, chatSdk, accelerator, delegateWalletKeypair, cluster, onAddPendingMessage, message, nftMint, readPermissionAmount, readPermissionKey, readPermissionType, }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (chatSdk && chatKey) {
            const payer = (delegateWalletKeypair === null || delegateWalletKeypair === void 0 ? void 0 : delegateWalletKeypair.publicKey) || chatSdk.wallet.publicKey;
            const { instructions: instructionGroups, signers: signerGroups, output: { messageId }, } = yield chatSdk.sendMessageInstructions({
                readPermissionAmount,
                readPermissionKey,
                readPermissionType,
                nftMint,
                delegateWalletKeypair,
                payer,
                chat: chatKey,
                message,
                encrypted: cluster !== "localnet",
            });
            const txsAndIds = yield Promise.all(instructionGroups.map((instructions, index) => __awaiter(this, void 0, void 0, function* () {
                const tx = new web3_js_1.Transaction();
                tx.recentBlockhash = (yield chatSdk.provider.connection.getLatestBlockhash()).blockhash;
                tx.feePayer = payer;
                tx.add(...instructions);
                if (signerGroups[index].length > 0)
                    tx.sign(...signerGroups[index]);
                if (!delegateWalletKeypair) {
                    yield chatSdk.provider.wallet.signTransaction(tx);
                }
                const rawTx = tx.serialize();
                accelerator === null || accelerator === void 0 ? void 0 : accelerator.sendTransaction(cluster, tx);
                const txid = yield chatSdk.provider.connection.sendRawTransaction(rawTx, {
                    skipPreflight: true,
                });
                return {
                    txid,
                    rawTx,
                };
            })));
            const blockTime = Number((yield chatSdk.provider.connection.getAccountInfo(web3_js_1.SYSVAR_CLOCK_PUBKEY, "processed"
            //@ts-ignore
            )).data.readBigInt64LE(8 * 4));
            if (onAddPendingMessage) {
                const { fileAttachments } = message, rest = __rest(message, ["fileAttachments"]);
                const content = Object.assign(Object.assign({}, rest), { decryptedAttachments: fileAttachments });
                onAddPendingMessage({
                    complete: true,
                    type: content.type,
                    sender: chatSdk.wallet.publicKey,
                    id: messageId,
                    content: JSON.stringify(content),
                    txids: txsAndIds.map(({ txid }) => txid),
                    chatKey,
                    getDecodedMessage: () => Promise.resolve(content),
                    encryptedSymmetricKey: "",
                    readPermissionKey,
                    readPermissionAmount,
                    readPermissionType,
                    startBlockTime: blockTime,
                    endBlockTime: blockTime,
                    parts: [],
                    pending: true,
                    referenceMessageId: content.referenceMessageId || null,
                });
            }
            yield Promise.all(txsAndIds.map(({ rawTx }) => (0, spl_utils_1.sendAndConfirmWithRetry)(chatSdk.provider.connection, rawTx, {
                skipPreflight: true,
            }, "confirmed")));
        }
    });
}
function useStrataSendMessage({ chatKey, }) {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { accelerator } = (0, react_2.useAccelerator)();
    const { keypair: delegateWalletKeypair } = (0, useDelegateWallet_1.useDelegateWallet)();
    const { info: chat } = (0, useChat_1.useChat)(chatKey);
    const { cluster } = (0, react_2.useEndpoint)();
    const { info: chatPermissions } = (0, useChatPermissionsFromChat_1.useChatPermissionsFromChat)(chatKey);
    const { matches } = (0, react_2.useCollectionOwnedAmount)(chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.postPermissionKey);
    const { error, loading, execute } = (0, react_async_hook_1.useAsyncCallback)(sendMessage);
    return {
        error,
        sendMessage: ({ message, onAddPendingMessage, readPermissionKey = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionKey, readPermissionAmount = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.defaultReadPermissionAmount, readPermissionType = chatPermissions === null || chatPermissions === void 0 ? void 0 : chatPermissions.readPermissionType, }) => {
            return execute({
                chatKey,
                chatSdk,
                accelerator,
                delegateWalletKeypair,
                cluster,
                message,
                onAddPendingMessage,
                nftMint: matches && matches[0],
                readPermissionType: readPermissionType,
                readPermissionKey: readPermissionKey,
                readPermissionAmount: readPermissionAmount,
            });
        },
        loading,
    };
}
exports.useStrataSendMessage = useStrataSendMessage;
exports.SendMessageContext = (0, react_3.createContext)({});
const SendMessageProvider = (_a) => {
    var { 
    //@ts-ignore
    children } = _a, rest = __rest(_a, ["children"]);
    const ret = useStrataSendMessage(rest);
    return (react_1.default.createElement(exports.SendMessageContext.Provider, { value: ret }, children));
};
exports.SendMessageProvider = SendMessageProvider;
const useSendMessage = () => {
    const context = (0, react_3.useContext)(exports.SendMessageContext);
    if (context === undefined) {
        throw new Error("useSendMessage must be used within a ReplyProvider");
    }
    return context;
};
exports.useSendMessage = useSendMessage;
//# sourceMappingURL=sendMessage.js.map
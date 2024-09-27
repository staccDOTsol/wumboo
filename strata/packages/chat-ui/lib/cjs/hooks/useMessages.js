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
exports.useMessages = exports.MESSAGE_LAMBDA = void 0;
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_1 = require("@strata-foundation/react");
const bn_js_1 = __importDefault(require("bn.js"));
const react_2 = require("react");
const react_async_hook_1 = require("react-async-hook");
const chatSdk_1 = require("../contexts/chatSdk");
const useChat_1 = require("./useChat");
const txToMessages = {};
function getMessagesFromTxs(chat, chatSdk, txs = []) {
    return __awaiter(this, void 0, void 0, function* () {
        if (chat && chatSdk) {
            const failedTx = new Set(Array.from(txs.filter((tx) => { var _a; return (_a = tx.meta) === null || _a === void 0 ? void 0 : _a.err; }).map((tx) => tx.signature)));
            const newParts = (yield Promise.all(txs.map(({ logs, signature: sig, transaction, pending, meta, blockTime, }) => __awaiter(this, void 0, void 0, function* () {
                if (!txToMessages[sig] ||
                    txToMessages[sig].length == 0 ||
                    // @ts-ignore
                    (txToMessages[sig][0].pending && !pending)) {
                    try {
                        const found = (yield chatSdk.getMessagePartsFromInflatedTx({
                            logs,
                            transaction,
                            txid: sig,
                            meta,
                            blockTime,
                            chat,
                        })).map((f) => (Object.assign(Object.assign({}, f), { pending })));
                        txToMessages[sig] = found;
                    }
                    catch (e) {
                        console.warn("Failed to decode message", e);
                    }
                }
                return txToMessages[sig];
            }))))
                .flat()
                .filter(react_1.truthy);
            return [...(yield chatSdk.getMessagesFromParts(newParts))]
                .filter((msg) => msg.txids.every((txid) => !failedTx.has(txid)))
                .map((message) => {
                // @ts-ignore
                message.pending = message.parts.some((p) => p.pending);
                return message;
            });
        }
        return [];
    });
}
// Only change the identity of message.reacts if the number of reacts has increased on a message
// chat -> message id -> number of reacts
let cachedReacts = {};
function setDifference(a, b) {
    return new Set(Array.from(a).filter((item) => !b.has(item)));
}
const mergeMessages = (chatSdk, message1, message2) => {
    const pending = message1.pending && message2.pending;
    if (message2.complete) {
        if (message2.pending != pending) {
            return Object.assign(Object.assign({}, message2), { pending });
        }
        return message2;
    }
    if (message1.complete) {
        message1.pending = pending;
        if (message1.pending != pending) {
            return Object.assign(Object.assign({}, message1), { pending });
        }
        return message1;
    }
    // If new parts not found
    if (setDifference(new Set(message1.txids), new Set(message2.txids)).size == 0) {
        if (message1.pending) {
            return message2;
        }
        return message2;
    }
    const set = new Set();
    const allParts = message1.parts.concat(...message2.parts);
    const nonPendingParts = new Set(
    // @ts-ignore
    allParts.filter((p) => !p.pending).map((p) => p.txid));
    return chatSdk.getMessageFromParts(allParts.filter((part) => {
        // Prefer non pending complete ones over pending incompletes
        // @ts-ignore
        if (part.pending && nonPendingParts.has(part.txid)) {
            return false;
        }
        if (set.has(part.txid)) {
            return false;
        }
        set.add(part.txid);
        return true;
    }));
};
const reduceMessages = (chatSdk, messageState, messages) => {
    return messages.reduce((acc, message) => {
        const existing = acc[message.id];
        if (existing) {
            acc[message.id] = mergeMessages(chatSdk, message, existing);
        }
        else {
            acc[message.id] = message;
        }
        return acc;
    }, Object.assign({}, messageState));
};
exports.MESSAGE_LAMBDA = "https://prod-api.teamwumbo.com/messages";
const lambdaFetcher = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield fetch(`${exports.MESSAGE_LAMBDA}`, {
        body: JSON.stringify(args),
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
        },
    });
    const rows = yield res.json();
    return rows.map((d) => (Object.assign(Object.assign({}, d), { blockTime: Number(d.blocktime), readPermissionAmount: new bn_js_1.default(d.readPermissionAmount), readPermissionKey: new web3_js_1.PublicKey(d.readPermissionKey), sender: new web3_js_1.PublicKey(d.sender), signer: new web3_js_1.PublicKey(d.signer), chat: new web3_js_1.PublicKey(d.chat), chatKey: new web3_js_1.PublicKey(d.chat), pending: false, totalParts: Number(d.totalParts), currentPart: Number(d.currentPart) })));
});
function useMessages({ chat, accelerated, numTransactions = 50, fetcher, }) {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    if (typeof accelerated === "undefined") {
        accelerated = true;
    }
    const { info: chatAcc } = (0, useChat_1.useChat)(chat);
    const { cluster } = (0, react_1.useEndpoint)();
    let useFetcher = !!fetcher;
    const canUseFetcher = cluster === "mainnet-beta" &&
        ((chatAcc === null || chatAcc === void 0 ? void 0 : chatAcc.postMessageProgramId.equals(chat_1.ChatSdk.ID)) || fetcher);
    if (canUseFetcher && typeof fetcher === "undefined") {
        useFetcher = true;
        fetcher = lambdaFetcher;
    }
    const [rawMessages, setRawMessages] = (0, react_2.useState)({});
    const _a = (0, react_1.useTransactions)({
        address: chat,
        numTransactions,
        subscribe: true,
        lazy: true,
        accelerated,
    }), { transactions, loadingInitial } = _a, rest = __rest(_a, ["transactions", "loadingInitial"]);
    const stablePubkey = (0, react_1.usePublicKey)(chat === null || chat === void 0 ? void 0 : chat.toBase58());
    // Clear messages when chat changes
    (0, react_2.useEffect)(() => {
        if (stablePubkey) {
            setRawMessages((messages) => {
                return Object.fromEntries(Object.entries(messages).filter((entry) => {
                    return entry[1].chatKey && entry[1].chatKey.equals(stablePubkey);
                }));
            });
        }
    }, [stablePubkey]);
    const variables = (0, react_2.useMemo)(() => {
        if (chat) {
            const currentTime = Date.now() / 1000;
            return {
                chat: chat.toBase58(),
                minBlockTime: 0,
                maxBlockTime: currentTime,
                offset: 0,
                limit: numTransactions,
            };
        }
    }, [chat, numTransactions]);
    const fetchFn = (0, react_2.useCallback)((args) => __awaiter(this, void 0, void 0, function* () { return (fetcher ? fetcher(args) : Promise.resolve([])); }), [fetcher]);
    const { loading: fetchLoading, result: fetchedMessageParts, error: fetchError, execute: runFetch, } = (0, react_async_hook_1.useAsyncCallback)(fetchFn);
    (0, react_2.useEffect)(() => {
        if (chatSdk && fetchedMessageParts) {
            setRawMessages((rawMessages) => {
                const messages = chatSdk.getMessagesFromParts(fetchedMessageParts);
                return reduceMessages(chatSdk, rawMessages, messages);
            });
        }
    }, [fetchedMessageParts, chatSdk]);
    const { result: txMessages, loading, error, } = (0, react_async_hook_1.useAsync)(getMessagesFromTxs, [stablePubkey, chatSdk, transactions]);
    (0, react_2.useEffect)(() => {
        if (chatSdk && txMessages) {
            setRawMessages((rawMessages) => {
                return reduceMessages(chatSdk, rawMessages, txMessages);
            });
        }
    }, [txMessages, chatSdk]);
    (0, react_2.useEffect)(() => {
        if (variables && useFetcher) {
            runFetch(variables);
        }
        else if (stablePubkey && !useFetcher && chatAcc) {
            rest.fetchMore(numTransactions);
        }
    }, [
        chatAcc,
        numTransactions,
        useFetcher,
        runFetch,
        variables,
        rest.fetchMore,
        stablePubkey,
    ]);
    const messages = (0, react_2.useMemo)(() => Object.values(rawMessages).sort((a, b) => b.startBlockTime - a.startBlockTime), [rawMessages]);
    // Group by and pull off reaction and reply messages
    const messagesWithReactsAndReplies = (0, react_2.useMemo)(() => {
        if (!messages) {
            return undefined;
        }
        const reacts = messages.reduce((acc, msg) => {
            if (msg && msg.type === chat_1.MessageType.React && msg.referenceMessageId) {
                if (!acc[msg.referenceMessageId]) {
                    acc[msg.referenceMessageId] = [];
                }
                acc[msg.referenceMessageId].push(msg);
            }
            return acc;
        }, {});
        const messagesById = messages.reduce((acc, msg) => {
            if (msg && msg.type !== chat_1.MessageType.React) {
                if (!acc[msg.id]) {
                    acc[msg.id] = msg;
                }
            }
            return acc;
        }, {});
        // Don't change identity of reacts array if the number of reacts has not increased
        let cachedReactsLocal = {};
        if (chat) {
            cachedReacts[chat.toBase58()] = cachedReacts[chat.toBase58()] || {};
            cachedReactsLocal = cachedReacts[chat.toBase58()];
        }
        return messages
            .filter((msg) => msg.type !== chat_1.MessageType.React && msg.chatKey.equals(chat))
            .map((message) => {
            var _a;
            cachedReactsLocal[message.id] = cachedReactsLocal[message.id] || [];
            if (cachedReactsLocal[message.id].length != ((_a = reacts[message.id]) === null || _a === void 0 ? void 0 : _a.length)) {
                cachedReactsLocal[message.id] = reacts[message.id];
            }
            return Object.assign(Object.assign({}, message), { reacts: cachedReactsLocal[message.id], reply: message.referenceMessageId
                    ? messagesById[message.referenceMessageId]
                    : null });
        });
    }, [stablePubkey, messages]);
    return Object.assign(Object.assign({}, rest), { hasMore: Boolean(useFetcher
            ? messages.length > 0 &&
                fetchedMessageParts &&
                fetchedMessageParts.length >= numTransactions
            : rest.hasMore), fetchMore: useFetcher
            ? (num) => __awaiter(this, void 0, void 0, function* () {
                yield runFetch(Object.assign(Object.assign({}, variables), { limit: num, maxBlockTime: fetchedMessageParts &&
                        fetchedMessageParts[fetchedMessageParts.length - 1] &&
                        fetchedMessageParts[fetchedMessageParts.length - 1].blockTime }));
            })
            : rest.fetchMore, fetchNew: useFetcher
            ? (num) => __awaiter(this, void 0, void 0, function* () {
                yield runFetch(Object.assign(Object.assign({}, variables), { limit: num, maxBlockTime: new Date().valueOf() / 1000, minBlockTime: fetchedMessageParts && fetchedMessageParts[0]
                        ? fetchedMessageParts[0].blockTime
                        : 0 }));
            })
            : rest.fetchNew, loadingInitial: loadingInitial || (useFetcher && !fetchedMessageParts && !fetchLoading), loadingMore: loading || fetchLoading || rest.loadingMore, error: rest.error || error || fetchError, messages: messagesWithReactsAndReplies });
}
exports.useMessages = useMessages;
//# sourceMappingURL=useMessages.js.map
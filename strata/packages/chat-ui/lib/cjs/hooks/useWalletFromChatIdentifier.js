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
exports.useWalletFromChatIdentifier = void 0;
const react_1 = require("react");
const react_async_hook_1 = require("react-async-hook");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_2 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useCaseInsensitiveMarker_1 = require("./useCaseInsensitiveMarker");
const useWalletFromChatIdentifier = (identifier) => {
    const { connection } = (0, wallet_adapter_react_1.useConnection)();
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { result: namespaces, loading: loading1, error: error1, } = (0, react_async_hook_1.useAsync)((chatSdk) => __awaiter(void 0, void 0, void 0, function* () { return chatSdk ? chatSdk.getNamespaces() : undefined; }), [chatSdk]);
    const { result: markerKey, loading: loading2, error: error2, } = (0, react_async_hook_1.useAsync)((identifier, chatNamespace) => __awaiter(void 0, void 0, void 0, function* () {
        return identifier && chatNamespace
            ? chat_1.ChatSdk.caseInsensitiveMarkerKey(new web3_js_1.PublicKey(chatNamespace), identifier)
            : undefined;
    }), [identifier, namespaces === null || namespaces === void 0 ? void 0 : namespaces.chatNamespace.toBase58()]);
    const { info: marker, loading: loading3 } = (0, useCaseInsensitiveMarker_1.useCaseInsensitiveMarker)(markerKey && markerKey[0]);
    const { result: tokenAccountKey, loading: loading4, error: error3, } = (0, react_async_hook_1.useAsync)((connection, mint) => __awaiter(void 0, void 0, void 0, function* () {
        if (mint) {
            const accounts = yield connection.getTokenLargestAccounts(mint);
            return accounts.value[0].address;
        }
    }), [connection, marker === null || marker === void 0 ? void 0 : marker.certificateMint]);
    const { info: tokenAccount } = (0, react_2.useTokenAccount)(tokenAccountKey);
    const wallet = (0, react_1.useMemo)(() => {
        if (tokenAccount &&
            namespaces &&
            !tokenAccount.owner.equals(namespaces.chatNamespace)) {
            return tokenAccount === null || tokenAccount === void 0 ? void 0 : tokenAccount.owner;
        }
    }, [namespaces, tokenAccount]);
    return {
        loading: loading1 || loading2 || loading3 || loading4,
        wallet,
        error: error1 || error2 || error3,
    };
};
exports.useWalletFromChatIdentifier = useWalletFromChatIdentifier;
//# sourceMappingURL=useWalletFromChatIdentifier.js.map
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
exports.useChatKeyFromIdentifier = void 0;
const namespaces_1 = require("@cardinal/namespaces");
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const react_1 = require("@strata-foundation/react");
const react_async_hook_1 = require("react-async-hook");
const chatSdk_1 = require("../contexts/chatSdk");
const useChatKey_1 = require("./useChatKey");
function useChatKeyFromIdentifier(identifier) {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    const { result: namespaces, loading: loading1, error, } = (0, react_async_hook_1.useAsync)((chatSdk) => __awaiter(this, void 0, void 0, function* () { return chatSdk ? chatSdk.getNamespaces() : undefined; }), [chatSdk]);
    const { result: entryKey, loading: loading2, error: error2, } = (0, react_async_hook_1.useAsync)((identifier, chatNamespace) => __awaiter(this, void 0, void 0, function* () {
        return identifier && chatNamespace
            ? web3_js_1.PublicKey.findProgramAddressSync([
                anchor_1.utils.bytes.utf8.encode(namespaces_1.ENTRY_SEED),
                new web3_js_1.PublicKey(chatNamespace).toBytes(),
                anchor_1.utils.bytes.utf8.encode(identifier),
            ], namespaces_1.NAMESPACES_PROGRAM_ID)
            : undefined;
    }), [identifier, namespaces === null || namespaces === void 0 ? void 0 : namespaces.chatNamespace.toBase58()]);
    const { info: entry, loading: loading3 } = (0, react_1.useAccount)(entryKey ? entryKey[0] : undefined, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.entryDecoder);
    const { key: chatKey, loading: loading4 } = (0, useChatKey_1.useChatKey)(entry === null || entry === void 0 ? void 0 : entry.mint);
    return {
        loading: loading1 || loading2 || loading3 || loading4,
        chatKey,
        error: error || error2
    };
}
exports.useChatKeyFromIdentifier = useChatKeyFromIdentifier;
//# sourceMappingURL=useChatKeyFromIdentifier.js.map
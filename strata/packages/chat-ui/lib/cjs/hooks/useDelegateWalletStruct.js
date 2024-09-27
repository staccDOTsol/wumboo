"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelegateWalletStruct = void 0;
const react_1 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useDelegateWalletStruct = (key) => {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return (0, react_1.useAccount)(key, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.delegateWalletDecoder);
};
exports.useDelegateWalletStruct = useDelegateWalletStruct;
//# sourceMappingURL=useDelegateWalletStruct.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletSettings = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const useSettingsKey_1 = require("./useSettingsKey");
const useSettings_1 = require("./useSettings");
function useWalletSettings() {
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { key } = (0, useSettingsKey_1.useSettingsKey)(publicKey || undefined);
    return (0, useSettings_1.useSettings)(key);
}
exports.useWalletSettings = useWalletSettings;
//# sourceMappingURL=useWalletSettings.js.map
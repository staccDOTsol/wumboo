"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSettings = void 0;
const react_1 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useSettings = (settings) => {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return (0, react_1.useAccount)(settings, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.settingsDecoder);
};
exports.useSettings = useSettings;
//# sourceMappingURL=useSettings.js.map
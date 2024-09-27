"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfile = void 0;
const react_1 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useProfile = (profile) => {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return (0, react_1.useAccount)(profile, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.profileDecoder);
};
exports.useProfile = useProfile;
//# sourceMappingURL=useProfile.js.map
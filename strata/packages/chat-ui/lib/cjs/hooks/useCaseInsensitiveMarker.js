"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCaseInsensitiveMarker = void 0;
const react_1 = require("@strata-foundation/react");
const chatSdk_1 = require("../contexts/chatSdk");
const useCaseInsensitiveMarker = (caseInsensitiveMarker) => {
    const { chatSdk } = (0, chatSdk_1.useChatSdk)();
    return (0, react_1.useAccount)(caseInsensitiveMarker, chatSdk === null || chatSdk === void 0 ? void 0 : chatSdk.caseInsensitiveMarkerDecoder);
};
exports.useCaseInsensitiveMarker = useCaseInsensitiveMarker;
//# sourceMappingURL=useCaseInsensitiveMarker.js.map
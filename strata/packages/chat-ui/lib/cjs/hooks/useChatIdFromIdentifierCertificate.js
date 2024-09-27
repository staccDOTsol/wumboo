"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChatIdFromIdentifierCertificate = void 0;
const react_1 = require("@strata-foundation/react");
function useChatIdFromIdentifierCertificate(identifierCertificateMint) {
    const { metadata, loading } = (0, react_1.useTokenMetadata)(identifierCertificateMint);
    const chatId = metadata === null || metadata === void 0 ? void 0 : metadata.data.name.split(".")[0];
    return {
        loading,
        chatId,
    };
}
exports.useChatIdFromIdentifierCertificate = useChatIdFromIdentifierCertificate;
//# sourceMappingURL=useChatIdFromIdentifierCertificate.js.map
import { useTokenMetadata } from "@strata-foundation/react";
export function useChatIdFromIdentifierCertificate(identifierCertificateMint) {
    const { metadata, loading } = useTokenMetadata(identifierCertificateMint);
    const chatId = metadata?.data.name.split(".")[0];
    return {
        loading,
        chatId,
    };
}
//# sourceMappingURL=useChatIdFromIdentifierCertificate.js.map
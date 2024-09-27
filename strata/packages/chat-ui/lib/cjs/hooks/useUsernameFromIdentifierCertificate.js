"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useUsernameFromIdentifierCertificate = void 0;
const react_1 = require("@strata-foundation/react");
const react_2 = require("react");
function useUsernameFromIdentifierCertificate(identifierCertificateMint, owner) {
    const { metadata, loading } = (0, react_1.useTokenMetadata)(identifierCertificateMint);
    const { associatedAccount: account } = (0, react_1.useAssociatedAccount)(owner, identifierCertificateMint);
    const username = (0, react_2.useMemo)(() => {
        if (account &&
            owner &&
            account.owner.equals(owner) &&
            account.amount.toNumber() >= 1) {
            return metadata === null || metadata === void 0 ? void 0 : metadata.data.name.split(".")[0];
        }
    }, [owner, metadata, account]);
    return {
        loading,
        username
    };
}
exports.useUsernameFromIdentifierCertificate = useUsernameFromIdentifierCertificate;
//# sourceMappingURL=useUsernameFromIdentifierCertificate.js.map
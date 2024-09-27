"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChats = void 0;
const client_1 = require("@apollo/client");
const react_1 = require("react");
const CHAT_QUERY = (0, client_1.gql) `
  query Chats($publicKeys: [String], $minActiveUsers: Int) {
    chats(pubkeys: $publicKeys, minActiveUsers: $minActiveUsers) {
      name
      publicKey
      imageUrl
      metadataUrl
      identifierCertificateMint
      dailyActiveUsers
    }
  }
`;
const useChats = (publicKeys, { minActiveUsers = 2 } = {}) => {
    const strPublicKeys = (0, react_1.useMemo)(() => publicKeys === null || publicKeys === void 0 ? void 0 : publicKeys.map((p) => p.toBase58()), [publicKeys]);
    const { data: { chats = [] } = {}, error, loading, } = (0, client_1.useQuery)(CHAT_QUERY, {
        variables: {
            publicKeys: strPublicKeys,
            minActiveUsers
        },
        context: {
            clientName: "strata",
        },
    });
    return {
        error,
        loading,
        chats
    };
};
exports.useChats = useChats;
//# sourceMappingURL=useChats.js.map
import { gql, useQuery } from "@apollo/client";
import { useMemo } from "react";
const CHAT_QUERY = gql `
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
export const useChats = (publicKeys, { minActiveUsers = 2 } = {}) => {
    const strPublicKeys = useMemo(() => publicKeys?.map((p) => p.toBase58()), [publicKeys]);
    const { data: { chats = [] } = {}, error, loading, } = useQuery(CHAT_QUERY, {
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
//# sourceMappingURL=useChats.js.map
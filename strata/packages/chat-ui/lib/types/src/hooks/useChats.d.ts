import { PublicKey } from "@solana/web3.js";
export interface GraphChat {
    name: string;
    publicKey: string;
    identifierCertificateMint: string;
    imageUrl: string;
    metadataUrl: string;
    dailyActiveUsers: number;
}
export declare const useChats: (publicKeys?: PublicKey[], { minActiveUsers }?: {
    minActiveUsers?: number;
}) => {
    error: import("@apollo/client").ApolloError;
    loading: boolean;
    chats: GraphChat[];
};
//# sourceMappingURL=useChats.d.ts.map
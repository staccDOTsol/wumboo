import { PublicKey } from "@solana/web3.js";
import { IMessage, IMessagePart } from "@strata-foundation/chat";
export interface IMessageWithPending extends IMessage {
    pending?: boolean;
}
export interface IMessageWithPendingAndReacts extends IMessage {
    reacts: IMessageWithPending[];
    reply: IMessageWithPending | null;
}
export interface IUseMessagesState {
    error: Error | undefined;
    loading: boolean;
    messages: IMessageWithPending[] | undefined;
}
export interface IUseMessages {
    error: Error | undefined;
    hasMore: boolean;
    loadingInitial: boolean;
    loadingMore: boolean;
    messages: IMessageWithPendingAndReacts[] | undefined;
    fetchMore(num: number): Promise<void>;
    fetchNew(num: number): Promise<void>;
}
export declare type FetchArgs = {
    minBlockTime: number;
    maxBlockTime: number;
    chat: PublicKey;
    limit: number;
    offset: number;
};
export declare type Fetcher = (args: FetchArgs) => Promise<IMessagePart[]>;
export declare const MESSAGE_LAMBDA = "https://prod-api.teamwumbo.com/messages";
export declare function useMessages({ chat, accelerated, numTransactions, fetcher, }: {
    chat: PublicKey | undefined;
    accelerated?: boolean;
    numTransactions?: number;
    fetcher?: Fetcher | null;
}): IUseMessages;
//# sourceMappingURL=useMessages.d.ts.map
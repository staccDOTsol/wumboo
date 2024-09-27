import { IMessageWithPending, IMessageWithPendingAndReacts } from "../hooks/useMessages";
export declare const ChatMessageSkeleton: () => JSX.Element;
export declare const ChatMessages: ({ isLoading, isLoadingMore, hasMore, fetchMore, scrollRef, messages, }: {
    isLoading: boolean;
    isLoadingMore: boolean;
    hasMore: boolean;
    fetchMore: (num: number) => void;
    scrollRef?: any;
    messages?: (IMessageWithPendingAndReacts | IMessageWithPending)[];
}) => JSX.Element;
//# sourceMappingURL=ChatMessages.d.ts.map
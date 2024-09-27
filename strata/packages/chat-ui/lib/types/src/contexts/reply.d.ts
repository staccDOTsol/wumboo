import React, { FC, ReactNode } from "react";
import { IMessageWithPendingAndReacts } from "../hooks/useMessages";
export interface IReplyProviderProps {
    children: ReactNode;
}
export interface IReplyContextState {
    replyMessage: Partial<IMessageWithPendingAndReacts> | undefined;
    showReply: (reply: Partial<IMessageWithPendingAndReacts> | undefined) => void;
    hideReply: () => void;
}
export declare const ReplyContext: React.Context<IReplyContextState>;
export declare const ReplyProvider: FC<IReplyProviderProps>;
export declare const useReply: () => IReplyContextState;
//# sourceMappingURL=reply.d.ts.map
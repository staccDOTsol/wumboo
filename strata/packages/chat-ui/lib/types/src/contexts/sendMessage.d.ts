import { PublicKey } from "@solana/web3.js";
import React from "react";
import { ISendMessageContent, PermissionType } from "@strata-foundation/chat";
import BN from "bn.js";
import { FC } from "react";
import { IMessageWithPending } from "../hooks/useMessages";
export interface IUseSendMessageArgs {
    chatKey?: PublicKey;
}
export interface IUseSendMessageReturn {
    onAddPendingMessage?: (message: IMessageWithPending) => void;
    chatKey?: PublicKey;
    sendMessage(args: {
        message: ISendMessageContent;
        readPermissionKey?: PublicKey;
        readPermissionAmount?: BN;
        readPermissionType?: PermissionType;
        onAddPendingMessage?: (message: IMessageWithPending) => void;
    }): Promise<void>;
    error?: Error;
    loading: boolean;
}
export declare function useStrataSendMessage({ chatKey, }: IUseSendMessageArgs): IUseSendMessageReturn;
export declare const SendMessageContext: React.Context<IUseSendMessageReturn>;
export declare const SendMessageProvider: FC<IUseSendMessageArgs>;
export declare const useSendMessage: () => IUseSendMessageReturn;
//# sourceMappingURL=sendMessage.d.ts.map
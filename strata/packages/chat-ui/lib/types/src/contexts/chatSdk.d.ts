import { ChatSdk } from "@strata-foundation/chat";
import React from "react";
export declare const ChatSdkContext: React.Context<IChatSdkReactState>;
export interface IChatSdkReactState {
    error?: Error;
    loading: boolean;
    chatSdk?: ChatSdk;
}
export declare const ChatSdkProviderRaw: React.FC<React.PropsWithChildren>;
export declare const ChatSdkProvider: React.FC;
export declare const useChatSdk: () => IChatSdkReactState;
//# sourceMappingURL=chatSdk.d.ts.map
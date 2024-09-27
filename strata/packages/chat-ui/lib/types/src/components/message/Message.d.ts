import React from "react";
import { IMessageWithPendingAndReacts } from "../../hooks/useMessages";
export declare function Message(props: Partial<IMessageWithPendingAndReacts> & {
    htmlAllowlist?: any;
    pending?: boolean;
    showUser: boolean;
    scrollToMessage: (id: string) => void;
}): JSX.Element;
export declare const MemodMessage: React.MemoExoticComponent<typeof Message>;
//# sourceMappingURL=Message.d.ts.map
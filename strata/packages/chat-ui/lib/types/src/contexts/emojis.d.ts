import React, { FC, ReactNode } from "react";
export interface IEmojisProviderProps {
    children: ReactNode;
}
export interface IEmojisContextState {
    referenceMessageId: string | undefined;
    showPicker: (messageId: string | undefined) => void;
    hidePicker: () => void;
}
export declare const EmojisContext: React.Context<IEmojisContextState>;
declare const EmojisProvider: FC<IEmojisProviderProps>;
declare const useEmojis: () => IEmojisContextState;
export { EmojisProvider, useEmojis };
//# sourceMappingURL=emojis.d.ts.map
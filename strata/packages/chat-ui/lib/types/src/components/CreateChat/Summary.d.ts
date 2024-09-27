import React from "react";
import { CreateChatStep, ICreateChatModalState } from "./CreateChatModal";
interface ISummaryProps {
    state: ICreateChatModalState;
    onBack: (step?: CreateChatStep | any) => void;
    onNext: () => void;
}
export declare const Summary: React.FC<ISummaryProps>;
export {};
//# sourceMappingURL=Summary.d.ts.map
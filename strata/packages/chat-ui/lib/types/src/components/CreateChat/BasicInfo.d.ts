import React from "react";
import { ICreateChatModalState } from "./CreateChatModal";
interface IBasicInfoProps {
    state: ICreateChatModalState;
    setState: React.Dispatch<Partial<ICreateChatModalState>>;
    onBack: () => void;
    onNext: () => void;
}
export declare const BasicInfo: React.FC<IBasicInfoProps>;
export {};
//# sourceMappingURL=BasicInfo.d.ts.map
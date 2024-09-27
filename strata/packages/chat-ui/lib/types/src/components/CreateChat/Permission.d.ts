import React from "react";
import { ICreateChatModalState } from "./CreateChatModal";
interface IPermissionProps {
    state: ICreateChatModalState;
    setState: React.Dispatch<Partial<ICreateChatModalState>>;
    permissionType: "read" | "post";
    onBack: () => void;
    onNext: () => void;
}
export declare const Permission: React.FC<IPermissionProps>;
export {};
//# sourceMappingURL=Permission.d.ts.map
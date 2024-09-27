import React from "react";
import { ICreateChatModalState, ReadPostType } from "./CreateChatModal";
interface IPermissionTypeProps {
    state: ICreateChatModalState;
    setState: React.Dispatch<Partial<ICreateChatModalState>>;
    defaultValue: undefined | ReadPostType;
    permissionType: "read" | "post";
    onBack: () => void;
    onNext: () => void;
}
export declare const PermissionType: React.FC<IPermissionTypeProps>;
export {};
//# sourceMappingURL=PermissionType.d.ts.map
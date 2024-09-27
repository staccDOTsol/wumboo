import React from "react";
import { ITokenFormValues } from "./TokenForm";
import { INFTFormValues } from "./NFTForm";
interface ICreateChatModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export declare enum CreateChatStep {
    BasicInfo = 0,
    ReadPermissionsType = 1,
    ReadPermissions = 2,
    PostPermissionsType = 3,
    PostPermissions = 4,
    Summary = 5
}
export declare namespace CreateChatStep {
    const prev: (value: CreateChatStep) => CreateChatStep;
    const next: (value: CreateChatStep) => CreateChatStep;
}
export declare enum ReadPostType {
    Token = "Token",
    NFT = "NFT"
}
export interface ICreateChatModalState {
    step: CreateChatStep;
    lastStep: CreateChatStep;
    status: null | "submitting" | "success" | string;
    subStatus: null | string;
    error: null | Error;
    wizardData: {
        name: string;
        identifier: string;
        description: string;
        image: undefined | File;
        imageUrl: undefined | string;
        imageUploaded: boolean;
        readType: undefined | ReadPostType;
        postType: undefined | ReadPostType;
        postIsSameAsRead: boolean;
        readForm: Partial<ITokenFormValues> | Partial<INFTFormValues>;
        postForm: Partial<ITokenFormValues> | Partial<INFTFormValues>;
    };
}
export declare const initialState: ICreateChatModalState;
export declare const CreateChatModal: React.FC<ICreateChatModalProps>;
export {};
//# sourceMappingURL=CreateChatModal.d.ts.map
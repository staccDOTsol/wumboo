import React from "react";
export interface INFTFormValues {
    type: "nft";
    amount: number;
    collectionKey: string;
}
interface INFTFormProps {
    defaultValues?: any;
    onSubmit: (data: any) => void;
    onBack: () => void;
}
export declare const NFTForm: React.FC<INFTFormProps>;
export {};
//# sourceMappingURL=NFTForm.d.ts.map
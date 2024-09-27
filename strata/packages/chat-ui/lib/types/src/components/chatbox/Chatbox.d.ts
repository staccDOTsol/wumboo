import { PublicKey } from "@solana/web3.js";
import React from "react";
import { IMessageWithPending } from "../../hooks/useMessages";
export declare type chatProps = {
    onAddPendingMessage?: (message: IMessageWithPending) => void;
    chatKey?: PublicKey;
    files: {
        name: string;
        file: File;
    }[];
    setFiles: React.Dispatch<React.SetStateAction<{
        name: string;
        file: File;
    }[]>>;
    onUploadFile: () => void;
};
export declare function Chatbox({ chatKey, onAddPendingMessage: inputOnAddPendingMessage, files, setFiles, onUploadFile, }: chatProps): JSX.Element;
//# sourceMappingURL=Chatbox.d.ts.map
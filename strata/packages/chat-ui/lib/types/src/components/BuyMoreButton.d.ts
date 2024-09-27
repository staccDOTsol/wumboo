import React from "react";
import { ButtonProps } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
declare type BuyMoreTrigger = React.FC<{
    onClick: () => void;
    connected: boolean;
    mint?: PublicKey;
    btnProps?: ButtonProps;
}>;
export declare function BuyMoreButton({ mint, trigger, btnProps, }: {
    mint?: PublicKey;
    trigger?: BuyMoreTrigger;
    btnProps?: ButtonProps;
}): JSX.Element;
export {};
//# sourceMappingURL=BuyMoreButton.d.ts.map
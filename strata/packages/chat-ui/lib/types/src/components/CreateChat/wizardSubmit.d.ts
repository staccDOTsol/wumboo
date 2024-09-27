import { Keypair } from "@solana/web3.js";
import { ChatSdk } from "@strata-foundation/chat";
import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import { ICreateChatModalState } from "./CreateChatModal";
interface IWizardSubmitOpts {
    sdks: {
        tokenBondingSdk: SplTokenBonding | undefined;
        chatSdk: ChatSdk | undefined;
    };
    data: ICreateChatModalState;
    delegateWallet: Keypair | undefined;
    setState: (value: Partial<ICreateChatModalState>) => void;
}
export declare const wizardSubmit: ({ sdks, data, delegateWallet, setState, }: IWizardSubmitOpts) => Promise<void>;
export {};
//# sourceMappingURL=wizardSubmit.d.ts.map
import { IMessageWithPending } from "./useMessages";
interface IReact {
    emoji: string;
    count: number;
    messages: IMessageWithPending[];
    mine: boolean;
}
/**
 * Get all reactions to a message, removing duplicates.
 */
export declare function useInflatedReacts(reacts: IMessageWithPending[] | undefined): {
    loading: boolean;
    error: Error | undefined;
    reacts: IReact[] | undefined;
};
export {};
//# sourceMappingURL=useInflatedReacts.d.ts.map
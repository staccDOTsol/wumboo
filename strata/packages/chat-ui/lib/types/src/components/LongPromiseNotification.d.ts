export interface ILongPromiseNotification<T> {
    onComplete?: (result: T) => void;
    text: string;
    estTimeMillis: number;
    exec: () => Promise<T>;
    onError: (error: Error) => void;
}
export declare function LongPromiseNotification<T>({ onComplete, onError, exec, estTimeMillis, text }: ILongPromiseNotification<T>): JSX.Element;
//# sourceMappingURL=LongPromiseNotification.d.ts.map
export declare const pageview: (url: URL) => void;
declare type GTagEvent = {
    action: string;
    category: string;
    label: string;
    value: number;
};
export declare const event: ({ action, category, label, value }: GTagEvent) => void;
export {};
//# sourceMappingURL=gtag.d.ts.map
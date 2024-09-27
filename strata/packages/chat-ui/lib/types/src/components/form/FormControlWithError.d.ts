import React from "react";
export interface IFormControlWithErrorProps<A> {
    children: React.ReactNode;
    errors: any;
    id: string;
    help?: string;
    label?: string;
}
export declare function FormControlWithError<A>({ id, label, help, children, errors, ...rest }: IFormControlWithErrorProps<A>): JSX.Element;
//# sourceMappingURL=FormControlWithError.d.ts.map
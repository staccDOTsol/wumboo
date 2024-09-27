import React from "react";
import { AvatarProps } from "@chakra-ui/react";
interface IProgressStepProps extends AvatarProps {
    step: number;
    isActive: boolean;
    isCompleted: boolean;
    isLast?: boolean;
}
export declare const ProgressStep: React.FC<IProgressStepProps>;
export {};
//# sourceMappingURL=ProgressStep.d.ts.map
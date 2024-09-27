import React from "react";
import { Divider, Avatar } from "@chakra-ui/react";
import { RiCheckLine } from "react-icons/ri";
export const ProgressStep = ({ step, isActive, isCompleted, isLast, ...avatarProps }) => {
    const nameOrIcon = isCompleted
        ? { icon: React.createElement(RiCheckLine, { fontSize: "1.2rem", color: "white" }) }
        : { name: `${step}` };
    const bg = isActive
        ? { bg: "primary.500" }
        : isCompleted
            ? { bg: "green.500" }
            : { bg: "gray.300", _dark: { bg: "gray.800" } };
    const dividerColor = isCompleted
        ? { borderColor: "green.500" }
        : { borderColor: "gray.300", _dark: { borderColor: "gray.800" } };
    return (React.createElement(React.Fragment, null,
        React.createElement(Avatar, { ariaLabel: `Progress Step ${step}`, ...nameOrIcon, ...bg, ...avatarProps }),
        !isLast && React.createElement(Divider, { ...dividerColor })));
};
//# sourceMappingURL=ProgressStep.js.map
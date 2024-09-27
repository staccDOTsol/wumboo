import React from "react";
import { Box, Stack, useColorModeValue, useRadio, Flex, } from "@chakra-ui/react";
export const RadioCard = ({ 
//@ts-ignore
children, disabled = false, ...props }) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const bg = useColorModeValue("gray.200", "gray.800");
    return (React.createElement(Box, { onClick: (e) => {
            if (disabled) {
                e.preventDefault();
                e.stopPropagation();
            }
        } },
        React.createElement(Box, { as: "label" },
            React.createElement("input", { ...input }),
            React.createElement(Box, { ...checkbox, mt: { base: 2, md: 0 }, mr: 2, cursor: "pointer", borderWidth: "1px", borderRadius: "md", bg: bg, _checked: {
                    bg: "orange.600",
                    color: "white",
                    borderColor: "orange.600",
                } }, children))));
};
export const RadioCardWithAffordance = ({ 
//@ts-ignore
children, disabled = false, containerProps = {}, ...props }) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);
    const input = getInputProps();
    const checkbox = getCheckboxProps();
    const bg = useColorModeValue("gray.200", "gray.800");
    return (React.createElement(Box, { w: "full", maxW: { base: "auto", md: "242px" }, flexGrow: 1, flexShrink: 1, flexBasis: 0, ...containerProps, onClick: (e) => {
            if (disabled) {
                e.preventDefault();
                e.stopPropagation();
            }
        } },
        React.createElement(Box, { as: "label", textAlign: "center" },
            React.createElement("input", { ...input }),
            React.createElement(Stack, { ...checkbox, cursor: disabled ? "inherit" : "pointer", opacity: disabled ? 0.4 : 1, borderWidth: "1px", borderRadius: "md", borderColor: "gray.500", position: "relative", mb: 2, _hover: disabled
                    ? {}
                    : {
                        borderColor: "white",
                    }, _checked: {
                    bg: bg,
                    borderColor: "white",
                }, flexDirection: "column", justifyContent: "space-between" },
                React.createElement(Flex, { justifyContent: "right", position: "absolute", top: 4, right: 2 },
                    React.createElement(Flex, { w: 4, h: 4, rounded: "full", bg: input.checked ? "orange.500" : "gray.200", _hover: disabled ? {} : { bg: "orange.500" }, justifyContent: "center", alignItems: "center" },
                        React.createElement(Box, { ...(input.checked
                                ? { w: 1.5, h: 1.5 }
                                : { w: 3, h: 3 }), rounded: "full", bg: "white" }))),
                children))));
};
//# sourceMappingURL=RadioCard.js.map
import React from "react";
import { FormLabel, FormControl, FormHelperText, FormErrorMessage, Icon, } from "@chakra-ui/react";
import { RiErrorWarningFill } from "react-icons/ri";
export function FormControlWithError({ id, label, help = "", children, errors, ...rest }) {
    const helpTextColor = { color: "black", _dark: { color: "gray.400" } };
    return (React.createElement(FormControl, { id: id, isInvalid: !!errors[id]?.message, ...rest },
        label && React.createElement(FormLabel, { htmlFor: id }, label),
        children,
        !errors[id]?.message ? (React.createElement(FormHelperText, { fontSize: "xs", ...helpTextColor }, help)) : (React.createElement(FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
            React.createElement(Icon, { as: RiErrorWarningFill, mr: 1, fontSize: "1.3rem" }),
            errors[id].message))));
}
//# sourceMappingURL=FormControlWithError.js.map
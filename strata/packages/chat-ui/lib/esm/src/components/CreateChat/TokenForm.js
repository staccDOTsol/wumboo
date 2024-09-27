import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack, Switch, Text, FormControl, FormLabel, Input, FormHelperText, FormErrorMessage, Icon, ButtonGroup, Button, Flex, Link, } from "@chakra-ui/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiErrorWarningFill } from "react-icons/ri";
import { NATIVE_MINT } from "@solana/spl-token";
import { FormControlWithError } from "../form/FormControlWithError";
import { MintSelect } from "../form/MintSelect";
import { usePublicKey } from "@strata-foundation/react";
import { routes } from "../../routes";
export const validationSchema = (isExisting) => {
    return yup
        .object({
        amount: yup.number().required().min(0),
        ...(isExisting
            ? {
                mint: yup.string().required(),
            }
            : {
                startingPrice: yup.number().required().min(0),
                legalDisclosure: yup.bool().oneOf([true], "Field must be checked"),
            }),
    })
        .required();
};
export const TokenForm = ({ onSubmit, onBack, defaultValues, }) => {
    const [innerIsExisting, setInnerIsExisting] = useState(defaultValues.isExisting);
    const { handleSubmit, setValue, register, getValues, clearErrors, setError, watch, formState: { errors }, } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema(innerIsExisting)),
        defaultValues,
    });
    const { mint, amount, isExisting } = watch();
    const mintKey = usePublicKey(mint);
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const helpTextColor = { color: "black", _dark: { color: "gray.400" } };
    const clearValues = () => {
        const { isExisting, ...values } = getValues();
        Object.keys(values).forEach((field) => setValue(field, null));
    };
    const handleToggleExisting = (e) => {
        clearValues();
        clearErrors();
        setValue("isExisting", e.target.checked);
        setInnerIsExisting(e.target.checked);
    };
    const handleMintChange = (mint) => {
        setValue("mint", mint);
        if (mint) {
            clearErrors("mint");
        }
        else {
            setError("mint", { message: "Mint is a required field" });
        }
    };
    const handleOnSubmit = (data) => {
        onSubmit({
            type: isExisting && mintKey?.equals(NATIVE_MINT) ? "native" : "token",
            ...data,
        });
    };
    return (React.createElement("form", { onSubmit: handleSubmit(handleOnSubmit), style: { width: "100%" } },
        React.createElement(Stack, { w: "full", alignItems: "start", gap: 8, spacing: 0 },
            React.createElement(Stack, { direction: "row", justifyContent: "center", alignItems: "center" },
                React.createElement(Switch, { size: "lg", colorScheme: "primary", isChecked: isExisting, onChange: handleToggleExisting }),
                React.createElement(Text, null, "Use existing token")),
            React.createElement(Stack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
                isExisting ? (React.createElement(FormControl, { isInvalid: !!errors.mint?.message },
                    React.createElement(FormLabel, { htmlFor: "mint" }, isExisting ? "Mint" : "Purchase Mint"),
                    React.createElement(MintSelect, { value: watch("mint"), onChange: handleMintChange }),
                    !errors.mint?.message ? (React.createElement(FormHelperText, { fontSize: "xs", ...helpTextColor },
                        isExisting
                            ? "The mint of the existing token to use for this permission."
                            : "The mint that should be used to purchase this token.",
                        "\u00A0If you want users using SOL, use\u00A0",
                        React.createElement(Text, { color: "primary.500", as: "span", cursor: "pointer", onClick: () => handleMintChange(NATIVE_MINT.toString()) }, NATIVE_MINT.toString()))) : (React.createElement(FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
                        React.createElement(Icon, { as: RiErrorWarningFill, mr: 2, fontSize: "1.3rem" }),
                        React.createElement(Text, null,
                            errors.mint.message,
                            ". If you want users using SOL, use\u00A0",
                            React.createElement(Text, { color: "primary.500", as: "span", cursor: "pointer", onClick: () => handleMintChange(NATIVE_MINT.toString()) }, NATIVE_MINT.toString())))))) : (React.createElement(React.Fragment, null,
                    React.createElement(Text, { fontSize: "xs" },
                        "We'll create a token for you thats bonded to SOL, via a stable curve, with 5% buy royalties. If you want a more advanced token/curve please",
                        " ",
                        React.createElement(Link, { color: "primary.500", isExternal: true, href: routes.fullyManagedLaunchpad.path }, "launch one.")),
                    React.createElement(FormControlWithError, { id: "startingPrice", label: "Starting Price", errors: errors, help: "The starting price in SOL of the token. The price will increase as\n                    more tokens are purchased" },
                        React.createElement(Input, { id: "startingPrice", variant: "filled", type: "number", fontSize: "sm", min: 0, step: 0.000000000001, ...inputBg, ...register("startingPrice") })))),
                React.createElement(FormControlWithError, { id: "amount", label: "Required Amount", errors: errors, help: "The amount required to hold of this token." },
                    React.createElement(Input, { id: "amount", variant: "filled", type: "number", fontSize: "sm", min: 0, step: 0.000000000001, ...inputBg, ...register("amount") })),
                !isExisting && (React.createElement(FormControl, { display: "flex", flexDirection: "column", alignItems: "flex-start", isInvalid: !!errors.legalDisclosure?.message },
                    React.createElement(Flex, { alignItems: "center" },
                        React.createElement(Switch, { id: "legalDisclosure", colorScheme: "primary", ...register("legalDisclosure") }),
                        React.createElement(FormLabel, { htmlFor: "legalDisclosure", mb: "0", ml: "4", fontSize: "xs" },
                            "I have read and agree to the",
                            " ",
                            React.createElement(Link, { color: "primary.500", isExternal: true, href: "/terms-of-service.pdf" }, "strata.im Terms of Service"))),
                    errors.legalDisclosure?.message && (React.createElement(FormErrorMessage, { textTransform: "capitalize", display: "flex", w: "full" },
                        React.createElement(Icon, { as: RiErrorWarningFill, mr: 2, fontSize: "1.3rem" }),
                        errors.legalDisclosure.message))))),
            React.createElement(ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
                React.createElement(Button, { w: "full", onClick: onBack }, "Back"),
                React.createElement(Button, { w: "full", variant: "solid", type: "submit", disabled: isExisting ? !mint || !amount : !amount }, "Next")))));
};
//# sourceMappingURL=TokenForm.js.map
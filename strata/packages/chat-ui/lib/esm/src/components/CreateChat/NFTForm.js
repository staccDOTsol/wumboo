import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormControlWithError } from "../form/FormControlWithError";
import { Stack, Input, ButtonGroup, Button } from "@chakra-ui/react";
const validationSchema = yup
    .object({
    collectionKey: yup.string().required(),
})
    .required();
export const NFTForm = ({ onSubmit, onBack, defaultValues = {}, }) => {
    const { handleSubmit, setValue, register, watch, formState: { errors }, } = useForm({
        mode: "onChange",
        resolver: yupResolver(validationSchema),
        defaultValues,
    });
    const { collectionKey } = watch();
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const handleOnSubmit = (data) => {
        onSubmit({
            type: "nft",
            amount: 1,
            ...data,
        });
    };
    return (React.createElement("form", { onSubmit: handleSubmit(handleOnSubmit), style: { width: "100%" } },
        React.createElement(Stack, { w: "full", alignItems: "start", gap: 8, spacing: 0 },
            React.createElement(Stack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
                React.createElement(FormControlWithError, { id: "collectionKey", label: "Collection Key", errors: errors, help: "The key of the nft collection to use for this permission." },
                    React.createElement(Input, { id: "collectionKey", variant: "filled", ...inputBg, ...register("collectionKey") }))),
            React.createElement(ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
                React.createElement(Button, { w: "full", onClick: onBack }, "Back"),
                React.createElement(Button, { w: "full", variant: "solid", type: "submit", disabled: !collectionKey }, "Next")))));
};
//# sourceMappingURL=NFTForm.js.map
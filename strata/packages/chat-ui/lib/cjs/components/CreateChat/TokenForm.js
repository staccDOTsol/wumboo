"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenForm = exports.validationSchema = void 0;
const react_1 = __importStar(require("react"));
const react_hook_form_1 = require("react-hook-form");
const react_2 = require("@chakra-ui/react");
const yup = __importStar(require("yup"));
const yup_1 = require("@hookform/resolvers/yup");
const ri_1 = require("react-icons/ri");
const spl_token_1 = require("@solana/spl-token");
const FormControlWithError_1 = require("../form/FormControlWithError");
const MintSelect_1 = require("../form/MintSelect");
const react_3 = require("@strata-foundation/react");
const routes_1 = require("../../routes");
const validationSchema = (isExisting) => {
    return yup
        .object(Object.assign({ amount: yup.number().required().min(0) }, (isExisting
        ? {
            mint: yup.string().required(),
        }
        : {
            startingPrice: yup.number().required().min(0),
            legalDisclosure: yup.bool().oneOf([true], "Field must be checked"),
        })))
        .required();
};
exports.validationSchema = validationSchema;
const TokenForm = ({ onSubmit, onBack, defaultValues, }) => {
    var _a, _b, _c, _d;
    const [innerIsExisting, setInnerIsExisting] = (0, react_1.useState)(defaultValues.isExisting);
    const { handleSubmit, setValue, register, getValues, clearErrors, setError, watch, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        mode: "onChange",
        resolver: (0, yup_1.yupResolver)((0, exports.validationSchema)(innerIsExisting)),
        defaultValues,
    });
    const { mint, amount, isExisting } = watch();
    const mintKey = (0, react_3.usePublicKey)(mint);
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const helpTextColor = { color: "black", _dark: { color: "gray.400" } };
    const clearValues = () => {
        const _a = getValues(), { isExisting } = _a, values = __rest(_a, ["isExisting"]);
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
        onSubmit(Object.assign({ type: isExisting && (mintKey === null || mintKey === void 0 ? void 0 : mintKey.equals(spl_token_1.NATIVE_MINT)) ? "native" : "token" }, data));
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(handleOnSubmit), style: { width: "100%" } },
        react_1.default.createElement(react_2.Stack, { w: "full", alignItems: "start", gap: 8, spacing: 0 },
            react_1.default.createElement(react_2.Stack, { direction: "row", justifyContent: "center", alignItems: "center" },
                react_1.default.createElement(react_2.Switch, { size: "lg", colorScheme: "primary", isChecked: isExisting, onChange: handleToggleExisting }),
                react_1.default.createElement(react_2.Text, null, "Use existing token")),
            react_1.default.createElement(react_2.Stack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
                isExisting ? (react_1.default.createElement(react_2.FormControl, { isInvalid: !!((_a = errors.mint) === null || _a === void 0 ? void 0 : _a.message) },
                    react_1.default.createElement(react_2.FormLabel, { htmlFor: "mint" }, isExisting ? "Mint" : "Purchase Mint"),
                    react_1.default.createElement(MintSelect_1.MintSelect, { value: watch("mint"), onChange: handleMintChange }),
                    !((_b = errors.mint) === null || _b === void 0 ? void 0 : _b.message) ? (react_1.default.createElement(react_2.FormHelperText, Object.assign({ fontSize: "xs" }, helpTextColor),
                        isExisting
                            ? "The mint of the existing token to use for this permission."
                            : "The mint that should be used to purchase this token.",
                        "\u00A0If you want users using SOL, use\u00A0",
                        react_1.default.createElement(react_2.Text, { color: "primary.500", as: "span", cursor: "pointer", onClick: () => handleMintChange(spl_token_1.NATIVE_MINT.toString()) }, spl_token_1.NATIVE_MINT.toString()))) : (react_1.default.createElement(react_2.FormErrorMessage, { fontSize: "xs", textTransform: "capitalize" },
                        react_1.default.createElement(react_2.Icon, { as: ri_1.RiErrorWarningFill, mr: 2, fontSize: "1.3rem" }),
                        react_1.default.createElement(react_2.Text, null,
                            errors.mint.message,
                            ". If you want users using SOL, use\u00A0",
                            react_1.default.createElement(react_2.Text, { color: "primary.500", as: "span", cursor: "pointer", onClick: () => handleMintChange(spl_token_1.NATIVE_MINT.toString()) }, spl_token_1.NATIVE_MINT.toString())))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                    react_1.default.createElement(react_2.Text, { fontSize: "xs" },
                        "We'll create a token for you thats bonded to SOL, via a stable curve, with 5% buy royalties. If you want a more advanced token/curve please",
                        " ",
                        react_1.default.createElement(react_2.Link, { color: "primary.500", isExternal: true, href: routes_1.routes.fullyManagedLaunchpad.path }, "launch one.")),
                    react_1.default.createElement(FormControlWithError_1.FormControlWithError, { id: "startingPrice", label: "Starting Price", errors: errors, help: "The starting price in SOL of the token. The price will increase as\n                    more tokens are purchased" },
                        react_1.default.createElement(react_2.Input, Object.assign({ id: "startingPrice", variant: "filled", type: "number", fontSize: "sm", min: 0, step: 0.000000000001 }, inputBg, register("startingPrice")))))),
                react_1.default.createElement(FormControlWithError_1.FormControlWithError, { id: "amount", label: "Required Amount", errors: errors, help: "The amount required to hold of this token." },
                    react_1.default.createElement(react_2.Input, Object.assign({ id: "amount", variant: "filled", type: "number", fontSize: "sm", min: 0, step: 0.000000000001 }, inputBg, register("amount")))),
                !isExisting && (react_1.default.createElement(react_2.FormControl, { display: "flex", flexDirection: "column", alignItems: "flex-start", isInvalid: !!((_c = errors.legalDisclosure) === null || _c === void 0 ? void 0 : _c.message) },
                    react_1.default.createElement(react_2.Flex, { alignItems: "center" },
                        react_1.default.createElement(react_2.Switch, Object.assign({ id: "legalDisclosure", colorScheme: "primary" }, register("legalDisclosure"))),
                        react_1.default.createElement(react_2.FormLabel, { htmlFor: "legalDisclosure", mb: "0", ml: "4", fontSize: "xs" },
                            "I have read and agree to the",
                            " ",
                            react_1.default.createElement(react_2.Link, { color: "primary.500", isExternal: true, href: "/terms-of-service.pdf" }, "strata.im Terms of Service"))),
                    ((_d = errors.legalDisclosure) === null || _d === void 0 ? void 0 : _d.message) && (react_1.default.createElement(react_2.FormErrorMessage, { textTransform: "capitalize", display: "flex", w: "full" },
                        react_1.default.createElement(react_2.Icon, { as: ri_1.RiErrorWarningFill, mr: 2, fontSize: "1.3rem" }),
                        errors.legalDisclosure.message))))),
            react_1.default.createElement(react_2.ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
                react_1.default.createElement(react_2.Button, { w: "full", onClick: onBack }, "Back"),
                react_1.default.createElement(react_2.Button, { w: "full", variant: "solid", type: "submit", disabled: isExisting ? !mint || !amount : !amount }, "Next")))));
};
exports.TokenForm = TokenForm;
//# sourceMappingURL=TokenForm.js.map
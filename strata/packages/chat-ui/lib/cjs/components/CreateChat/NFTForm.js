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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTForm = void 0;
const react_1 = __importDefault(require("react"));
const react_hook_form_1 = require("react-hook-form");
const yup = __importStar(require("yup"));
const yup_1 = require("@hookform/resolvers/yup");
const FormControlWithError_1 = require("../form/FormControlWithError");
const react_2 = require("@chakra-ui/react");
const validationSchema = yup
    .object({
    collectionKey: yup.string().required(),
})
    .required();
const NFTForm = ({ onSubmit, onBack, defaultValues = {}, }) => {
    const { handleSubmit, setValue, register, watch, formState: { errors }, } = (0, react_hook_form_1.useForm)({
        mode: "onChange",
        resolver: (0, yup_1.yupResolver)(validationSchema),
        defaultValues,
    });
    const { collectionKey } = watch();
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const handleOnSubmit = (data) => {
        onSubmit(Object.assign({ type: "nft", amount: 1 }, data));
    };
    return (react_1.default.createElement("form", { onSubmit: handleSubmit(handleOnSubmit), style: { width: "100%" } },
        react_1.default.createElement(react_2.Stack, { w: "full", alignItems: "start", gap: 8, spacing: 0 },
            react_1.default.createElement(react_2.Stack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
                react_1.default.createElement(FormControlWithError_1.FormControlWithError, { id: "collectionKey", label: "Collection Key", errors: errors, help: "The key of the nft collection to use for this permission." },
                    react_1.default.createElement(react_2.Input, Object.assign({ id: "collectionKey", variant: "filled" }, inputBg, register("collectionKey"))))),
            react_1.default.createElement(react_2.ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
                react_1.default.createElement(react_2.Button, { w: "full", onClick: onBack }, "Back"),
                react_1.default.createElement(react_2.Button, { w: "full", variant: "solid", type: "submit", disabled: !collectionKey }, "Next")))));
};
exports.NFTForm = NFTForm;
//# sourceMappingURL=NFTForm.js.map
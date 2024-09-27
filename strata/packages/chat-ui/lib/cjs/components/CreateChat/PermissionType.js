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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionType = void 0;
const react_1 = __importStar(require("react"));
const react_2 = require("@chakra-ui/react");
const RadioCard_1 = require("../form/RadioCard");
const CreateChatModal_1 = require("./CreateChatModal");
const PermissionType = ({ state, setState, defaultValue, permissionType, onBack, onNext, }) => {
    const isPostPermission = permissionType === "post";
    const [selectedOption, setSelectedOption] = (0, react_1.useState)(defaultValue);
    const { getRootProps, getRadioProps } = (0, react_2.useRadioGroup)({
        name: "readType",
        value: defaultValue,
        onChange: (x) => {
            setSelectedOption(x);
            setState(Object.assign(Object.assign({}, state), { wizardData: Object.assign(Object.assign(Object.assign({}, state.wizardData), { postIsSameAsRead: false }), (isPostPermission
                    ? { postPermissions: undefined }
                    : { readPermissions: undefined })) }));
        },
    });
    const group = getRootProps();
    (0, react_1.useEffect)(() => {
        if (selectedOption) {
            setState(Object.assign(Object.assign({}, state), { wizardData: Object.assign(Object.assign({}, state.wizardData), { [`${permissionType}Type`]: selectedOption }) }));
        }
    }, [selectedOption, setState]);
    const handleOnToggleSame = (e) => {
        const isChecked = e.target.checked;
        setSelectedOption(undefined);
        setState(Object.assign(Object.assign({}, state), { wizardData: Object.assign(Object.assign(Object.assign({}, state.wizardData), { postIsSameAsRead: isChecked, [`${permissionType}Type`]: undefined }), (isChecked
                ? { postForm: state.wizardData.readForm }
                : { postForm: undefined })) }));
    };
    return (react_1.default.createElement(react_2.VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
        react_1.default.createElement(react_2.Box, null,
            react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "md" },
                "Set your ",
                permissionType,
                " permissions."),
            react_1.default.createElement(react_2.Text, { fontSize: "xs", fontWeight: "normal" },
                "How do you want to gate ",
                permissionType,
                "ing messages in your chat?")),
        state.step === CreateChatModal_1.CreateChatStep.PostPermissionsType && (react_1.default.createElement(react_2.HStack, null,
            react_1.default.createElement(react_2.Switch, { size: "lg", colorScheme: "primary", isChecked: state.wizardData.postIsSameAsRead, onChange: handleOnToggleSame }),
            react_1.default.createElement(react_2.Text, null, "Same as read permissions"))),
        react_1.default.createElement(react_2.Stack, Object.assign({}, group, { w: "full", direction: { base: "column", md: "row" }, justifyContent: "center", alignItems: { base: "center", md: "normal" } }), Object.keys(CreateChatModal_1.ReadPostType).map((value) => {
            const radio = getRadioProps({ value });
            return (
            //@ts-ignore
            react_1.default.createElement(RadioCard_1.RadioCardWithAffordance, Object.assign({ key: value }, radio, { isChecked: selectedOption === value }),
                react_1.default.createElement(react_2.Flex, { h: "full", direction: { base: "row", md: "column" }, px: 4, py: { base: 2, md: 0 } },
                    react_1.default.createElement(react_2.Flex, { flexGrow: 1, h: "full", w: "full", direction: "column", textAlign: "left", position: "relative", gap: 4, top: {
                            base: 0,
                            md: -3,
                        } },
                        react_1.default.createElement(react_2.Text, { fontWeight: "bold", fontSize: "lg", pt: { base: 0, md: 4 } }, value),
                        react_1.default.createElement(react_2.Text, { fontSize: "xs" },
                            value === CreateChatModal_1.ReadPostType.Token &&
                                `Participants need to hold a certain amount of a token to ${permissionType} messages`,
                            value === CreateChatModal_1.ReadPostType.NFT &&
                                `Participants need to hold a NFT from a certain collection to ${permissionType} messages`)))));
        })),
        react_1.default.createElement(react_2.ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
            react_1.default.createElement(react_2.Button, { w: "full", onClick: onBack }, "Back"),
            react_1.default.createElement(react_2.Button, { w: "full", variant: "solid", onClick: onNext, isDisabled: !(selectedOption || state.wizardData.postIsSameAsRead) }, "Next"))));
};
exports.PermissionType = PermissionType;
//# sourceMappingURL=PermissionType.js.map
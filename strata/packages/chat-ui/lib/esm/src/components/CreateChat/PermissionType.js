import React, { useEffect, useState } from "react";
import { VStack, Box, Text, ButtonGroup, Button, useRadioGroup, Stack, Flex, Switch, HStack, } from "@chakra-ui/react";
import { RadioCardWithAffordance } from "../form/RadioCard";
import { CreateChatStep, ReadPostType, } from "./CreateChatModal";
export const PermissionType = ({ state, setState, defaultValue, permissionType, onBack, onNext, }) => {
    const isPostPermission = permissionType === "post";
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "readType",
        value: defaultValue,
        onChange: (x) => {
            setSelectedOption(x);
            setState({
                ...state,
                wizardData: {
                    ...state.wizardData,
                    postIsSameAsRead: false,
                    ...(isPostPermission
                        ? { postPermissions: undefined }
                        : { readPermissions: undefined }),
                },
            });
        },
    });
    const group = getRootProps();
    useEffect(() => {
        if (selectedOption) {
            setState({
                ...state,
                wizardData: {
                    ...state.wizardData,
                    [`${permissionType}Type`]: selectedOption,
                },
            });
        }
    }, [selectedOption, setState]);
    const handleOnToggleSame = (e) => {
        const isChecked = e.target.checked;
        setSelectedOption(undefined);
        setState({
            ...state,
            wizardData: {
                ...state.wizardData,
                postIsSameAsRead: isChecked,
                [`${permissionType}Type`]: undefined,
                ...(isChecked
                    ? { postForm: state.wizardData.readForm }
                    : { postForm: undefined }),
            },
        });
    };
    return (React.createElement(VStack, { w: "full", alignItems: "start", gap: 6, spacing: 0 },
        React.createElement(Box, null,
            React.createElement(Text, { fontWeight: "bold", fontSize: "md" },
                "Set your ",
                permissionType,
                " permissions."),
            React.createElement(Text, { fontSize: "xs", fontWeight: "normal" },
                "How do you want to gate ",
                permissionType,
                "ing messages in your chat?")),
        state.step === CreateChatStep.PostPermissionsType && (React.createElement(HStack, null,
            React.createElement(Switch, { size: "lg", colorScheme: "primary", isChecked: state.wizardData.postIsSameAsRead, onChange: handleOnToggleSame }),
            React.createElement(Text, null, "Same as read permissions"))),
        React.createElement(Stack, { ...group, w: "full", direction: { base: "column", md: "row" }, justifyContent: "center", alignItems: { base: "center", md: "normal" } }, Object.keys(ReadPostType).map((value) => {
            const radio = getRadioProps({ value });
            return (
            //@ts-ignore
            React.createElement(RadioCardWithAffordance, { key: value, ...radio, isChecked: selectedOption === value },
                React.createElement(Flex, { h: "full", direction: { base: "row", md: "column" }, px: 4, py: { base: 2, md: 0 } },
                    React.createElement(Flex, { flexGrow: 1, h: "full", w: "full", direction: "column", textAlign: "left", position: "relative", gap: 4, top: {
                            base: 0,
                            md: -3,
                        } },
                        React.createElement(Text, { fontWeight: "bold", fontSize: "lg", pt: { base: 0, md: 4 } }, value),
                        React.createElement(Text, { fontSize: "xs" },
                            value === ReadPostType.Token &&
                                `Participants need to hold a certain amount of a token to ${permissionType} messages`,
                            value === ReadPostType.NFT &&
                                `Participants need to hold a NFT from a certain collection to ${permissionType} messages`)))));
        })),
        React.createElement(ButtonGroup, { variant: "outline", colorScheme: "primary", w: "full" },
            React.createElement(Button, { w: "full", onClick: onBack }, "Back"),
            React.createElement(Button, { w: "full", variant: "solid", onClick: onNext, isDisabled: !(selectedOption || state.wizardData.postIsSameAsRead) }, "Next"))));
};
//# sourceMappingURL=PermissionType.js.map
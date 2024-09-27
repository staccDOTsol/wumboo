import { Box, Button, Center, HStack, Icon, Modal, ModalBody, ModalOverlay, ModalContent, Text, useColorModeValue, VStack, useRadioGroup, Stack, Flex, Divider, } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useErrorHandler, useSolOwnedAmount } from "@strata-foundation/react";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useAnalyticsEventTracker } from "../hooks/useAnalyticsEventTracker";
import { useLoadDelegate } from "../hooks/useLoadDelegate";
import { RadioCardWithAffordance } from "./form/RadioCard";
import { StrataIcon } from "../svg/Strata";
import { WalletIcon } from "../svg/Wallet";
import { LitProtocolWarning } from "./LitProtocolWarning";
const options = [
    {
        value: "0.02",
        heading: "~200",
        subHeading: "Messages",
    },
    {
        value: "0.05",
        heading: "~10,000",
        subHeading: "Messages",
    },
    {
        value: "0.1",
        heading: "~20,000",
        subHeading: "Messages",
    },
];
export const LoadWalletModal = (props) => {
    const { delegateWallet, loading: loadingDelegate, loadDelegate, error: delegateError, needsInit, needsTopOff, } = useLoadDelegate();
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const { publicKey } = useWallet();
    const { amount: solAmount } = useSolOwnedAmount(publicKey || undefined);
    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "options",
        defaultValue: options[0].value,
        onChange: setSelectedOption,
    });
    const group = getRootProps();
    const gaEventTracker = useAnalyticsEventTracker();
    const { handleErrors } = useErrorHandler();
    handleErrors(delegateError);
    const exec = async () => {
        await loadDelegate(+selectedOption);
        props.onLoaded();
        gaEventTracker({
            action: "Load Delegate Wallet",
            value: +selectedOption,
        });
    };
    const labelStyles = {
        mt: "2",
        ml: "-2.5",
        fontSize: "sm",
    };
    return (React.createElement(Modal, { isOpen: true, size: "xl", onClose: () => { }, isCentered: true, ...props },
        React.createElement(ModalOverlay, null),
        React.createElement(ModalContent, { borderRadius: "xl", shadow: "xl" },
            React.createElement(ModalBody, { p: 0 },
                React.createElement(Box, { position: "relative", p: 12, pt: 10, pb: 14, borderTopRadius: "lg", bg: useColorModeValue("gray.200", "gray.800") },
                    React.createElement(Center, null,
                        React.createElement(HStack, { spacing: 8 },
                            React.createElement(Icon, { as: AiOutlinePlus, w: "40px", h: "40px", color: "gray.600" }),
                            React.createElement(Icon, { as: WalletIcon, w: "80px", h: "80px" }))),
                    React.createElement(Icon, { w: "62px", h: "59px", position: "absolute", bottom: "-28px", right: "calc(50% - 31px)", as: StrataIcon })),
                React.createElement(VStack, { spacing: 6, align: "left", p: 12 },
                    React.createElement(VStack, { spacing: 2, align: "stretch" },
                        React.createElement(Text, { textAlign: "center", fontSize: "xl", fontWeight: "bold" }, "Let's load up your Chat Wallet"),
                        React.createElement(Text, { textAlign: "center", fontSize: "sm" }, "strata.im loads a hot wallet that acts as a delegate for your main wallet. This helps us avoid asking for approval for every message. Load it up with as many messages as you want now, you can always top it off later!"),
                        React.createElement(Stack, { ...group, direction: { base: "column", md: "row" }, justifyContent: "center", alignItems: { base: "center", md: "normal" } }, options.map(({ value, heading, subHeading }) => {
                            const radio = getRadioProps({
                                value,
                            });
                            return (
                            //@ts-ignore
                            React.createElement(RadioCardWithAffordance, { key: value, ...radio },
                                React.createElement(Flex, { h: "full", direction: { base: "row", md: "column" }, px: 4, py: { base: 2, md: 0 } },
                                    React.createElement(Flex, { flexGrow: 1, h: "full", w: "full", direction: "column", textAlign: "left", position: "relative", top: {
                                            base: 0,
                                            md: -3,
                                        } },
                                        React.createElement(Text, { fontWeight: "bold", fontSize: "lg", pt: { base: 0, md: 4 } }, heading),
                                        React.createElement(Text, { fontSize: "xs", color: "gray.500" }, subHeading),
                                        React.createElement(Box, { py: 2 },
                                            React.createElement(Divider, null)),
                                        React.createElement(Text, { fontSize: "md" },
                                            "\u25CE ",
                                            value,
                                            " SOL")))));
                        }))),
                    React.createElement(LitProtocolWarning, null),
                    React.createElement(Button, { isDisabled: solAmount < +selectedOption, mt: 4, variant: "solid", colorScheme: "primary", onClick: () => exec(), loadingText: "Loading Hot Wallet...", isLoading: loadingDelegate }, solAmount < +selectedOption
                        ? "Not enough SOL"
                        : needsInit
                            ? "Create Hot Wallet"
                            : "Load Hot Wallet"))))));
};
//# sourceMappingURL=LoadWalletModal.js.map
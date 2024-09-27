import { Box, Button, Center, HStack, Icon, Modal, ModalBody, ModalContent, ModalOverlay, Text, VStack, } from "@chakra-ui/react";
import { useErrorHandler } from "@strata-foundation/react";
import React, { useEffect, useState } from "react";
import { useAsyncCallback } from "react-async-hook";
import { AiOutlinePlus } from "react-icons/ai";
import { useChatSdk } from "../contexts/chatSdk";
import { delegateWalletStorage, useDelegateWallet, } from "../hooks/useDelegateWallet";
import { StrataIcon } from "../svg/Strata";
import { WalletIcon } from "../svg/Wallet";
import { LitProtocolWarning } from "./LitProtocolWarning";
async function migrate(mnemonic, chatSdk) {
    if (mnemonic && chatSdk) {
        await chatSdk?.initializeSettings({
            settings: {
                delegateWalletSeed: mnemonic,
            },
        });
        localStorage.removeItem(delegateWalletStorage.storageKey(chatSdk.provider.wallet.publicKey));
    }
}
const DARK_BG = { bg: "gray.800" };
export const LegacyWalletMigrationModal = () => {
    const { legacyMnemonic } = useDelegateWallet();
    const { chatSdk } = useChatSdk();
    const { handleErrors } = useErrorHandler();
    const [isOpen, setIsOpen] = useState(false);
    const { execute: exec, loading: migrating, error, } = useAsyncCallback(migrate);
    handleErrors(error);
    useEffect(() => {
        if (legacyMnemonic) {
            setIsOpen(true);
        }
    }, [legacyMnemonic]);
    if (legacyMnemonic) {
        return (React.createElement(Modal, { size: "xl", isOpen: isOpen, onClose: () => { }, isCentered: true },
            React.createElement(ModalOverlay, null),
            React.createElement(ModalContent, { borderRadius: "xl", shadow: "xl" },
                React.createElement(ModalBody, { p: 0 },
                    React.createElement(Box, { position: "relative", p: 12, pt: 10, pb: 14, borderTopRadius: "lg", bg: "gray.200", _dark: DARK_BG },
                        React.createElement(Center, null,
                            React.createElement(HStack, { spacing: 8 },
                                React.createElement(Icon, { as: AiOutlinePlus, w: "40px", h: "40px", color: "gray.600" }),
                                React.createElement(Icon, { as: WalletIcon, w: "80px", h: "80px" }))),
                        React.createElement(Icon, { w: "62px", h: "59px", position: "absolute", bottom: "-28px", right: "calc(50% - 31px)", as: StrataIcon })),
                    React.createElement(VStack, { spacing: 6, align: "left", p: 12 },
                        React.createElement(Text, { textAlign: "center", fontSize: "xl", fontWeight: "bold" }, "Migrate chat wallet with Lit Protocol"),
                        React.createElement(LitProtocolWarning, null),
                        React.createElement(Button, { variant: "solid", colorScheme: "primary", onClick: async () => {
                                await exec(legacyMnemonic, chatSdk);
                                setIsOpen(false);
                            }, loadingText: "Migrating...", isLoading: migrating }, "Migrate"))))));
    }
    return React.createElement("div", null);
};
//# sourceMappingURL=LegacyWalletMigrationModal.js.map
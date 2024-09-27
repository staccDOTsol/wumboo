import { Button, HStack, Icon, IconButton, Image, Menu, MenuButton, MenuDivider, MenuItem, MenuItemOption, MenuList, MenuOptionGroup, Text, useColorModeValue, useDisclosure, } from "@chakra-ui/react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useEndpoint } from "@strata-foundation/react";
import React, { useCallback } from "react";
import { BsCaretDownFill, BsFillPersonFill } from "react-icons/bs";
import { useWalletProfile } from "../hooks/useWalletProfile";
import { useUsernameFromIdentifierCertificate } from "../hooks/useUsernameFromIdentifierCertificate";
import { CreateProfileModal } from "./CreateProfileModal";
export const ProfileButton = ({ children = "Select Wallet", onClick, ...props }) => {
    const { disconnect, connected, publicKey } = useWallet();
    const disconnectAndClear = useCallback(() => {
        disconnect();
        localStorage.removeItem("lit-auth-sol-signature");
    }, [disconnect]);
    const { visible, setVisible } = useWalletModal();
    const { info: profile } = useWalletProfile(publicKey || undefined);
    const { username } = useUsernameFromIdentifierCertificate(profile?.identifierCertificateMint, profile?.ownerWallet);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = useCallback((event) => {
        if (onClick)
            onClick(event);
        if (!event.defaultPrevented) {
            if (connected) {
                onOpen();
            }
            else {
                setVisible(!visible);
            }
        }
    }, [onClick, visible, setVisible, connected, onOpen]);
    const { cluster, setClusterOrEndpoint } = useEndpoint();
    return (React.createElement(React.Fragment, null,
        React.createElement(HStack, { w: "full", gap: 0, spacing: 0 },
            React.createElement(CreateProfileModal, { onClose: onClose, isOpen: isOpen }),
            React.createElement(Button, { w: "full", m: 0, variant: "ghost", justifyContent: "start", color: useColorModeValue("black", "white"), borderColor: "gray.500", size: props.size || "lg", ...props, onClick: handleClick, borderTopRadius: 0, borderRightRadius: 0, _hover: {
                    backgroundColor: "gray.200",
                    _dark: {
                        backgroundColor: "gray.800",
                    },
                } },
                profile ? (
                // Can't use Avatar here because in CreateProfile we change image.src to cause a reload
                React.createElement(Image, { alt: "", m: 1, borderRadius: "full", boxSize: "36px", src: profile.imageUrl })) : (React.createElement(Icon, { m: 1, w: "16px", h: "16px", as: BsFillPersonFill })),
                React.createElement(Text, { m: 1 }, connected ? (profile ? username : "Create Profile") : children)),
            React.createElement(Menu, { isLazy: true },
                React.createElement(MenuButton, { w: 20, size: props.size || "lg", as: IconButton, color: useColorModeValue("black", "white"), variant: "ghost", borderColor: "primary.500", borderRadius: 0, "aria-label": "Network", icon: React.createElement(Icon, { w: "24px", h: "24px", as: BsCaretDownFill }) }),
                React.createElement(MenuList, { backgroundColor: useColorModeValue("white", "black.300"), borderColor: "black.500" },
                    React.createElement(MenuOptionGroup, { title: "Network", type: "radio", onChange: (e) => setClusterOrEndpoint(e), value: cluster },
                        React.createElement(MenuItemOption, { value: WalletAdapterNetwork.Mainnet, _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" } }, "Mainnet"),
                        React.createElement(MenuItemOption, { _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" }, value: WalletAdapterNetwork.Devnet }, "Devnet"),
                        React.createElement(MenuItemOption, { _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" }, value: "localnet" }, "Localnet")),
                    React.createElement(MenuDivider, null),
                    React.createElement(MenuItem, { onClick: disconnectAndClear, _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" } }, "Disconnect"))))));
};
//# sourceMappingURL=ProfileButton.js.map
import React from "react";
import { Button, Modal, ModalBody, ModalContent, ModalOverlay, ModalHeader, Spinner, useDisclosure, Alert, } from "@chakra-ui/react";
import { Swap, useTokenBonding, useTokenBondingKey, useTokenMetadata, } from "@strata-foundation/react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useWallet } from "@solana/wallet-adapter-react";
const DefaultTrigger = ({ onClick, connected, mint, btnProps, }) => {
    const { metadata } = useTokenMetadata(mint);
    return (React.createElement(Button, { size: "sm", colorScheme: "primary", variant: "outline", onClick: onClick, ...btnProps }, connected ? `Buy More ${metadata?.data.symbol}` : "Connect Wallet"));
};
export function BuyMoreButton({ mint, trigger = DefaultTrigger, btnProps, }) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { connected } = useWallet();
    const { result: tokenBondingKey, loading } = useTokenBondingKey(mint, 0);
    const { setVisible } = useWalletModal();
    const { metadata } = useTokenMetadata(mint);
    const { account, loading: loadingBonding } = useTokenBonding(tokenBondingKey);
    function onClick() {
        if (!connected)
            setVisible(true);
        else {
            if (!account && !loadingBonding) {
                window.open(`https://jup.ag/swap/SOL-${metadata?.data.symbol.toUpperCase()}`);
            }
            else {
                onToggle();
            }
        }
    }
    return (React.createElement(React.Fragment, null,
        trigger({ mint, connected, onClick, btnProps }),
        React.createElement(Modal, { isOpen: isOpen, onClose: onClose, size: "2xl", isCentered: true, trapFocus: true },
            React.createElement(ModalOverlay, null),
            React.createElement(ModalContent, { borderRadius: "xl", shadow: "xl" },
                React.createElement(ModalHeader, null,
                    "Buy More ",
                    metadata?.data.symbol),
                React.createElement(ModalBody, { minH: "500px" },
                    !account && !loadingBonding && (React.createElement(Alert, { status: "info" }, "Buy is not yet supported for this token")),
                    account && !loadingBonding && tokenBondingKey && (React.createElement(Swap, { id: mint, onConnectWallet: () => {
                            onClose();
                            setVisible(true);
                        } })),
                    loading && React.createElement(Spinner, null))))));
}
//# sourceMappingURL=BuyMoreButton.js.map
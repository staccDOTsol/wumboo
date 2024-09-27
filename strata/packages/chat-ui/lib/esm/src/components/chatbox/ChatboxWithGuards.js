import { Avatar, Flex, Box, Button, Divider, HStack, Text, useDisclosure, VStack, } from "@chakra-ui/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { roundToDecimals, useErrorHandler, useMint, useTokenMetadata, } from "@strata-foundation/react";
import { toNumber } from "@strata-foundation/spl-token-bonding";
import { useChatPermissionsFromChat } from "../../hooks/useChatPermissionsFromChat";
import React from "react";
import { useLoadDelegate } from "../../hooks/useLoadDelegate";
import { useChatOwnedAmounts } from "../../hooks/useChatOwnedAmounts";
import { BuyMoreButton } from "../BuyMoreButton";
import { LoadWalletModal } from "../LoadWalletModal";
import { Chatbox } from "./Chatbox";
import { NATIVE_MINT } from "@solana/spl-token";
const DARK_BG = {
    bg: "linear-gradient(0deg, rgba(17,24,39) 40%, rgba(21,24,38,0) 100%)",
};
export function ChatboxWithGuards({ chatKey, onAddPendingMessage, files, setFiles, onUploadFile, }) {
    const { isOpen: loadWalletIsOpen, onOpen: onOpenLoadWallet, onClose: onCloseLoadWallet, } = useDisclosure();
    const { connected, publicKey } = useWallet();
    const { setVisible } = useWalletModal();
    const { delegateWallet, needsTopOff, needsInit, loading: loadingDelegate, error: delegateError, } = useLoadDelegate();
    const { isOpen: delegateIsOpen, onClose: closeDelegate, onOpen: openDelegate, } = useDisclosure({
        defaultIsOpen: false,
    });
    const { handleErrors } = useErrorHandler();
    const { info: chatPermissions } = useChatPermissionsFromChat(chatKey);
    const readMintKey = chatPermissions?.readPermissionKey;
    const postMintKey = chatPermissions?.postPermissionKey;
    const readMint = useMint(readMintKey);
    const postMint = useMint(postMintKey);
    const { metadata: readMetadata, image: readImage } = useTokenMetadata(readMintKey);
    const { metadata: postMetadata, image: postImage } = useTokenMetadata(postMintKey);
    const { ownedReadAmount, ownedPostAmount, isSame } = useChatOwnedAmounts(publicKey || undefined, chatKey);
    const postAmount = chatPermissions?.postPermissionAmount &&
        postMint &&
        toNumber(chatPermissions?.postPermissionAmount, postMint);
    const hasEnough = typeof postAmount == "undefined" ||
        typeof ownedPostAmount == "undefined" ||
        ownedPostAmount >= postAmount;
    handleErrors(delegateError);
    return (React.createElement(Flex, { w: "full", position: "relative" }, !connected || !hasEnough || needsTopOff ? (React.createElement(Flex, { position: "absolute", bottom: "0", pb: 12, pt: 40, w: "full", justify: "center", bg: "linear-gradient(0deg, rgba(255,255,255) 40%, rgba(255,255,255,0) 100%)", _dark: DARK_BG },
        React.createElement(VStack, { w: "full", h: "full", justify: "center", align: "center", maxW: "360px" }, !connected ? (React.createElement(React.Fragment, null,
            React.createElement(Button, { size: "md", colorScheme: "primary", onClick: () => setVisible(true), px: 16 }, "Connect Wallet"))) : !hasEnough ? (React.createElement(React.Fragment, null,
            React.createElement(Text, { fontWeight: "bold", align: "center" }, "In order to participate in this chat:"),
            React.createElement(Box, { w: "full", fontSize: "sm" },
                readMetadata && (React.createElement(HStack, { spacing: 1 },
                    React.createElement(Text, null, "Read Message"),
                    React.createElement(Flex, { grow: 1 },
                        React.createElement(Divider, { variant: "dashed" })),
                    React.createElement(Text, { fontWeight: "bold", textTransform: "capitalize" },
                        "Hold",
                        " ",
                        chatPermissions?.defaultReadPermissionAmount &&
                            readMint &&
                            roundToDecimals(toNumber(chatPermissions.defaultReadPermissionAmount, readMint), 4)),
                    React.createElement(Avatar, { w: "18px", h: "18px", title: readMetadata?.data.symbol, src: readImage }))),
                postMetadata && (React.createElement(HStack, { spacing: 1 },
                    React.createElement(Text, null, "Post Message"),
                    React.createElement(Flex, { grow: 1 },
                        React.createElement(Divider, { variant: "dashed" })),
                    React.createElement(Text, { fontWeight: "bold", textTransform: "capitalize" },
                        Object.keys(chatPermissions?.postPermissionAction || {})[0],
                        " ",
                        chatPermissions?.postPermissionAmount &&
                            postMint &&
                            roundToDecimals(toNumber(chatPermissions.postPermissionAmount, postMint), 4)),
                    React.createElement(Avatar, { w: "18px", h: "18px", title: postMetadata?.data.symbol, src: postImage })))),
            React.createElement(Box, { w: "full", fontSize: "sm" },
                readMetadata && (React.createElement(HStack, { spacing: 1 },
                    React.createElement(Text, null, "You currently have"),
                    React.createElement(Flex, { grow: 1 },
                        React.createElement(Divider, { variant: "dashed" })),
                    React.createElement(Text, { fontWeight: "bold", textTransform: "capitalize" }, ownedReadAmount
                        ? roundToDecimals(ownedReadAmount, 4)
                        : 0),
                    React.createElement(Avatar, { w: "18px", h: "18px", title: readMetadata?.data.symbol, src: readImage }))),
                !isSame && postMetadata && (React.createElement(HStack, { spacing: 1 },
                    React.createElement(Text, null, "You currently have"),
                    React.createElement(Flex, { grow: 1 },
                        React.createElement(Divider, { variant: "dashed" })),
                    React.createElement(Text, { fontWeight: "bold", textTransform: "capitalize" }, ownedPostAmount
                        ? roundToDecimals(ownedPostAmount, 4)
                        : 0),
                    React.createElement(Avatar, { w: "18px", h: "18px", title: postMetadata?.data.symbol, src: postImage })))),
            React.createElement(Box, { pt: 4 },
                React.createElement(BuyMoreButton, { mint: chatPermissions?.readPermissionKey, btnProps: { px: 16, size: "md", variant: "solid" } }),
                !isSame &&
                    chatPermissions &&
                    !NATIVE_MINT.equals(chatPermissions?.postPermissionKey) && (React.createElement(BuyMoreButton, { mint: chatPermissions?.postPermissionKey, btnProps: { px: 16, size: "md", variant: "solid" } }))))) : needsTopOff ? (React.createElement(React.Fragment, null,
            React.createElement(LoadWalletModal, { isOpen: loadWalletIsOpen, onClose: onCloseLoadWallet, onLoaded: () => onCloseLoadWallet() }),
            React.createElement(Flex, { justify: "center", mb: "6px" },
                React.createElement(Button, { isLoading: loadingDelegate, size: "md", colorScheme: "primary", onClick: () => onOpenLoadWallet(), px: 16 }, "Top Off Chat Wallet")))) : null))) : (React.createElement(VStack, { w: "full" },
        !delegateWallet && (React.createElement(HStack, { mb: -3, mt: 1, fontSize: "sm" },
            React.createElement(Text, { fontWeight: "bold" }, "Tired of approving transactions?"),
            React.createElement(Button, { fontSize: "sm", variant: "link", size: "md", colorScheme: "primary", onClick: () => openDelegate(), px: 16 }, "Load Delegate Wallet"))),
        (needsTopOff || needsInit) && (React.createElement(LoadWalletModal, { isOpen: delegateIsOpen, onClose: closeDelegate, onLoaded: closeDelegate })),
        React.createElement(Chatbox, { chatKey: chatKey, onAddPendingMessage: onAddPendingMessage, files: files, setFiles: setFiles, onUploadFile: onUploadFile })))));
}
//# sourceMappingURL=ChatboxWithGuards.js.map
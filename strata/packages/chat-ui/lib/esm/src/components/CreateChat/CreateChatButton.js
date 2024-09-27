import React from "react";
import { IconButton, Icon, useDisclosure, } from "@chakra-ui/react";
import { RiMenuAddLine } from "react-icons/ri";
import { useWallet } from "@solana/wallet-adapter-react";
import { useErrorHandler } from "@strata-foundation/react";
import { CreateChatModal } from "./CreateChatModal";
import { useLoadDelegate } from "../../hooks/useLoadDelegate";
export const CreateChatButton = (props) => {
    const { connected } = useWallet();
    const { needsInit, error: delegateError } = useLoadDelegate();
    const { handleErrors } = useErrorHandler();
    const { isOpen, onOpen, onClose } = useDisclosure();
    handleErrors(delegateError);
    const handleOnClick = (e) => {
        props.onClick && props.onClick(e);
        onOpen();
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(IconButton, { ...props, disabled: !connected || needsInit, icon: React.createElement(Icon, { as: RiMenuAddLine }), onClick: handleOnClick }),
        React.createElement(CreateChatModal, { isOpen: isOpen, onClose: onClose })));
};
//# sourceMappingURL=CreateChatButton.js.map
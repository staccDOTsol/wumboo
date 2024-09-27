"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateChatButton = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const ri_1 = require("react-icons/ri");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_3 = require("@strata-foundation/react");
const CreateChatModal_1 = require("./CreateChatModal");
const useLoadDelegate_1 = require("../../hooks/useLoadDelegate");
const CreateChatButton = (props) => {
    const { connected } = (0, wallet_adapter_react_1.useWallet)();
    const { needsInit, error: delegateError } = (0, useLoadDelegate_1.useLoadDelegate)();
    const { handleErrors } = (0, react_3.useErrorHandler)();
    const { isOpen, onOpen, onClose } = (0, react_2.useDisclosure)();
    handleErrors(delegateError);
    const handleOnClick = (e) => {
        props.onClick && props.onClick(e);
        onOpen();
    };
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_2.IconButton, Object.assign({}, props, { disabled: !connected || needsInit, icon: react_1.default.createElement(react_2.Icon, { as: ri_1.RiMenuAddLine }), onClick: handleOnClick })),
        react_1.default.createElement(CreateChatModal_1.CreateChatModal, { isOpen: isOpen, onClose: onClose })));
};
exports.CreateChatButton = CreateChatButton;
//# sourceMappingURL=CreateChatButton.js.map
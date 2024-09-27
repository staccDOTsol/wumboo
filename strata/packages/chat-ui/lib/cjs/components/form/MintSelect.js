"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MintSelect = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_3 = require("@strata-foundation/react");
const react_4 = require("react");
const ai_1 = require("react-icons/ai");
const MintSelect = ({ value, onChange, }) => {
    const { isOpen, onClose, onOpen } = (0, react_2.useDisclosure)();
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const escFunction = (0, react_4.useCallback)((e) => {
        if (e.key === "Escape") {
            e.preventDefault();
            e.stopPropagation();
            onClose();
        }
    }, []);
    const { info: tokenRef } = (0, react_3.usePrimaryClaimedTokenRef)(publicKey);
    const inputBg = { bg: "gray.200", _dark: { bg: "gray.800" } };
    const backgroundColor = (0, react_2.useColorModeValue)("gray.200", "gray.800");
    (0, react_4.useEffect)(() => {
        document.addEventListener("keydown", escFunction, true);
        return () => {
            document.removeEventListener("keydown", escFunction, true);
        };
    }, []);
    return !isOpen ? (react_1.default.createElement(react_1.default.Fragment, null,
        tokenRef && (react_1.default.createElement(react_2.Button, { variant: "link", onClick: () => onChange(tokenRef.mint.toBase58()) }, "Use my Social Token")),
        react_1.default.createElement(react_2.InputGroup, { size: "md", variant: "filled" },
            react_1.default.createElement(react_2.Input, Object.assign({ value: value || "", onChange: (e) => onChange(e.target.value), fontSize: "sm" }, inputBg)),
            react_1.default.createElement(react_2.InputRightElement, { width: "5.5rem" },
                react_1.default.createElement(react_2.Button, { isDisabled: !publicKey, h: "1.75rem", size: "sm", onClick: () => (isOpen ? onClose() : onOpen()) },
                    react_1.default.createElement(react_2.Icon, { as: ai_1.AiOutlineSearch }),
                    publicKey ? "Wallet" : "No Wallet"))))) : (react_1.default.createElement(react_2.Box, Object.assign({}, inputBg),
        react_1.default.createElement(react_3.TokenSearch, { includeSol: true, resultsStackProps: {
                zIndex: 1000,
                position: "absolute",
                rounded: "lg",
                shadow: "lg",
                maxHeight: "400px",
                overflow: "auto",
                backgroundColor,
                top: "90px",
            }, placeholder: "Press Escape to Close", onSelect: (t) => {
                var _a;
                const mint = (_a = t.account) === null || _a === void 0 ? void 0 : _a.mint;
                if (mint) {
                    onChange(mint.toBase58());
                    onClose();
                }
            } })));
};
exports.MintSelect = MintSelect;
//# sourceMappingURL=MintSelect.js.map
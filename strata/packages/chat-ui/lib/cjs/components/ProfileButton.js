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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileButton = void 0;
const react_1 = require("@chakra-ui/react");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const bs_1 = require("react-icons/bs");
const useWalletProfile_1 = require("../hooks/useWalletProfile");
const useUsernameFromIdentifierCertificate_1 = require("../hooks/useUsernameFromIdentifierCertificate");
const CreateProfileModal_1 = require("./CreateProfileModal");
const ProfileButton = (_a) => {
    var { children = "Select Wallet", onClick } = _a, props = __rest(_a, ["children", "onClick"]);
    const { disconnect, connected, publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const disconnectAndClear = (0, react_3.useCallback)(() => {
        disconnect();
        localStorage.removeItem("lit-auth-sol-signature");
    }, [disconnect]);
    const { visible, setVisible } = (0, wallet_adapter_react_ui_1.useWalletModal)();
    const { info: profile } = (0, useWalletProfile_1.useWalletProfile)(publicKey || undefined);
    const { username } = (0, useUsernameFromIdentifierCertificate_1.useUsernameFromIdentifierCertificate)(profile === null || profile === void 0 ? void 0 : profile.identifierCertificateMint, profile === null || profile === void 0 ? void 0 : profile.ownerWallet);
    const { isOpen, onOpen, onClose } = (0, react_1.useDisclosure)();
    const handleClick = (0, react_3.useCallback)((event) => {
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
    const { cluster, setClusterOrEndpoint } = (0, react_2.useEndpoint)();
    return (react_3.default.createElement(react_3.default.Fragment, null,
        react_3.default.createElement(react_1.HStack, { w: "full", gap: 0, spacing: 0 },
            react_3.default.createElement(CreateProfileModal_1.CreateProfileModal, { onClose: onClose, isOpen: isOpen }),
            react_3.default.createElement(react_1.Button, Object.assign({ w: "full", m: 0, variant: "ghost", justifyContent: "start", color: (0, react_1.useColorModeValue)("black", "white"), borderColor: "gray.500", size: props.size || "lg" }, props, { onClick: handleClick, borderTopRadius: 0, borderRightRadius: 0, _hover: {
                    backgroundColor: "gray.200",
                    _dark: {
                        backgroundColor: "gray.800",
                    },
                } }),
                profile ? (
                // Can't use Avatar here because in CreateProfile we change image.src to cause a reload
                react_3.default.createElement(react_1.Image, { alt: "", m: 1, borderRadius: "full", boxSize: "36px", src: profile.imageUrl })) : (react_3.default.createElement(react_1.Icon, { m: 1, w: "16px", h: "16px", as: bs_1.BsFillPersonFill })),
                react_3.default.createElement(react_1.Text, { m: 1 }, connected ? (profile ? username : "Create Profile") : children)),
            react_3.default.createElement(react_1.Menu, { isLazy: true },
                react_3.default.createElement(react_1.MenuButton, { w: 20, size: props.size || "lg", as: react_1.IconButton, color: (0, react_1.useColorModeValue)("black", "white"), variant: "ghost", borderColor: "primary.500", borderRadius: 0, "aria-label": "Network", icon: react_3.default.createElement(react_1.Icon, { w: "24px", h: "24px", as: bs_1.BsCaretDownFill }) }),
                react_3.default.createElement(react_1.MenuList, { backgroundColor: (0, react_1.useColorModeValue)("white", "black.300"), borderColor: "black.500" },
                    react_3.default.createElement(react_1.MenuOptionGroup, { title: "Network", type: "radio", onChange: (e) => setClusterOrEndpoint(e), value: cluster },
                        react_3.default.createElement(react_1.MenuItemOption, { value: wallet_adapter_base_1.WalletAdapterNetwork.Mainnet, _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" } }, "Mainnet"),
                        react_3.default.createElement(react_1.MenuItemOption, { _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" }, value: wallet_adapter_base_1.WalletAdapterNetwork.Devnet }, "Devnet"),
                        react_3.default.createElement(react_1.MenuItemOption, { _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" }, value: "localnet" }, "Localnet")),
                    react_3.default.createElement(react_1.MenuDivider, null),
                    react_3.default.createElement(react_1.MenuItem, { onClick: disconnectAndClear, _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" } }, "Disconnect"))))));
};
exports.ProfileButton = ProfileButton;
//# sourceMappingURL=ProfileButton.js.map
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadWalletModal = void 0;
const react_1 = require("@chakra-ui/react");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const ai_1 = require("react-icons/ai");
const useAnalyticsEventTracker_1 = require("../hooks/useAnalyticsEventTracker");
const useLoadDelegate_1 = require("../hooks/useLoadDelegate");
const RadioCard_1 = require("./form/RadioCard");
const Strata_1 = require("../svg/Strata");
const Wallet_1 = require("../svg/Wallet");
const LitProtocolWarning_1 = require("./LitProtocolWarning");
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
const LoadWalletModal = (props) => {
    const { delegateWallet, loading: loadingDelegate, loadDelegate, error: delegateError, needsInit, needsTopOff, } = (0, useLoadDelegate_1.useLoadDelegate)();
    const [selectedOption, setSelectedOption] = (0, react_3.useState)(options[0].value);
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { amount: solAmount } = (0, react_2.useSolOwnedAmount)(publicKey || undefined);
    const { getRootProps, getRadioProps } = (0, react_1.useRadioGroup)({
        name: "options",
        defaultValue: options[0].value,
        onChange: setSelectedOption,
    });
    const group = getRootProps();
    const gaEventTracker = (0, useAnalyticsEventTracker_1.useAnalyticsEventTracker)();
    const { handleErrors } = (0, react_2.useErrorHandler)();
    handleErrors(delegateError);
    const exec = () => __awaiter(void 0, void 0, void 0, function* () {
        yield loadDelegate(+selectedOption);
        props.onLoaded();
        gaEventTracker({
            action: "Load Delegate Wallet",
            value: +selectedOption,
        });
    });
    const labelStyles = {
        mt: "2",
        ml: "-2.5",
        fontSize: "sm",
    };
    return (react_3.default.createElement(react_1.Modal, Object.assign({ isOpen: true, size: "xl", onClose: () => { }, isCentered: true }, props),
        react_3.default.createElement(react_1.ModalOverlay, null),
        react_3.default.createElement(react_1.ModalContent, { borderRadius: "xl", shadow: "xl" },
            react_3.default.createElement(react_1.ModalBody, { p: 0 },
                react_3.default.createElement(react_1.Box, { position: "relative", p: 12, pt: 10, pb: 14, borderTopRadius: "lg", bg: (0, react_1.useColorModeValue)("gray.200", "gray.800") },
                    react_3.default.createElement(react_1.Center, null,
                        react_3.default.createElement(react_1.HStack, { spacing: 8 },
                            react_3.default.createElement(react_1.Icon, { as: ai_1.AiOutlinePlus, w: "40px", h: "40px", color: "gray.600" }),
                            react_3.default.createElement(react_1.Icon, { as: Wallet_1.WalletIcon, w: "80px", h: "80px" }))),
                    react_3.default.createElement(react_1.Icon, { w: "62px", h: "59px", position: "absolute", bottom: "-28px", right: "calc(50% - 31px)", as: Strata_1.StrataIcon })),
                react_3.default.createElement(react_1.VStack, { spacing: 6, align: "left", p: 12 },
                    react_3.default.createElement(react_1.VStack, { spacing: 2, align: "stretch" },
                        react_3.default.createElement(react_1.Text, { textAlign: "center", fontSize: "xl", fontWeight: "bold" }, "Let's load up your Chat Wallet"),
                        react_3.default.createElement(react_1.Text, { textAlign: "center", fontSize: "sm" }, "strata.im loads a hot wallet that acts as a delegate for your main wallet. This helps us avoid asking for approval for every message. Load it up with as many messages as you want now, you can always top it off later!"),
                        react_3.default.createElement(react_1.Stack, Object.assign({}, group, { direction: { base: "column", md: "row" }, justifyContent: "center", alignItems: { base: "center", md: "normal" } }), options.map(({ value, heading, subHeading }) => {
                            const radio = getRadioProps({
                                value,
                            });
                            return (
                            //@ts-ignore
                            react_3.default.createElement(RadioCard_1.RadioCardWithAffordance, Object.assign({ key: value }, radio),
                                react_3.default.createElement(react_1.Flex, { h: "full", direction: { base: "row", md: "column" }, px: 4, py: { base: 2, md: 0 } },
                                    react_3.default.createElement(react_1.Flex, { flexGrow: 1, h: "full", w: "full", direction: "column", textAlign: "left", position: "relative", top: {
                                            base: 0,
                                            md: -3,
                                        } },
                                        react_3.default.createElement(react_1.Text, { fontWeight: "bold", fontSize: "lg", pt: { base: 0, md: 4 } }, heading),
                                        react_3.default.createElement(react_1.Text, { fontSize: "xs", color: "gray.500" }, subHeading),
                                        react_3.default.createElement(react_1.Box, { py: 2 },
                                            react_3.default.createElement(react_1.Divider, null)),
                                        react_3.default.createElement(react_1.Text, { fontSize: "md" },
                                            "\u25CE ",
                                            value,
                                            " SOL")))));
                        }))),
                    react_3.default.createElement(LitProtocolWarning_1.LitProtocolWarning, null),
                    react_3.default.createElement(react_1.Button, { isDisabled: solAmount < +selectedOption, mt: 4, variant: "solid", colorScheme: "primary", onClick: () => exec(), loadingText: "Loading Hot Wallet...", isLoading: loadingDelegate }, solAmount < +selectedOption
                        ? "Not enough SOL"
                        : needsInit
                            ? "Create Hot Wallet"
                            : "Load Hot Wallet"))))));
};
exports.LoadWalletModal = LoadWalletModal;
//# sourceMappingURL=LoadWalletModal.js.map
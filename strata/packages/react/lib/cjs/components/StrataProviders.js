"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrataProviders = void 0;
// @ts-nocheck
const react_1 = __importDefault(require("react"));
const accountContext_1 = require("../contexts/accountContext");
const errorHandlerContext_1 = require("../contexts/errorHandlerContext");
const providerContext_1 = require("../contexts/providerContext");
const strataSdkContext_1 = require("../contexts/strataSdkContext");
const theme_1 = require("../contexts/theme");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_2 = require("@solana/wallet-adapter-react");
const defaultOnError = (error) => console.log(error);
const StrataProviders = ({ children, onError = defaultOnError, resetCSS = false, }) => (react_1.default.createElement(theme_1.ThemeProvider, { resetCSS: resetCSS },
    react_1.default.createElement(errorHandlerContext_1.ErrorHandlerProvider, { onError: onError },
        react_1.default.createElement(wallet_adapter_react_1.ConnectionProvider, { endpoint: "https://rpc.ironforge.network/mainnet?apiKey=01HRZ9G6Z2A19FY8PR4RF4J4PW" },
            react_1.default.createElement(wallet_adapter_react_2.WalletProvider, { wallets: [], autoConnect: true },
                react_1.default.createElement(providerContext_1.ProviderContextProvider, null,
                    react_1.default.createElement(accountContext_1.AccountProvider, { commitment: "confirmed" },
                        react_1.default.createElement(strataSdkContext_1.StrataSdksProvider, null, children))))))));
exports.StrataProviders = StrataProviders;
//# sourceMappingURL=StrataProviders.js.map
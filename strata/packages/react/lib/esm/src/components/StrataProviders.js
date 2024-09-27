// @ts-nocheck
import React from "react";
import { AccountProvider } from "../contexts/accountContext";
import { ErrorHandlerProvider } from "../contexts/errorHandlerContext";
import { ProviderContextProvider } from "../contexts/providerContext";
import { StrataSdksProvider } from "../contexts/strataSdkContext";
import { ThemeProvider } from "../contexts/theme";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { WalletProvider } from "@solana/wallet-adapter-react";
const defaultOnError = (error) => console.log(error);
export const StrataProviders = ({ children, onError = defaultOnError, resetCSS = false, }) => (React.createElement(ThemeProvider, { resetCSS: resetCSS },
    React.createElement(ErrorHandlerProvider, { onError: onError },
        React.createElement(ConnectionProvider, { endpoint: "https://rpc.ironforge.network/mainnet?apiKey=01HRZ9G6Z2A19FY8PR4RF4J4PW" },
            React.createElement(WalletProvider, { wallets: [], autoConnect: true },
                React.createElement(ProviderContextProvider, null,
                    React.createElement(AccountProvider, { commitment: "confirmed" },
                        React.createElement(StrataSdksProvider, null, children))))))));
//# sourceMappingURL=StrataProviders.js.map
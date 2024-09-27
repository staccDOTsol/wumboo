import React, { useMemo, useCallback } from "react";
import toast from "react-hot-toast";
import {
  WALLET_PROVIDERS,
  wumboApi,
  ThemeProvider,
  Notification,
  SOLANA_API_URL,
  ConfigProvider,
  GET_TOKEN_ENDPOINT,
} from "wumbo-common";
import {
  AccountProvider,
  SolPriceProvider,
  ErrorHandlerProvider,
  StrataSdksProvider,
  ProviderContextProvider,
} from "@strata-foundation/react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { ApolloProvider } from "@apollo/client";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { MarketplaceSdkProvider } from "@strata-foundation/marketplace-ui";

export const getToken = (endpoint: string) => async () => {
  if (endpoint.includes("genesysgo")) {
    const req = await fetch(GET_TOKEN_ENDPOINT!);
    const { access_token }: { access_token: string } = await req.json();
    return access_token;
  }

  return "";
};

export const ContextProviders: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wallets = useMemo(() => WALLET_PROVIDERS, []);

  const onError = useCallback((error: Error) => {
    console.error(error);
    if (
      error.message.includes(
        "Attempt to debit an account but found no record of a prior credit."
      )
    ) {
      error = new Error("Not enough SOL to perform this action");
    }

    const code = (error.message.match("custom program error: (.*)") || [])[1];
    if (code === "0x1") {
      error = new Error("Insufficient balance.");
    } else if (code === "0x136") {
      error = new Error("Purchased more than the cap of 100 bWUM");
    } else if (code === "0x0") {
      error = new Error("Blockhash expired. Please retry");
    }

    toast.custom((t) => (
      <Notification
        type="error"
        show={t.visible}
        heading={error.name}
        // @ts-ignore
        message={error.message || error.msg || error.toString()}
        onDismiss={() => toast.dismiss(t.id)}
      />
    ));
  }, []);

  return (
      <ConnectionProvider
        endpoint={"https://rpc.ironforge.network/mainnet?apiKey=01HRZ9G6Z2A19FY8PR4RF4J4PW"}
        config={{
          commitment: "confirmed",
        }}
      >
        <ErrorHandlerProvider onError={onError}>
          <ApolloProvider client={wumboApi}>
            <AccountProvider commitment="confirmed">
              <ChakraProvider>
                <WalletProvider
                  wallets={wallets}
                  onError={console.error}
                  autoConnect
                >
                                  <WalletModalProvider>

                 <ProviderContextProvider>
                    <StrataSdksProvider>
                      <MarketplaceSdkProvider>
                        {children}
                      </MarketplaceSdkProvider>
                    </StrataSdksProvider>
                  </ProviderContextProvider>
                </WalletModalProvider>
                </WalletProvider>
              </ChakraProvider>
            </AccountProvider>
          </ApolloProvider>
        </ErrorHandlerProvider>
      </ConnectionProvider>
  );
};

import { ConnectionProvider, WalletProvider, } from "@solana/wallet-adapter-react";
import { LedgerWalletAdapter } from "@solana/wallet-adapter-ledger";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import { GlowWalletAdapter } from "@solana/wallet-adapter-glow";
import { ExodusWalletAdapter } from "@solana/wallet-adapter-exodus";
import React, { useMemo } from "react";
import { useEndpoint } from "@strata-foundation/react";
export const getToken = async () => {
    const req = await fetch("/api/get-token");
    const { access_token } = await req.json();
    return access_token;
};
const config = {
    commitment: "confirmed",
};
export const Wallet = ({ children, cluster, }) => {
    const { endpoint, cluster: clusterFromUseEndpoint } = useEndpoint();
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        // @ts-ignore
        new SolflareWalletAdapter({ network: cluster }),
        new GlowWalletAdapter(),
        new LedgerWalletAdapter(),
        new ExodusWalletAdapter(),
    ], [clusterFromUseEndpoint]);
    return (React.createElement(ConnectionProvider, { endpoint: cluster || endpoint, config: config },
        React.createElement(WalletProvider, { wallets: wallets, autoConnect: true }, children)));
};
//# sourceMappingURL=Wallet.js.map
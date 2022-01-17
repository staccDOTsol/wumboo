import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useQuery, WalletSelect, usePrevious } from "wumbo-common";
import { WumboDrawer } from "../WumboDrawer";
import { useWallet } from "@solana/wallet-adapter-react";

export const ManageWallet = () => {
  const history = useHistory();
  const query = useQuery();
  const { connected } = useWallet();
  const prevConnected = usePrevious(connected);

  useEffect(() => {
    if (connected && !prevConnected) {
      const redirect = query.get("redirect");
      if (redirect) {
        console.log(`Redirecting to ${redirect}`);
        history.replace(redirect);
      }
    }
  }, [connected, prevConnected]);

  return (
    <Fragment>
      <WumboDrawer.Header title="Wallet" />
      <WumboDrawer.Content>
        <WalletSelect />
      </WumboDrawer.Content>
      <WumboDrawer.Nav />
    </Fragment>
  );
};
import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { WalletSelect } from "wumbo-common";
import { useWallet } from "@solana/wallet-adapter-react";
import { AppContainer } from "../AppContainer";

export default React.memo(() => {
  const history = useNavigate();
  const location = useLocation();
  const { connected } = useWallet();

  useEffect(() => {
    const redirect = location.search.replace("?redirect=", "");

    if (connected && redirect) {
      console.log(`Redirecting to ${redirect}`);
      history(redirect);
    }
  }, [connected, location, history]);

  return (
    <AppContainer>
      <WalletSelect />
    </AppContainer>
  );
});

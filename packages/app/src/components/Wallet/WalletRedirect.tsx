import { useWallet } from "@solana/wallet-adapter-react";
import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { Routes } from "../../constants/routes";

export default React.memo(() => {
  const location = useLocation();
  const { connected } = useWallet();

  if (!connected) {
    return (
      <Navigate 
        to={{
          pathname: Routes.manageWallet.path,
          search: `?redirect=${location.pathname}${location.search}`,
        }}
      />
    );
  }

  return null;
});

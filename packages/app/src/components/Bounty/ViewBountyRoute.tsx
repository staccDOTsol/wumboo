import { usePublicKey } from "@strata-foundation/react";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ViewBounty } from "wumbo-common";
import { editBountyPath, profilePath } from "../../constants/routes";
import { AppContainer } from "../AppContainer";
import WalletRedirect from "../Wallet/WalletRedirect";

export const ViewBountyRoute: React.FC = () => {
  const params = useParams<{ mint: string | undefined }>();
  const mintKey = usePublicKey(params.mint);
  const history = useNavigate();

  return (
    <AppContainer>
      <WalletRedirect />
      <ViewBounty
        mintKey={mintKey}
        onEdit={() => history(editBountyPath(mintKey!))}
        getCreatorLink={(c, t, tokenRef) => {
          return tokenRef
            ? profilePath(tokenRef.mint)
            : `https://explorer.solana.com/address/${c.toBase58()}`;
        }}
      />
    </AppContainer>
  );
};

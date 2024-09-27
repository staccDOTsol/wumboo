import { usePublicKey } from "@strata-foundation/react";
import { bountyPath } from "../../constants/routes";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EditBounty } from "wumbo-common";
import { AppContainer } from "../AppContainer";
import WalletRedirect from "../Wallet/WalletRedirect";

export const EditBountyRoute: React.FC = () => {
  const params = useParams<{ mint: string | undefined }>();
  const mintKey = usePublicKey(params.mint);
  const history = useNavigate();

  return (
    <AppContainer>
      <WalletRedirect />
      <EditBounty
        mintKey={mintKey!}
        onComplete={() => history(bountyPath(mintKey!))}
      />
    </AppContainer>
  );
};

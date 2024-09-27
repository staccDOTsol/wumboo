// @ts-nocheck
import { ITokenWithMetaAndAccount } from "strata-foundation-spl-token-collective-2";
import { sendPath } from "@/constants/routes";
import { Box } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import React, { Fragment } from "react";
import { useQuery } from "wumbo-common";
import { WumboDrawer } from "../WumboDrawer";
import { TokenSearch as CommonSendSearch } from "@strata-foundation/react";
import { useHistory } from "react-router-dom";

export const SendSearch = () => {
  const query = useQuery();
  const recipient = query.get("recipient");
  const history = useHistory();

  return (
    <Fragment>
      <WumboDrawer.Header title="Send" />
      <WumboDrawer.Content>
        <Box padding={4}>
          <CommonSendSearch
            onSelect={(t: ITokenWithMetaAndAccount) => {
              history(
                sendPath(
                  t.account!.mint,
                  recipient ? new PublicKey(recipient) : undefined
                )
              );
            }}
          />
        </Box>
      </WumboDrawer.Content>
      <WumboDrawer.Nav />
    </Fragment>
  );
};

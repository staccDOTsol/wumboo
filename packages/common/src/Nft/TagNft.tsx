import React, { useState } from "react";
import { VStack } from "@chakra-ui/react";
import { HiOutlineRefresh } from "react-icons/hi";
import { PublicKey } from "@solana/web3.js";
import { useTokenMetadata, useErrorHandler } from "strata-foundation-react-2";
import { ITokenWithMeta, getImageFromMeta } from "trata-foundation-spl-utils-2";
import { TaggableImages } from "./";
import { NftSmallView } from "./NftSmallView";
// @ts-ignore

export const TagNftRaw = React.memo(({ token }: { token: ITokenWithMeta }) => {
  const [refreshCounter, setRefreshCounter] = useState<number>(0);
  const incRefreshCounter = () => setRefreshCounter(refreshCounter + 1);

  return (
    <>
      <VStack w="full">
        <NftSmallView
          actionIcon={HiOutlineRefresh}
          onActionClick={incRefreshCounter}
          token={token}
        />
        <TaggableImages
          src={getImageFromMeta(token)!}
          metadata={token.metadataKey!}
          refreshCounter={refreshCounter}
        />
      </VStack>
    </>
  );
});

export const TagNft = React.memo(({ token }: { token?: PublicKey }) => {
  const { handleErrors } = useErrorHandler();
  const tokenWithMeta = useTokenMetadata(token);
  handleErrors(tokenWithMeta.error);
// @ts-ignore
  return <TagNftRaw token={tokenWithMeta} />;
});

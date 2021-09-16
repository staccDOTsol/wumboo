import React from "react";
import { ITokenWithMeta } from "../utils/metaplex/nftMetadataHooks";
import { Badge } from "../Badge";
import { Link } from "react-router-dom";
import { Nft } from "./Nft";

export const NftCard = React.memo(
  ({ token, getLink }: { token: ITokenWithMeta; getLink: (t: ITokenWithMeta) => string }) => {
    return (
      <Link
        to={getLink(token)}
        className="flex-1 flex flex-col rounded-lg overflow-hidden hover:opacity-25"
      >
        <div className="flex py-2 px-2 justify-center w-full bg-gray-100">
          {token.data && (
            <Nft meshEnabled={false} className="w-24 h-24 object-cover" data={token.data} />
          )}
        </div>
        <div className="flex flex-col w-full p-2 text-left items-start space-y-1 overflow-hidden">
          <span className="w-full truncate text-sm font-bold">{token.metadata?.data.name}</span>
          {token.masterEdition && (
            <div className="flex flex-row">
              <Badge size="sm">
                {token.masterEdition && !token.edition && "Master"}
                {token.edition &&
                  `${token.edition.edition.toNumber()} of ${token.masterEdition?.supply.toNumber()}`}
              </Badge>
            </div>
          )}
        </div>
      </Link>
    );
  }
);
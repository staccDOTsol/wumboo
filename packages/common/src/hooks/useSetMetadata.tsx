import { useConnection } from "@solana/wallet-adapter-react";
import { PublicKey, Signer, TransactionInstruction } from "@solana/web3.js";
import {
  useProvider,
  useStrataSdks,
  useTokenBonding,
  useTokenMetadata,
  useTokenRef,
} from "@strata-foundation/react";
import {
  ARWEAVE_UPLOAD_URL,
  Creator,
  Data,
} from "@strata-foundation/spl-utils";
import { useState } from "react";
import { useAsyncCallback } from "react-async-hook";

export interface ISetMetadataArgs {
  name: string;
  symbol: string;
  image: File | undefined;
  sellBaseRoyaltyPercentage: number;
  buyBaseRoyaltyPercentage: number;
  sellTargetRoyaltyPercentage: number;
  buyTargetRoyaltyPercentage: number;
}

type MetadataFiniteState =
  | "idle"
  | "gathering-files"
  | "submit-solana"
  | "submit-arweave";

const getFileFromUrl = async (
  url: string,
  name: string,
  defaultType: string = "image/jpeg"
): Promise<[File, string]> => {
  const data = await fetch(url, { cache: "no-cache" });
  const blob = await data.blob();
  const fileName = `${name}${blob.type === defaultType ? ".jpeg" : "png"}`;
  const file = new File([blob], fileName, { type: blob.type || defaultType });

  return [file, fileName];
};

export const useSetMetadata = (
  tokenRefKey: PublicKey | undefined
): [
  (
    args: ISetMetadataArgs
  ) => Promise<{ metadataAccount: PublicKey | undefined } | void>,
  {
    loading: boolean;
    loadingState: MetadataFiniteState;
    error: Error | undefined;
  }
] => {
  const { connection } = useConnection();
  const { provider } = useProvider();
  const { tokenCollectiveSdk, tokenMetadataSdk } = useStrataSdks();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingState, setLoadingState] = useState<MetadataFiniteState>("idle");

  const { info: tokenRef } = useTokenRef(tokenRefKey);
  const { info: tokenBonding } = useTokenBonding(tokenRef?.tokenBonding);
  const {
    publicKey: metadataAccountKey,
    image,
    metadata,
    error: tokenMetadataError,
  } = useTokenMetadata(tokenBonding?.targetMint);

  const exec = async (args: ISetMetadataArgs) => {
    if (provider && tokenRefKey) {
      setLoading(true);
      setLoadingState("gathering-files");
      let files: File[] = [];
      let metadataChanged =
        args.image != undefined ||
        args.name != metadata?.data.name ||
        args.symbol != metadata?.data.symbol;

      // No catch of errors as the useAsyncCallback and return handles it
      try {
        let arweaveLink;
        let creators: Creator[] | null = null;

        if (metadataChanged) {
          let imageName: string | undefined = undefined;

          if (args.image) {
            files = [args.image];
            imageName = args.image.name;
          } else if (args.name === null) {
            // Intentionaly unset;
            files = [];
          } else {
            // Undefined, keep the old one
            const [file, fileName] = await getFileFromUrl(image!, "untitled");
            imageName = fileName;
            files = [file];
          }

          setLoadingState("submit-solana");
          const { files: presignedFiles, txid } =
            await tokenMetadataSdk!.presignCreateArweaveUrl({
              name: args.name,
              symbol: args.symbol,
              image: imageName,
              files,
              env: "mainnet-beta",
              uploadUrl: ARWEAVE_UPLOAD_URL,
            });

          setLoadingState("submit-arweave");
          arweaveLink = await tokenMetadataSdk!.getArweaveUrl({
            txid,
            mint: tokenRef!.mint,
            files: presignedFiles,
            env: "mainnet-beta",
          });
        } else {
          arweaveLink = metadata?.data.uri as string;
        }

        setLoadingState("submit-solana");

        let updateTokenBondingInstructions: TransactionInstruction[] = [];
        let updateTokenBondingSigners: Signer[] = [];
        if (tokenRef?.authority) {
          ({
            instructions: updateTokenBondingInstructions,
            signers: updateTokenBondingSigners,
          } = await tokenCollectiveSdk!.updateTokenBondingInstructions({
            tokenRef: tokenRef!.publicKey,
            buyBaseRoyaltyPercentage: args.buyBaseRoyaltyPercentage,
            buyTargetRoyaltyPercentage: args.buyTargetRoyaltyPercentage,
            sellBaseRoyaltyPercentage: args.sellBaseRoyaltyPercentage,
            sellTargetRoyaltyPercentage: args.sellTargetRoyaltyPercentage,
          }));
        }

        const {
          instructions: updateMetadataInstructions,
          signers: updateMetadataSigners,
        } = await tokenMetadataSdk!.updateMetadataInstructions({
          metadata: tokenRef!.tokenMetadata,
          data: new Data({
            name: args.name,
            symbol: args.symbol,
            uri: arweaveLink,
            sellerFeeBasisPoints: 0,
            creators,
          }),
        });

        await tokenCollectiveSdk?.sendInstructions(
          [...updateTokenBondingInstructions, ...updateMetadataInstructions],
          [...updateTokenBondingSigners, ...updateMetadataSigners]
        );

        return {
          metadataAccount: metadataAccountKey,
        };
      } finally {
        setLoading(false);
        setLoadingState("idle");
      }
    }
  };

  const { execute, error } = useAsyncCallback(exec);
  return [
    execute,
    { loading, loadingState, error: tokenMetadataError || error },
  ];
};
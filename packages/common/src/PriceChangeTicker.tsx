import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import {
  Spinner,
  useCurve,
  useErrorHandler,
  useMint,
  useTokenAccount,
  useTokenBonding,
} from "strata-foundation-react-2";
import {
  amountAsNum,
  fromCurve,
  toBN,
} from "strata-foundation-spl-token-bonding-2";
import React, { useMemo } from "react";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useTokenBondingRecentTransactions } from "./contexts";

export const PriceChangeTicker = ({
  tokenBonding,
}: {
  tokenBonding: PublicKey | undefined;
}) => {
  const { transactions, loading, error, hasMore } =
    useTokenBondingRecentTransactions();

  const { info: tokenBondingAcc, loading: loadingBonding } =
    useTokenBonding(tokenBonding);
  // @ts-ignore
  const { info: baseStorage } = useTokenAccount(tokenBondingAcc?.baseStorage);
  // @ts-ignore
  const baseMint = useMint(tokenBondingAcc?.baseMint);
  // @ts-ignore
  const targetMint = useMint(tokenBondingAcc?.targetMint);
  const { info: curve, loading: loadingCurve } = useCurve(
    // @ts-ignore
    tokenBondingAcc?.curve
  );

  const oldPricing = useMemo(() => {
    if (tokenBondingAcc && curve && baseStorage && baseMint && targetMint) {
      const totalTargetMintChange = (transactions || []).reduce((acc, txn) => {
        return acc + txn.targetAmount;
      }, 0);
      const totalBaseMintChange = (transactions || []).reduce((acc, txn) => {
        return acc + txn.baseAmount;
      }, 0);
      return fromCurve(
        curve,
        amountAsNum(
          baseStorage?.amount.sub(toBN(totalBaseMintChange, baseMint)),
          baseMint
        ),
        amountAsNum(
          // @ts-ignore
          targetMint?.supply.sub(toBN(totalTargetMintChange, targetMint)),
          targetMint
        ),
        // @ts-ignore
        tokenBondingAcc.goLiveUnixTime.toNumber()
      );
    }
  }, [transactions, tokenBondingAcc, curve, baseStorage, baseMint, targetMint]);
  const currentPricing = useMemo(() => {
    if (tokenBondingAcc && curve && baseStorage && baseMint && targetMint) {
      // @ts-ignore
      return fromCurve(
        curve,
        amountAsNum(baseStorage.amount, baseMint),
        amountAsNum(targetMint.supply, targetMint),
        // @ts-ignore
        tokenBondingAcc.goLiveUnixTime.toNumber()
      );
    }
  }, [tokenBondingAcc, curve, baseStorage, baseMint, targetMint]);

  const { handleErrors } = useErrorHandler();
  handleErrors(error);

  if (
    loading ||
    hasMore ||
    loadingBonding ||
    !baseMint ||
    !baseStorage ||
    loadingCurve ||
    !targetMint
  ) {
    return (
      <Box>
        <Spinner size="xs" />
      </Box>
    );
  }

  const currentPrice = currentPricing!.current(baseMint);
  const prevPrice = oldPricing!.current(
    baseMint,
    // @ts-ignore
    new Date().valueOf() / 1000 - 24 * 60 * 60
  );

  return (
    <HStack
      spacing={0}
      alignItems="center"
      color={currentPrice < prevPrice ? "red.600" : "green.600"}
    >
      {currentPrice < prevPrice ? (
        <Icon as={AiFillCaretDown} />
      ) : (
        <Icon as={AiFillCaretUp} />
      )}
      <Text fontSize="sm">
        {(Math.abs((prevPrice - currentPrice) / prevPrice) * 100).toFixed(1)}%
      </Text>
    </HStack>
  );
};

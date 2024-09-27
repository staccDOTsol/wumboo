import { Flex } from "@chakra-ui/react";
import { useBondingPricing, usePriceInUsd } from "strata-foundation-react-2";
import {
  BondingPricing,
  ITokenBonding,
} from "strata-foundation-spl-token-bonding-2";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TokenPillProps {
  name?: String;
  ticker?: String;
  icon?: React.ReactElement;
  tokenBonding: ITokenBonding;
  detailsPath?: string;
  pricing?: BondingPricing;
}

export const TokenPill = React.memo(
  ({
    name,
    ticker,
    icon,
    tokenBonding,
    detailsPath,
    pricing: pricingPassed,
  }: TokenPillProps) => {
    const { pricing: pricingResolved } = useBondingPricing(
      tokenBonding.publicKey
    );
    // @ts-ignore
    const fiatPrice = usePriceInUsd(tokenBonding.baseMint);
    // @ts-ignore
    const toFiat = (a: number) => (fiatPrice || 0) * a;
    const history = useNavigate();
    const pricing = pricingPassed || pricingResolved;

    return (
      <Flex
        w="full"
        rounded="lg"
        bgColor="gray.100"
        padding={4}
        _hover={{
          bgColor: "gray.200",
          cursor: "pointer",
        }}
        onClick={() => detailsPath && history(detailsPath)}
      >
        {icon}
        <Flex
          flexDir="column"
          grow={1}
          justify="center"
          color="gray.700"
          paddingLeft={4}
        >
          <Flex justify="space-between" fontSize="lg" fontWeight="medium">
            <span>{name}</span>
            <span>
              {pricing
                ? "$" +
                  // @ts-ignore
                  toFiat(pricing!.current(tokenBonding.baseMint) || 0).toFixed(
                    2
                  )
                : "Loading"}
            </span>
          </Flex>
          <Flex justify="space-between" fontSize="xs">
            <span>{ticker}</span>
          </Flex>
        </Flex>
      </Flex>
    );
  }
);

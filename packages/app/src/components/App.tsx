import { Flex } from "@chakra-ui/react";
import { PublicKey } from "@solana/web3.js";
import { SplTokenCollective } from "@strata-foundation/spl-token-collective";
import React from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes as Switch, useLocation } from "react-router-dom";
import { profilePath, Routes } from "../constants/routes";
import { CreateBountyRoute } from "./Bounty/CreateBountyRoute";
import { EditBountyRoute } from "./Bounty/EditBountyRoute";
import { ViewBountyRoute } from "./Bounty/ViewBountyRoute";
import { BurnBetaRoute } from "./BurnBeta/BurnBetaRoute";
import { ClaimRoute } from "./Claim/Claim";
import { ClaimedOptOutRoute } from "./Claim/ClaimedOptOut";
import { OptOutRoute } from "./Claim/OptOut";
import { ContextProviders } from "./ContextProviders";
import { Header } from "./Header";
import { WalletSelectModal } from "./modals/WalletSelectModal";
import { ViewNftRoute } from "./Nft/View/ViewNft";
import { EditProfileRoute } from "./Profile/Edit/EditProfile";
import { ViewProfileRoute } from "./Profile/View/ViewProfile";
import { PrototypeRoute } from "./Prototype";
import { RelinkRoute } from "./Relink/Relink";
import { SwapRoute } from "./Swap/Swap";
import { SwapConfirmationRoute } from "./Swap/SwapConfirmation";
import ManageWallet from "./Wallet/ManageWallet";
import Send from "./Wallet/Send";
import SendSearch from "./Wallet/SendSearch";
import Wallet from "./Wallet/Wallet";
import { Workspace } from "./Workspace";

const LegacyAppRouteRedirect: React.FC = () => {
  const { pathname, search } = useLocation();
  const sanitizedPathname = pathname.replace("/app", "") + search;

  return <Navigate to={sanitizedPathname} />;
};

export const App: React.FC = () => (
  <ContextProviders>
    <Flex w="full" h="100vh" flexDirection="column">
      <Header />

      <Workspace>
        <Switch>
          <Route path={Routes.relink.path} element={<RelinkRoute />} />
          <Route
            path={Routes.claimedOptOut.path}
            element={<ClaimedOptOutRoute />}
          />
          <Route path={Routes.optOut.path} element={<OptOutRoute />} />
          <Route path={Routes.claim.path} element={<ClaimRoute />} />
          <Route path={Routes.wallet.path} element={<Wallet />} />
          <Route path={Routes.manageWallet.path} element={<ManageWallet />} />
          <Route path={Routes.viewProfile.path} element={<ViewProfileRoute />} />
          <Route path={Routes.viewNft.path} element={<ViewNftRoute />} />
          <Route path={Routes.viewBounty.path} element={<ViewBountyRoute />} />
          <Route
            path={Routes.createBounty.path}
            element={<CreateBountyRoute />}
          />
          <Route path={Routes.editBounty.path} element={<EditBountyRoute />} />
          <Route
            path={Routes.profile.path}
            element={<ViewProfileRoute />}
          />
          <Route path={Routes.editProfile.path} element={<EditProfileRoute />} />
          <Route path={Routes.sendSearch.path} element={<SendSearch />} />
          <Route path={Routes.send.path} element={<Send />} />
          <Route path={Routes.swap.path} element={<SwapRoute />} />
          <Route
            path={Routes.swapConfirmation.path}
            element={<SwapConfirmationRoute />}
          />
          <Route path={Routes.burnBeta.path} element={<BurnBetaRoute />} />
          <Route path={Routes.prototype.path} element={<PrototypeRoute />} />
          {/* catch all route redirction for legacy /app urls */}
          <Route path="/app" element={<LegacyAppRouteRedirect />} />
          <Route
            path={Routes.root.path}
            element={
              <Navigate
                to={profilePath(
                  new PublicKey(SplTokenCollective.OPEN_COLLECTIVE_MINT_ID)
                )}
              />
            }
          />
        </Switch>
        <Toaster
          position="bottom-center"
          containerStyle={{
            margin: "auto",
            width: "420px",
          }}
        />
      </Workspace>
    </Flex>

    {/* place app specific modals here */}
    <WalletSelectModal />
  </ContextProviders>
);

import React from "react";
import ReactDOM from "react-dom";
import ReactGA from "react-ga";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ModalProvider } from "./contexts";
import { App } from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { Routes as AppRoutes } from "./constants/routes";

const TRACKING_ID = "G-3K3X1TLYCC";
ReactGA.initialize(TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <ModalProvider>
        <BrowserRouter>
          <Routes>
            <Route path={AppRoutes.root.path} element={<App />} />
            <Route path={AppRoutes.relink.path} element={<App />} />
            <Route path={AppRoutes.claim.path} element={<App />} />
            <Route path={AppRoutes.optOut.path} element={<App />} />
            <Route path={AppRoutes.claimedOptOut.path} element={<App />} />
            <Route path={AppRoutes.manageWallet.path} element={<App />} />
            <Route path={AppRoutes.wallet.path} element={<App />} />
            <Route path={AppRoutes.viewProfile.path} element={<App />} />
            <Route path={AppRoutes.viewNft.path} element={<App />} />
            <Route path={AppRoutes.profile.path} element={<App />} />
            <Route path={AppRoutes.editProfile.path} element={<App />} />
            <Route path={AppRoutes.topTokens.path} element={<App />} />
            <Route path={AppRoutes.wumNetWorth.path} element={<App />} />
            <Route path={AppRoutes.sendSearch.path} element={<App />} />
            <Route path={AppRoutes.send.path} element={<App />} />
            <Route path={AppRoutes.swap.path} element={<App />} />
            <Route path={AppRoutes.swapConfirmation.path} element={<App />} />
            <Route path={AppRoutes.prototype.path} element={<App />} />
            <Route path={AppRoutes.burnBeta.path} element={<App />} />
            <Route path={AppRoutes.viewBounty.path} element={<App />} />
            <Route path={AppRoutes.createBounty.path} element={<App />} />
            <Route path={AppRoutes.editBounty.path} element={<App />} />
          </Routes>
        </BrowserRouter>
      </ModalProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

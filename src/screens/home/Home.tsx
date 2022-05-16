import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { HomeViewModel } from "./HomeViewModel";
import { UserStore, UserStore as user } from "../../stores/userStore";
import { withStore } from "../../utils/hoc";
import "./Home.sass";
import { HumaniqIdCard } from "../../components/humaniq-id-card/HumaniqIdCard";
import { getProviderStore } from "../../App";
import {
  Avatar,
  Box,
  Button,
  Paper,
  Stack,
  SwipeableDrawer,
} from "@mui/material";
import HumaniqLogo from "../../static/images/humaniq-logo.svg";
import WCLogo from "../../static/images/wallet-connect-logo.svg";
import Web3Logo from "../../static/images/web3-logo.svg";
import { PROVIDERS } from "../../stores/providerStore";
import { NotRegisteredMessage } from "../../components/not-registered-message/NotRegisteredMessage";
import { HumaniqIdForm } from "../../components/humaniq-id-form/HumaniqIdForm";
import { t } from "i18next";

export interface HomeScreenInterface {
  store: HomeViewModel;
}

const HomeImpl = ({ store: view }: HomeScreenInterface) => {
  const inputGalleryRef = useRef<any>();

  useEffect(() => {
    (async () => {
      await view.init(inputGalleryRef);
    })();
  }, [view]);

  return (
    <div className="container">
      <div className={"main"}>
        {!view.isEditMode && (
          <HumaniqIdCard
            verified={!user.isAnyFieldEmpty}
            address={getProviderStore.currentAccount}
            fields={[
              ["Date of birth", user.birthDate],
              ["Country", user.country],
              ["City", user.city],
            ]}
            name={user.fullName}
            photoUrl={user.photoURI}
            loading={!view.initialized}
          />
        )}
        {view.isEditMode && (
          <HumaniqIdForm
            user={UserStore}
            onBackClick={view.backClick}
            onFileChoose={view.onFileChoose}
            openFileExplorer={view.openFileExplorer}
            inputRef={view.galleryRef}
          />
        )}
        {getProviderStore.currentAccount &&
          !user.isRegistered &&
          !view.isEditMode && <NotRegisteredMessage />}
        {getProviderStore.currentAccount && (
          <Button
            onClick={view.toggleEditOrSave}
            className={"btn-2"}
            variant={"contained"}
            disabled={view.isEditMode ? user.isAnyFieldEmpty : false}
          >
            {view.isEditMode ? t("signWithWallet") : t("egitProfile")}
          </Button>
        )}
        <Button
          onClick={view.toggleDialogOrDisconnectWallet}
          className={"btn"}
          variant={!getProviderStore.currentAccount ? "contained" : "text"}
        >
          {!getProviderStore.currentAccount
            ? t("connectWalletDialog")
            : t("disconnect")}
        </Button>
        <SwipeableDrawer
          anchor={"bottom"}
          open={getProviderStore.connectDialog}
          onClose={() => (getProviderStore.connectDialog = false)}
          onOpen={getProviderStore.toggleConnectDialog}
          style={{ borderRadius: 16 }}
        >
          <Box
            className={"drawer-container"}
            sx={{ width: "auto", minHeight: 300 }}
          >
            <h1 className={"tittle"}>{t("connectWalletDialog")}</h1>
            <div className={"description"}>{t("chooseConnection")}</div>
            <Stack className={"stack"}>
              <Paper
                elevation={0}
                className={"paper"}
                onClick={() => getProviderStore.setProvider(PROVIDERS.WEB3)}
              >
                <Avatar className={"avatar"}>
                  <img alt={"humaniq"} src={HumaniqLogo} />
                </Avatar>
                <span>{t("humaniqName")}</span>
              </Paper>
              <Paper
                elevation={0}
                className={"paper"}
                onClick={() => getProviderStore.setProvider(PROVIDERS.WC)}
              >
                <Avatar className={"avatar"}>
                  <img src={WCLogo} alt={"wallet-connect"} />
                </Avatar>
                <span>{t("walletConnectName")}</span>
              </Paper>
              <Paper
                elevation={0}
                className={"paper"}
                onClick={() => getProviderStore.setProvider(PROVIDERS.WEB3)}
              >
                <Avatar className={"avatar"}>
                  <img alt={"web3"} src={Web3Logo} />
                </Avatar>
                <span>{t("web3Name")}</span>
              </Paper>
            </Stack>
            <div className={"btn-container"}>
              <Button
                onClick={getProviderStore.toggleConnectDialog}
                className={"btn"}
                variant={"text"}
              >
                {t("later")}
              </Button>
            </div>
          </Box>
        </SwipeableDrawer>
      </div>
    </div>
  );
};

export const Home = withStore(HomeViewModel, observer(HomeImpl));

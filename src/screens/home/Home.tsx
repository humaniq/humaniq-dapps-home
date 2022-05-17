import React, { useEffect, useRef } from "react";
import { observer } from "mobx-react";
import { HomeViewModel } from "./HomeViewModel";
import { UserStore, UserStore as user } from "../../stores/userStore";
import { withStore } from "../../utils/hoc";
import "./Home.sass";
import { HumaniqIdCard } from "../../components/humaniq-id-card/HumaniqIdCard";
import { getProviderStore } from "../../App";
import { Button } from "@mui/material";
import { NotRegisteredMessage } from "../../components/not-registered-message/NotRegisteredMessage";
import { HumaniqIdForm } from "../../components/humaniq-id-form/HumaniqIdForm";
import { t } from "i18next";
import { ConnectDialog } from "../../components/dialogs/ConnectDialog";
import { DisconnectDialog } from "../../components/dialogs/DisconnectDialog";

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
    <div className={view.isEditMode ? "container edit" : "container"}>
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
        {!view.isEditMode && (
          <NotRegisteredMessage
            isRegistered={user.isRegistered}
            isConnected={getProviderStore.currentAccount}
          />
        )}
        {getProviderStore.currentAccount && (
          <Button
            onClick={view.toggleEditOrSave}
            className={view.isEditMode ? "btn" : "btn-2"}
            variant={"contained"}
            disabled={view.isEditMode ? user.isAnyFieldEmpty : false}
          >
            {view.isEditMode ? t("signWithWallet") : t("egitProfile")}
          </Button>
        )}
        {!view.isEditMode && (
          <Button
            onClick={view.toggleDialogOrDisconnectWallet}
            className={"btn"}
            variant={!getProviderStore.currentAccount ? "contained" : "text"}
          >
            {!getProviderStore.currentAccount
              ? t("connectWalletDialog")
              : t("disconnect")}
          </Button>
        )}
        <ConnectDialog />
        <DisconnectDialog />
      </div>
    </div>
  );
};

export const Home = withStore(HomeViewModel, observer(HomeImpl));

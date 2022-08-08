import React from "react";
import { observer } from "mobx-react";
import { HomeViewModel } from "./HomeViewModel";
import { withStore } from "../../utils/hoc";
import "./Home.sass";
import { ConnectDialog } from "../../components/dialogs/ConnectDialog";
import { DisconnectDialog } from "../../components/dialogs/DisconnectDialog";
import { Header } from "../../components/header/Header";
import { Autocomplete } from "../../components/autocomplete/Autocoplete";
import { ExploreDapps } from "../../components/explore-dapps/ExploreDapps";
import { NetworkSwitcher } from "../../components/network-switcher/NetworkSwitcher";

export interface HomeScreenInterface {
  store: HomeViewModel;
}

const HomeImpl = ({ store: view }: HomeScreenInterface) => {
  return (
    <div className={"container"}>
      <div className={"main"}>
        <NetworkSwitcher />
        <Header />
        <Autocomplete />
        <ExploreDapps />
        <ConnectDialog />
        <DisconnectDialog />
      </div>
    </div>
  );
};

export const Home = withStore(HomeViewModel, observer(HomeImpl));

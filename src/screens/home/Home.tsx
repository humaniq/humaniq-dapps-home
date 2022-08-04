import React from "react";
import { observer } from "mobx-react";
import { HomeViewModel } from "./HomeViewModel";
import { withStore } from "../../utils/hoc";
import "./Home.sass";
import { ConnectDialog } from "../../components/dialogs/ConnectDialog";
import { DisconnectDialog } from "../../components/dialogs/DisconnectDialog";

export interface HomeScreenInterface {
  store: HomeViewModel;
}

const HomeImpl = ({ store: view }: HomeScreenInterface) => {
  return (
    <div className={"container"}>
      <div className={"main"}>
        <h1>Humaniq Dapps Template</h1>
        <ConnectDialog />
        <DisconnectDialog />
      </div>
    </div>
  );
};

export const Home = withStore(HomeViewModel, observer(HomeImpl));

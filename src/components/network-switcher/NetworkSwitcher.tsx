import React from "react";
import "./index.sass";
import { app, EVM_NETWORKS } from "../../stores/appStore/appStore";
import { observer } from "mobx-react";

export const NetworkSwitcher = observer(() => {
  return (
    <div className={"switcher-container"}>
      <div
        onClick={() => (app.selectedNetwork = EVM_NETWORKS.BSC)}
        className={
          app.selectedNetwork === EVM_NETWORKS.BSC ? `col selected` : `col`
        }
      >
        BSC
      </div>
      <div
        onClick={() => (app.selectedNetwork = EVM_NETWORKS.ETHEREUM)}
        className={
          app.selectedNetwork === EVM_NETWORKS.ETHEREUM ? `col selected` : `col`
        }
      >
        Ethereum
      </div>
    </div>
  );
});

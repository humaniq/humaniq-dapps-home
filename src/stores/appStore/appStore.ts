import { makeAutoObservable } from "mobx";
import { AlertStore } from "./alertStore";

export enum EVM_NETWORKS {
  BSC = "bsc",
  ETHEREUM = "ethereum",
}

export class AppStore {
  selectedNetwork = EVM_NETWORKS.BSC;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  alert = new AlertStore();
}

export const app = new AppStore();

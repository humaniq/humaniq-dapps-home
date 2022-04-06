import { makeAutoObservable } from "mobx";
import Logcat from "../../utils/logcat";

export class ProviderStore {
  initialized = false;
  currentAccount: any = null;
  hasProvider = false;

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true });
  }

  init = async () => {
    if (window.ethereum) {
      this.hasProvider = true;

      window.ethereum.on("accountsChanged", (accounts: any) => {
        this.currentAccount = accounts[0];
      });

      window.ethereum.on("disconnect", () => {
        this.currentAccount = null;
      });

      window.ethereum.on("connect", (accounts: any) => {
        this.currentAccount = accounts[0];
      });

      window.ethereum.on("message", (payload: any) => {
        Logcat.info("message", payload);
      });

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        this.currentAccount = accounts[0];
      } catch (e) {
        Logcat.info("ERROR", e);
      }
    }
    this.initialized = true;
  };

  personalMessageRequest = (message: any): any => {
    if (!window.ethereum) return null;

    return window.ethereum.request({
      method: "personal_sign",
      params: [
        `0x${Buffer.from(message, "utf-8").toString("hex")}`,
        this.currentAccount,
      ],
    });
  };

  connect = async () => {
    if (!window.ethereum || window.ethereum?.currentAccount) return;

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.currentAccount = accounts[0];
    } catch (e) {
      Logcat.info("ERROR", e);
    }
  };

  disconnect = () => {
    this.currentAccount = null;
  };
}

export const ETHProvider = new ProviderStore();

import { RefObject } from "react";
import { makeAutoObservable, reaction } from "mobx";
import { UserStore, UserStore as user } from "../../stores/userStore";
import { ETHProvider } from "../../stores/providerStore";
import { getProviderStore } from "../../App";
import Logcat from "../../utils/logcat";

export class HomeViewModel {
  galleryRef?: RefObject<HTMLInputElement>;

  isEditMode = false;
  initialized = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  backClick = async () => {
    user.onReset();
    this.isEditMode = false;
    await user.fetchProfile();
  };

  init = async (ref?: RefObject<HTMLInputElement>) => {
    this.galleryRef = ref;
    ETHProvider.currentAccount && (await user.fetchProfile());
    reaction(
      () => ETHProvider.currentAccount,
      async (val) => {
        if (val) {
          await user.fetchProfile();
        } else {
          UserStore.onReset();
        }
      }
    );
    this.initialized = true;
  };

  toggleEditOrSave = async () => {
    if (this.isEditMode) {
      const result = await user.onSubmit();
      if (result) {
        this.isEditMode = !this.isEditMode;
      }
    } else {
      this.isEditMode = !this.isEditMode;
    }
  };

  openFileExplorer = () => {
    this.galleryRef?.current?.click();
  };

  onFileChoose = async (event: any) => {
    event.preventDefault();
    await user.updatePhoto(event.target.files[0]);
  };

  toggleDialogOrDisconnectWallet = () => {
    if (!getProviderStore.currentAccount) {
      getProviderStore.connectDialog = !getProviderStore.connectDialog;
    } else {
      this.isEditMode = false;
      getProviderStore.disconnect();
    }
  };
}

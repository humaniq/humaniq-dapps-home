import { RefObject } from "react";
import { makeAutoObservable, reaction } from "mobx";
import { UserStore, UserStore as user } from "../../stores/user/userStore";
import { ETHProvider } from "../../stores/provider/providerStore";

export class HomeViewModel {
  private galleryRef?: RefObject<HTMLInputElement>;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  init = async (ref?: RefObject<HTMLInputElement>) => {
    this.galleryRef = ref;
    await user.fetchProfile();
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
  };

  openFileExplorer = () => {
    this.galleryRef?.current?.click();
  };

  onFileChoose = async (event: any) => {
    event.preventDefault();
    let file = event.target.files[0];
    await user.uploadPhoto(file);
  };
}

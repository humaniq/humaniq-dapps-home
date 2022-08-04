import { RefObject } from "react";
import { makeAutoObservable } from "mobx";

export class HomeViewModel {
  galleryRef?: RefObject<HTMLInputElement>;

  initialized = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
}

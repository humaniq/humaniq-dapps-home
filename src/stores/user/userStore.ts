import BaseStore from "../base/baseStore";
import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import { getProviderStore } from "../../App";
import { isEmpty } from "../../utils/textUtils";
import Logcat from "../../logcat/Logcat";
import { t } from "i18next";
import dayjs from "dayjs";
import { HomeRepository } from "../../repository/types";
import { ProfileUpdateRequest } from "../../network/requests";
import { HomeRepositoryImpl } from "../../repository/HomeRepositoryImpl";

// const test = {
//   firstName: "Antonin",
//   lastName: "Antuanov",
//   country: "Uzbekistan",
//   city: "Tashkent",
//   birthDate: "10.10.1993",
//   hmqIDCode: "3GLBe",
//   avatar: "https://files.salebot.pro/uploads/message_files/8c5826b6-3f24-4efa-a7c6-4c150dadcd20.jpg"
// }

class User extends BaseStore {
  @observable firstName = "";
  @observable lastName = "";
  @observable country = "";
  @observable city = "";
  @observable birthDate = "";

  @observable firstNameError?: string;
  @observable lastNameError?: string;
  @observable countryError?: string;
  @observable cityError?: string;
  @observable birthDateError?: string;

  @observable hmqIDCode = "";
  @observable avatar = "";
  @observable isFetching = false;

  private readonly repository: HomeRepository;

  constructor() {
    super();
    makeObservable(this);
    this.repository = new HomeRepositoryImpl();
  }

  @computed
  get getBirthDate() {
    return !isEmpty(this.birthDate) ? dayjs(this.birthDate) : dayjs();
  }

  @computed
  get buttonDisabled() {
    return this.isAnyFieldEmpty();
  }

  @action
  setFirstName = (value: string) => {
    this.firstNameError = undefined;
    this.firstName = value;
  };

  @action
  setLastName = (value: string) => {
    this.lastNameError = undefined;
    this.lastName = value;
  };

  @action
  setCountry = (value: string) => {
    this.countryError = undefined;
    this.country = value;
  };

  @action
  setCity = (value: string) => {
    this.cityError = undefined;
    this.city = value;
  };

  @action
  setBirthDate = (value: string) => {
    this.birthDateError = undefined;
    this.birthDate = value;
  };

  @action
  fetchProfile = async () => {
    // some profile fetching
    this.isFetching = true;
    Logcat.info("fetching profile...");
    setTimeout(() => {
      runInAction(() => {
        // this.setProfileUser(test)
        this.isFetching = false;
      });
      Logcat.info("fetching profile... done");
    }, 3000);
  };

  @action
  onSubmit = async () => {
    if (isEmpty(this.firstName)) {
      this.firstNameError = t("emptyField");
    }

    if (isEmpty(this.lastName)) {
      this.lastNameError = t("emptyField");
    }

    if (isEmpty(this.country)) {
      this.countryError = t("emptyField");
    }

    if (isEmpty(this.city)) {
      this.cityError = t("emptyField");
    }

    if (isEmpty(this.birthDate)) {
      this.birthDateError = t("emptyField");
    }

    if (this.isAnyFieldEmpty()) {
      return;
    }

    try {
      const timeStamp = new Date().getTime();
      const request = `ADDRESS ${getProviderStore.currentAccount} UPDATE PERSONAL INFO TIMESTAMP ${timeStamp}`;
      Logcat.info("Personal message: ", request);
      const result = await getProviderStore.personalMessageRequest(request);
      if (result) {
        // const data = {
        //   query: {
        //     addressFrom: getProviderStore.currentAccount,
        //     timeStamp,
        //     typeOperation: "UPSERT",
        //     typeMessage: "humaniqIdentity",
        //     payload: {
        //       lastName: this.lastName,
        //       firstName: this.firstName
        //     }
        //   },
        //   signature: result
        // }

        const profileRequest = {
          firstName: this.firstName,
          lastName: this.lastName,
          country: this.country,
          city: this.city,
          birthDate: this.birthDate,
        } as ProfileUpdateRequest;

        console.log("here");

        const disposable = this.repository.updateProfile(profileRequest);
        this.addDisposable(disposable);

        try {
          const result = await disposable.makeRequest();

          if (result.isOkay()) {
            //'Your profile successfully updated'
          } else {
            // 'Server error'
          }
        } catch (e) {
          Logcat.info("ERROR", e);
        } finally {
          this.clearDisposable(disposable);
        }
      }
    } catch (e) {
      Logcat.info(e);
    }
  };

  @action
  setProfileUser = (test: any) => {
    this.firstName = test.firstName;
    this.lastName = test.lastName;
    this.country = test.country;
    this.city = test.city;
    this.birthDate = test.birthDate;
    this.avatar = test.avatar;
  };

  @action
  onReset = () => {
    this.firstName = "";
    this.lastName = "";
    this.country = "";
    this.city = "";
    this.birthDate = "";
    this.hmqIDCode = "";
  };

  isAnyFieldEmpty = () =>
    isEmpty(this.firstName) ||
    isEmpty(this.lastNameError) ||
    isEmpty(this.country) ||
    isEmpty(this.city) ||
    isEmpty(this.birthDate);
}

export const UserStore = new User();

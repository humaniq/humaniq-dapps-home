import { action, makeAutoObservable } from "mobx";
import { getProviderStore } from "../App";
import { isEmpty } from "../utils/textUtils";
import Logcat from "../utils/logcat";
import { t } from "i18next";
import { ApiService } from "../services/apiService/apiService";
import {
  API_HUMANIQ_TOKEN,
  API_HUMANIQ_URL,
  HUMANIQ_ROUTES,
} from "../constants/api";
import { UserProfileResponse } from "../services/apiService/responses";
import dayjs from "dayjs";
import { DATE_FORMAT } from "../constants/general";
import { ALERT_TYPE } from "./appStore/alertStore";
import { setAlert } from "../utils/alert";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export class User {
  firstName = "";
  lastName = "";
  country = "";
  city = "";
  birthDate = "";

  firstNameError?: string;
  lastNameError?: string;
  countryError?: string;
  cityError?: string;
  birthDateError?: string;

  photoURI = "";
  isFetching = false;
  isRegistered: boolean = false;

  api: ApiService;

  constructor() {
    makeAutoObservable(this);
    this.api = new ApiService();
    this.api.init(API_HUMANIQ_URL, { "x-auth-token": API_HUMANIQ_TOKEN });
  }

  get getBirthDate() {
    return this.birthDate;
  }

  get fullName() {
    return this.firstName || this.lastName
      ? `${this.firstName} ${this.lastName}`
      : "User Name";
  }

  setFirstName = (value: string) => {
    this.firstNameError = undefined;
    this.firstName = value;
  };

  setLastName = (value: string) => {
    this.lastNameError = undefined;
    this.lastName = value;
  };

  setCountry = (value: string) => {
    this.countryError = undefined;
    this.country = value;
  };

  setCity = (value: string) => {
    this.cityError = undefined;
    this.city = value;
  };

  setBirthDate = (value: string) => {
    this.birthDate = value;
    this.birthDateError =
      this.birthDate.length === 10 &&
      !dayjs(this.birthDate, DATE_FORMAT, true).isValid()
        ? "Incorrect date format"
        : undefined;
  };

  fetchProfile = async () => {
    // some profile fetching
    this.isFetching = true;
    const result = await this.api.get(
      HUMANIQ_ROUTES.INTROSPECT.GET_SIGNUP_WALLET,
      { wallet: getProviderStore.currentAccount }
    );
    if (result.isOk) {
      this.isRegistered = true;
      this.setProfileUser(result.data as any);
    } else {
      this.isRegistered = false;
      this.onReset();
    }
    this.isFetching = false;
  };

  updatePhoto = async (file: File) => {
    const result = await this.api.post<{ url: string }>(
      HUMANIQ_ROUTES.PHOTO.POST_PHOTO,
      file,
      {},
      {
        headers: {
          "Content-Type": file.type,
        },
      }
    );
    if (result.isOk) {
      this.photoURI = result.data.url;
    } else {
      Logcat.info("ERROR", result);
    }
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

    if (this.isAnyFieldEmpty) {
      return;
    }

    const timeStamp = new Date().getTime();
    const request = `ADDRESS ${getProviderStore.currentAccount} UPDATE PERSONAL INFO TIMESTAMP ${timeStamp}`;
    try {
      const result = await getProviderStore.personalMessageRequest(request);
      if (result) {
        const body = {
          query: {
            addressFrom: getProviderStore.currentAccount,
            timeStamp,
            typeOperation: "UPSERT",
            typeMessage: "humaniqIdentity",
            payload: {
              lastName: this.lastName,
              firstName: this.firstName,
              birthDate: dayjs(this.birthDate, DATE_FORMAT).format(
                "DD.MM.YYYY"
              ),
              city: this.city,
              country: this.country,
              photoURI: this.photoURI,
            },
          },
          signature: result,
        };

        const response = await this.api.post(
          HUMANIQ_ROUTES.DAPP.POST_PROFILE_UPDATE,
          body
        );
        if (response.isOk) {
          setTimeout(() => {
            setAlert("Your profile successfuly updated");
          }, 2000);
          return true;
        } else {
          setAlert("Error", ALERT_TYPE.ERROR);
          Logcat.info("ERROR", response);
          return false;
        }
      }
    } catch (e) {
      setAlert("Error", ALERT_TYPE.ERROR);
      Logcat.info(e);
    }
  };

  @action
  setProfileUser = (test: UserProfileResponse) => {
    this.firstName = test.firstName;
    this.lastName = test.lastName;
    this.country = test.country;
    this.city = test.city;
    this.birthDate = test.birthDate;
    this.photoURI = test.photoURI;
  };

  @action
  onReset = () => {
    this.firstName = "";
    this.lastName = "";
    this.country = "";
    this.city = "";
    this.birthDate = "";
    this.photoURI = "";
  };

  get isAnyFieldEmpty() {
    return (
      isEmpty(this.firstName) ||
      isEmpty(this.lastName) ||
      isEmpty(this.country) ||
      isEmpty(this.city) ||
      isEmpty(this.birthDate) ||
      this.birthDate.length !== 10 ||
      !!this.birthDateError
    );
  }
}

export const UserStore = new User();

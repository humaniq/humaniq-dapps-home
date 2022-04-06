import { action, makeAutoObservable } from "mobx";
import { getProviderStore } from "../../App";
import { isEmpty } from "../../utils/textUtils";
import Logcat from "../../utils/logcat";
import { t } from "i18next";
import dayjs from "dayjs";
import { ApiService } from "../../services/apiService/apiService";
import {
  API_HUMANIQ_TOKEN,
  API_HUMANIQ_URL,
  HUMANIQ_ROUTES,
} from "../../constants/api";
import {
  UserPhotoUpdateResponse,
  UserProfileResponse,
  UserProfileUpdateResponse,
} from "../../services/apiService/responses";
import { DATE_FORMAT } from "../../constants/general";
import { message } from "antd";
import { ProfileUpdateRequest } from "../../services/apiService/requests";

class User {
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
  photoUploading = false;

  api: ApiService;

  constructor() {
    makeAutoObservable(this);
    this.api = new ApiService();
    this.api.init(API_HUMANIQ_URL, { "x-auth-token": API_HUMANIQ_TOKEN });
  }

  get getBirthDate() {
    return !isEmpty(this.birthDate)
      ? dayjs(this.birthDate, DATE_FORMAT)
      : dayjs();
  }

  get buttonDisabled() {
    return this.isAnyFieldEmpty();
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
    this.birthDateError = undefined;
    this.birthDate = value;
  };

  fetchProfile = async () => {
    this.isFetching = true;
    try {
      const result = await this.api.get<UserProfileResponse>(
        HUMANIQ_ROUTES.INTROSPECT.GET_SIGNUP_WALLET,
        { wallet: getProviderStore.currentAccount }
      );

      if (result.isOk) {
        this.setProfileUser(result.data);
      } else {
        Logcat.info("PROFILE FETCH ERROR", result);
      }
    } catch (e) {
      Logcat.info("PROFILE FETCH ERROR", e);
    } finally {
      this.isFetching = false;
    }
  };

  @action
  uploadPhoto = async (file: any) => {
    this.photoUploading = true;
    try {
      const response = await this.api.post<UserPhotoUpdateResponse>(
        HUMANIQ_ROUTES.DAPP.POST_PROFILE_PHOTO_UPDATE,
        file,
        null,
        {
          headers: { "Content-Type": "image/png" },
        }
      );

      if (response.isOk) {
        this.photoURI = response.data.url;
      } else {
        Logcat.info("PHOTO UPLOAD ERROR");
      }
    } catch (e) {
      Logcat.info("PHOTO UPLOAD ERROR", e);
    } finally {
      this.photoUploading = false;
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

    if (this.isAnyFieldEmpty()) {
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
              birthDate: this.birthDate,
              city: this.city,
              country: this.country,
              photoUrl: this.photoURI,
            },
          },
          signature: result,
        } as ProfileUpdateRequest;

        const response = await this.api.post<UserProfileUpdateResponse>(
          HUMANIQ_ROUTES.DAPP.POST_PROFILE_UPDATE,
          body
        );

        if (response.isOk) {
          message.success(t("userProfile.successUpdate"));
        } else {
          message.error(t("userProfile.errorUpdate"));
          Logcat.info("ERROR", response);
        }
      }
    } catch (e) {
      message.error(t("userProfile.errorSign"));
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

  isAnyFieldEmpty = () =>
    isEmpty(this.firstName) ||
    isEmpty(this.lastName) ||
    isEmpty(this.country) ||
    isEmpty(this.city) ||
    isEmpty(this.birthDate);
}

export const UserStore = new User();

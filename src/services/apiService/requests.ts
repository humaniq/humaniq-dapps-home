export interface ProfileUpdateRequest {
  query: ProfileUpdateRequestQuery;
  signature: any;
}

export type ProfileUpdateRequestQuery = {
  addressFrom: any;
  timeStamp: number;
  typeOperation: string;
  typeMessage: string;
  payload: ProfileUpdateRequestPayload;
};

export type ProfileUpdateRequestPayload = {
  lastName: string;
  firstName: string;
  birthDate: string;
  city: string;
  country: string;
  photoUrl?: string;
};

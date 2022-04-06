export interface UserProfileResponse {
  birthDate: string;
  city: string;
  confirmed: boolean;
  country: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  photoURI: string;
  uid: string;
}

export interface UserProfileUpdateResponse {
  status: string;
  message: string;
  uid: string;
}

export interface UserPhotoUpdateResponse {
  status: string;
  url: string;
}

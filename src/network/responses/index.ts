export interface ProfileUpdateResponse {
  success: string
}

export interface ProfileFetchResponse {
  uid: string
  birthDate: string
  country: string
  city: string
  firstName: string
  lastName: string
  createdAt: number
}
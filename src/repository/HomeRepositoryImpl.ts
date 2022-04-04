import Future from "../network/Future"
import BaseResponse from "../network/models/BaseResponse"
import { Method } from "../network/NetworkService"
import ApiService from "../network/api/ApiService"
import { RequestConfig } from "../network/models/RequestConfig"
import { ProfileUpdateRequest } from "../network/requests"
import { ProfileFetchResponse, ProfileUpdateResponse } from "../network/responses"
import { HomeRepository } from "./types"

export class HomeRepositoryImpl implements HomeRepository {
  updateProfile(
    body: ProfileUpdateRequest,
    config?: RequestConfig): Future<BaseResponse<ProfileUpdateResponse>> {
    return new Future<BaseResponse<ProfileUpdateResponse>>(
      Method.POST,
      ApiService.updateProfile(),
      body,
      null
    )
  }

  fetchProfile(wallet: string, config?: RequestConfig): Future<BaseResponse<ProfileFetchResponse>> {
    return new Future<BaseResponse<ProfileFetchResponse>>(
      Method.GET,
      ApiService.getProfile(wallet),
      null,
      config
    )
  }
}
import Future from "../network/Future"
import BaseResponse from "../network/models/BaseResponse"
import { Method } from "../network/NetworkService"
import ApiService from "../network/api/ApiService"
import { RequestConfig } from "../network/models/RequestConfig"
import { ProfileUpdateRequest } from "../network/requests"
import { ProfileUpdateResponse } from "../network/responses"
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
}
import { ProfileUpdateRequest } from "../../network/requests"
import { RequestConfig } from "../../network/models/RequestConfig"
import Future from "../../network/Future"
import BaseResponse from "../../network/models/BaseResponse"
import { ProfileFetchResponse, ProfileUpdateResponse } from "../../network/responses"

export interface HomeRepository {
  updateProfile(
    body: ProfileUpdateRequest,
    config?: RequestConfig): Future<BaseResponse<ProfileUpdateResponse>>;

  fetchProfile(wallet: string, config?: RequestConfig): Future<BaseResponse<ProfileFetchResponse>>;
}
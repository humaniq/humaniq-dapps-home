import BaseResponse from "./BaseResponse";
import { AxiosRequestConfig } from "axios";
import { isOk } from "../../utils/networkUtils"

class BaseResponseImpl<T = any> implements BaseResponse<T> {
  data: T;
  status: number;
  statusText: string;
  config: AxiosRequestConfig;
  headers: any;
  request?: any;

  constructor(
    data: T,
    status: number,
    statusText: string,
    config: AxiosRequestConfig,
    headers: any,
    request: any,
  ) {
    this.data = data;
    this.status = status;
    this.statusText = statusText;
    this.config = config;
    this.headers = headers;
    this.request = request;
  }

  isOkay(): boolean {
    return isOk(this.status);
  }
}

export default BaseResponseImpl;
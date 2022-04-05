import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { API_HUMANIQ_URL } from "../../constants/api";
import { formatRoute } from "../../utils/network";

export interface ApiServiceResponse<T> extends AxiosResponse<T> {
  isOk: boolean;
}

export class ApiService {
  axios: AxiosInstance;
  init = (baseURL: string = API_HUMANIQ_URL, headers = {}) => {
    this.axios = axios.create({ baseURL, headers });

    this.axios.interceptors.response.use(
      function (response) {
        return { ...response, isOk: true };
      },
      function (error) {
        return Promise.resolve({ ...error, isOk: false }); // Promise.reject(error);
      }
    );
  };
  get = async (path: string, params?: any, config?: AxiosRequestConfig) =>
    this.axios.get(formatRoute(path, params), config) as Promise<
      ApiServiceResponse<any>
    >;
  post = async (
    path: string,
    body?: any,
    params?: any,
    config?: AxiosRequestConfig
  ) =>
    this.axios.post(
      params ? formatRoute(path, params) : path,
      body,
      config
    ) as Promise<ApiServiceResponse<any>>;
}

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import Logcat from "../logcat/Logcat"
import BaseResponseImpl from "./models/BaseResponseImpl"
import { RequestConfig } from "./models/RequestConfig"

const REQUEST_TIMEOUT = 30000 // 30 seconds

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  UPDATE = 'update',
  PATCH = 'patch',
}

axios.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    logRequest(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    logResponse(response)
    return new BaseResponseImpl(
      response.data,
      response.status,
      response.statusText,
      response.config,
      response.headers,
      response.request
    )
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 * Function to execute HTTP requests
 *
 * @param httpMethod
 * @param pathname
 * @param data
 * @param config
 * @param baseUrl
 */
const executeRequest = <T>(
  httpMethod: string,
  pathname: string,
  data: any,
  config?: RequestConfig,
  baseUrl: string = "some base url"
) => {
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  if (config && config.headers) {
    Object.assign(options.headers, config.headers)
  }

  return axios({
    baseURL: baseUrl,
    method: httpMethod,
    url: pathname,
    data: data,
    headers: options.headers,
    timeout: REQUEST_TIMEOUT,
    timeoutErrorMessage: "error"
  } as AxiosRequestConfig) as unknown as Promise<T>
}

const NetworkService = {
  /**
   * HTTP GET method
   *
   * @param path
   * @param config
   * @param baseUrl
   */
  get: <T>(path: string, config?: RequestConfig, baseUrl?: string) => {
    return executeRequest<T>(
      Method.GET,
      path,
      null,
      config,
      baseUrl
    )
  },
  /**
   * HTTP POST method
   *
   * @param path
   * @param data
   * @param config
   * @param baseUrl
   */
  post: <T>(path: string, data: any, config?: RequestConfig, baseUrl?: string) => {
    return executeRequest<T>(
      Method.POST,
      path,
      data,
      config,
      baseUrl
    )
  },
  /**
   * HTTP PATCH method
   *
   * @param path
   * @param data
   * @param config
   * @param baseUrl
   */
  patch: <T>(path: string, data: any, config?: RequestConfig, baseUrl?: string) => {
    return executeRequest<T>(
      Method.PATCH,
      path,
      data,
      config,
      baseUrl
    )
  },
  /**
   * HTTP PUT method
   *
   * @param path
   * @param data
   * @param config
   * @param baseUrl
   */
  put: <T>(path: string, data: any, config?: RequestConfig, baseUrl?: string) => {
    return executeRequest<T>(
      Method.PUT,
      path,
      data,
      config,
      baseUrl
    )
  },
  /**
   * HTTP DELETE method
   *
   * @param path
   * @param data
   * @param config
   * @param baseUrl
   */
  delete: <T>(path: string, data: any, config?: RequestConfig, baseUrl?: string) => {
    return executeRequest<T>(
      Method.DELETE,
      path, data,
      config,
      baseUrl
    )
  },
  /**
   * Combines all promises and runs it
   *
   * @param promises
   */
  all(promises: Promise<unknown>[]) {
    return axios.all(promises)
  }
}

/**
 * Logging request
 *
 * @param config
 */
const logRequest = (config: AxiosRequestConfig) => {
  if (config) {
    let message =
      'REQUEST ' +
      (config.method ? String(config.method) : 'undefined method name').toUpperCase() +
      ' ' +
      config.baseURL +
      config.url
    Logcat.info(`${ message }`)

    if (config.data) {
      Logcat.info('Request body: ', config.data)
    }
  }
}

/**
 * Logging response
 *
 * @param response
 */
const logResponse = (response?: AxiosResponse) => {
  if (response) {
    let message =
      'RESPONSE ' +
      (response.config.method ? String(response.config.method) : 'undefined method name').toUpperCase() +
      ' ' +
      response.config.url
    let statusCode = response.status.toString()
    Logcat.info(`${ message } ${ statusCode }`)
    Logcat.info('\nResponse: ' + JSON.stringify(response.data))
  }
}

export default NetworkService
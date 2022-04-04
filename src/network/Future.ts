import axios, { CancelTokenSource } from 'axios'
import Disposable from './Disposable'
import NetworkService, { Method } from "./NetworkService"

/**
 * Wrapper class above Promise to make requests and dispose them when needed
 */
export default class Future<T = any> implements Disposable<T> {
  /**
   * Axios token to cancel request
   */
  protected tokenSource: CancelTokenSource
  /**
   * Http method (e.g. GET, POST, etc.)
   */
  protected httpMethod: string = Method.GET // by default 'get'
  /**
   * Request url
   */
  protected url: string
  /**
   * Body to make post/put requests
   */
  protected data?: any
  /**
   * Config object contains headers, cancel tokens and etc
   */
  protected config?: any
  /**
   * Base url
   */
  protected baseUrl?: string

  constructor(
    httpMethod: string,
    url: string,
    data?: any,
    config?: any,
    baseUrl?: string
  ) {
    this.httpMethod = httpMethod
    this.url = url
    this.data = data
    this.config = config
    this.baseUrl = baseUrl
    this.tokenSource = axios.CancelToken.source()
  }

  makeRequest = (): Promise<T> => {
    if (!this.config) {
      this.config = {}
    }

    Object.assign(this.config, {
      cancelToken: this.tokenSource.token
    })

    const { url: pathname, data, config, baseUrl } = this

    if (this.httpMethod === Method.POST) {
      return NetworkService.post<T>(pathname, data, config, baseUrl)
    }

    if (this.httpMethod === Method.PUT) {
      return NetworkService.put<T>(pathname, data, config, baseUrl)
    }

    if (this.httpMethod === Method.PATCH) {
      return NetworkService.patch<T>(pathname, data, config, baseUrl)
    }

    if (this.httpMethod === Method.DELETE) {
      return NetworkService.delete<T>(pathname, data, config, baseUrl)
    }

    return NetworkService.get<T>(pathname, config, baseUrl)
  }

  dispose = (): void => {
    if (this.tokenSource) {
      this.tokenSource.cancel('Cancel')
    }
  }
}
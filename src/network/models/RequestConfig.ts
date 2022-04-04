export interface RequestConfig {
  /**
   * Custom settings to pass to NetworkService
   */
  settings?: RequestSettings | undefined;
  /**
   * Custom headers to pass to NetworkService
   */
  headers?: RequestHeaders | undefined;
}

export type RequestSettings = {
  /**
   * Enable or disable global error handler for current network call
   */
  handleGlobalError?: boolean;
  /**
   * Skip token authorization check for current network call
   */
  skipAuthorization?: boolean;
  /**
   * Choose how to show error for current network call
   * by default it's dialog
   */
};

export type RequestHeaders = {
  [key: string]: string;
};
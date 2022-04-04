/**
 * Represents a disposable resource.
 */
export default interface Disposable<T = any> {
  /**
   * Disposes the resource.
   */
  dispose(): void;

  /**
   * Start making a request.
   */
  makeRequest(): Promise<T>;
}
import { AxiosResponse } from 'axios';

export default interface BaseResponse<T = any> extends AxiosResponse<T> {
  isOkay(): boolean;
}
import {
  InternalAxiosRequestConfig,
  type AxiosError,
  type AxiosResponse,
} from 'axios';
import { StorageService } from '../services/StorageService';
import { IUserData } from '../utils/interfaces';

export interface ConsoleError {
  status: number;
  data: unknown;
}

export const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const user = StorageService.readLocalStorage<IUserData>('user');

  if (user?.token && user.token.accessToken) {
    config.headers.set('Authorization', `Bearer ${user.token.accessToken}`);
  }
  return config;
};

export const successInterceptor = (response: AxiosResponse): AxiosResponse => {
  return response;
};

export const errorInterceptor = async (error: AxiosError): Promise<void> => {
  if (error.response?.status === 401) {
    await Promise.reject(error);
  } else {
    if (error.response) {
      const errorMessage: ConsoleError = {
        status: error.response.status,
        data: error.response.data,
      };
      console.error(errorMessage);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }
    await Promise.reject(error);
  }
};

/* eslint-disable no-param-reassign */
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Envs, ensureEnvironments } from '../config/index';
import { StorageService } from '../services/StorageService';
import { IUserData } from '../utils/interfaces';
import { showToast } from '../helper/toasterHelper';

// Retrieve environment variables
const env: Envs = ensureEnvironments();

// Configure Axios instance
const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: env.VITE_API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

// Create Axios instance
const api: AxiosInstance = axios.create(axiosRequestConfig);

// Flag to track whether a token refresh is in progress
let isRefreshing = false;

// Queue to store pending requests during token refresh
const requestQueue: Array<() => void> = [];

/**
 * Function to refresh the access token.
 * @returns A promise that resolves to an object containing the new access token and refresh token.
 */
async function refreshAccessToken(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const user = StorageService.readLocalStorage<IUserData>('user');
  if (user) {
    const { token } = user;

    // Make a request to the "refresh-tokens" endpoint to get new access and refresh tokens
    const response = await api.post<{
      access: { token: string };
      refresh: { token: string };
    }>('auth/refresh-tokens', {
      refreshToken: token.refreshToken,
    });

    const { access, refresh } = response.data;
    return { accessToken: access.token, refreshToken: refresh.token };
  }

  // Return empty tokens if user data is not available
  return { accessToken: '', refreshToken: '' };
}

// Add an Axios interceptor to handle request errors
api.interceptors.request.use(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (config: any) => {
    const user = StorageService.readLocalStorage<IUserData>('user');
    if (user) {
      const { token } = user;
      // Add the access token to the request headers
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token.accessToken}`,
      };
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Add an Axios interceptor to handle response errors
api.interceptors.response.use(
  (response: AxiosResponse<unknown>) => {
    // You can modify the response data here if needed
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (error: AxiosError<any>) => {
    if (error.response && error.response.status === 401) {
      // Access token expired or not authorized
      const originalRequest: AxiosRequestConfig | undefined = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        try {
          // Refresh the access token
          const { accessToken, refreshToken } = await refreshAccessToken();
          isRefreshing = false;

          // Update the user's access token and refresh token in local storage
          const user = StorageService.readLocalStorage<IUserData>('user');
          if (user) {
            user.token = {
              accessToken,
              refreshToken,
            };
            StorageService.writeLocalStorage('user', user);
          }

          // Retry the original request with the new access token
          if (originalRequest) {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${refreshToken}`,
            } ?? { Authorization: `Bearer ${refreshToken}` };
            return await api.request(originalRequest);
          }
        } catch (refreshError) {
          // Refresh token API failed or returned a non-401 error
          // Remove the user data from local storage
          StorageService.removeLocalStorage('user');
          // Redirect to the "/try-now" route
          window.location.href = '/try-now';
          return Promise.reject(refreshError);
        }
      } else {
        // The refresh token request is already in progress, enqueue the original request
        return new Promise((resolve) => {
          requestQueue.push(() => {
            // Retry the original request with the new access token
            const user = StorageService.readLocalStorage<IUserData>('user');
            if (user) {
              const { accessToken } = user.token;
              if (originalRequest) {
                originalRequest.headers = {
                  ...originalRequest.headers,
                  Authorization: `Bearer ${accessToken}`,
                } ?? { Authorization: `Bearer ${accessToken}` };
                resolve(api.request(originalRequest));
              }
            } else {
              // Handle the case where user data is not available
              resolve(Promise.reject(error));
            }
          });
        });
      }
    } else if (error.response?.status === 400) {
      showToast(error.response.data.message);
    }

    return Promise.reject(error);
  }
);

export { api };

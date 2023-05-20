import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { Envs, ensureEnvironments } from '../config/index';
import { StorageService } from '../services/StorageService';
import { IUserData } from '../utils/interfaces';

const env: Envs = ensureEnvironments();

const axiosRequestConfig: AxiosRequestConfig = {
  baseURL: env.VITE_API_BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
};

const api: AxiosInstance = axios.create(axiosRequestConfig);

let isRefreshing = false;
const requestQueue: Array<() => void> = [];

// Function to refresh the access token
async function refreshAccessToken(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  // Implement your logic to refresh the access token
  // For example, make a request to the server with the refresh token and get a new access token
  const user = StorageService.readLocalStorage<IUserData>('user');
  if (user) {
    const { token } = user;
    const response = await api.post<{
      access: { token: string };
      refresh: { token: string };
    }>('auth/refresh-tokens', {
      refreshToken: token.refreshToken,
    });

    const { access, refresh } = response.data;
    return { accessToken: access.token, refreshToken: refresh.token };
  }

  // Return an empty object or handle the error case as needed
  return { accessToken: '', refreshToken: '' };
}

// Add an Axios interceptor to handle request errors
api.interceptors.request.use(
  async (config: any) => {
    // Add your logic to modify the request config if needed
    // For example, add authentication headers
    const user = StorageService.readLocalStorage<IUserData>('user');
    if (user) {
      const { token } = user;
      // eslint-disable-next-line no-param-reassign
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
  async (error: AxiosError<unknown>) => {
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Access token expired or not authorized
      const originalRequest: AxiosRequestConfig | undefined = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const { accessToken, refreshToken } = await refreshAccessToken();
          isRefreshing = false;

          // Update the user's access token and refresh token in local storage
          const user = StorageService.readLocalStorage<IUserData>('user');
          if (user) {
            user.token.accessToken = accessToken;
            user.token.refreshToken = refreshToken;
            StorageService.writeLocalStorage('user', user);
          }

          // Retry the original request with the new access token
          if (originalRequest) {
            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${accessToken}`,
            } ?? { Authorization: `Bearer ${accessToken}` };
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
    }
    return Promise.reject(error);
  }
);

export { api };

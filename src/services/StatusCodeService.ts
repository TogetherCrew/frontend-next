import { useNavigate } from 'react-router-dom';
import { showToast } from '../helper/toasterHelper';
import { StorageService } from './StorageService';
import { CallbackUrlParams } from '../utils/interfaces';

const useStatusCodeService = () => {
  const navigate = useNavigate();
  let isToastShown = false; // Flag to track if a toast is currently shown

  /**
   * Display a toast notification for failed authentication.
   */
  const notifyAsToast = () => {
    if (!isToastShown) {
      showToast('Discord authentication failed. Please try again.');
      isToastShown = true;
    }
  };

  /**
   * Redirect to the specified route.
   * @param {string} pathname - The pathname of the route.
   * @param {CallbackUrlParams} params - The callback URL parameters.
   */
  const redirectToRoute = (pathname: string, params?: CallbackUrlParams) => {
    // Convert the callback URL parameters to a URL query string
    const urlParams: Record<string, string> = params
      ? Object.entries(params).reduce((acc, [key, value]) => {
          return { ...acc, [key]: value };
        }, {})
      : {};

    const searchParams = new URLSearchParams(urlParams);
    const queryString = searchParams.toString();

    const url = `${pathname}${queryString ? `?${queryString}` : ''}`;
    navigate(url);
  };

  /**
   * Write user data to local storage.
   * @param {CallbackUrlParams} params - The callback URL parameters.
   */
  const writeUserToLocalStorage = (
    params: CallbackUrlParams,
    _key?: string
  ) => {
    const key = _key || 'user';

    StorageService.writeLocalStorage(key, {
      guild: {
        guildId: params.guildId,
        guildName: params.guildName,
      },
      token: {
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      },
    });
  };

  /**
   * Handle the status code and perform the corresponding actions.
   * @param {CallbackUrlParams} params - The callback URL parameters.
   */
  const handleStatusCode = (params: CallbackUrlParams) => {
    const { statusCode } = params;

    switch (statusCode) {
      case '490':
        notifyAsToast();
        redirectToRoute('/try-now');
        break;
      case '491':
        notifyAsToast();
        redirectToRoute('/settings');
        break;
      case '501':
      case '502':
        redirectToRoute('/try-now', params);
        break;
      case '503':
      case '504':
      case '601':
        writeUserToLocalStorage(params);
        redirectToRoute('/community-insights');
        break;
      case '602':
        StorageService.removeLocalStorage('user');
        redirectToRoute('/try-now');
        break;
      case '603':
        writeUserToLocalStorage(params);
        redirectToRoute('/community-insights');
        break;
      case '701':
      case '702':
        writeUserToLocalStorage(params);
        redirectToRoute('/settings');
        break;
      default:
        break;
    }
  };

  // Return the handleStatusCode function to be used in the component
  return { handleStatusCode, writeUserToLocalStorage };
};

export default useStatusCodeService;

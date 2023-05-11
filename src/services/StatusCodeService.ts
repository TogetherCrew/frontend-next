import { useNavigate } from 'react-router-dom';
import { showToast } from '../helper/toasterHelper';
import { StorageService } from './StorageService';

interface CallbackUrlParams {
  statusCode: string;
  accessToken: string;
  accessExp: string;
  refreshExp: string;
  refreshToken: string;
  guildId: string;
  guildName: string;
}

class StatusCodeService {
  // Obtain the navigate function from react-router-dom
  private static navigate = useNavigate();

  /**
   * Displays a toast notification for failed authentication.
   */
  private static showToast() {
    showToast('Discord authentication failed. Please try again.');
  }

  /**
   * Redirects to the specified route with optional query parameters.
   * @param pathname - The path of the route to navigate to.
   * @param params - Optional query parameters as an object.
   */
  private static redirectToRoute(pathname: string, params?: CallbackUrlParams) {
    // Convert the params object into a query string
    const urlParams: Record<string, string> = params
      ? Object.entries(params).reduce((acc, [key, value]) => {
          return { ...acc, [key]: value };
        }, {})
      : {};

    const searchParams = new URLSearchParams(urlParams);
    const queryString = searchParams.toString();

    // Construct the full URL with the path and query string
    const url = `${pathname}${queryString ? `?${queryString}` : ''}`;

    // Navigate to the specified URL
    this.navigate(url);
  }

  /**
   * Handles the status code and performs the corresponding actions.
   * @param params - The callback URL parameters.
   */
  static handleStatusCode(params: CallbackUrlParams) {
    const { statusCode } = params;

    switch (statusCode) {
      case '490':
        this.showToast();
        this.redirectToRoute('/try-now');
        break;
      case '491':
        this.showToast();
        this.redirectToRoute('/settings');
        break;
      case '501':
      case '502':
        this.redirectToRoute('/try-now', params);
        break;
      case '503':
      case '504':
      case '601':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        this.redirectToRoute('/');
        break;
      case '602':
        StorageService.removeLocalStorage('user');
        this.redirectToRoute('/try-now');
        break;
      case '603':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        this.redirectToRoute('/');
        break;
      case '701':
      case '702':
        StorageService.writeLocalStorage('user', {
          guild: {
            guildId: params.guildId,
            guildName: params.guildName,
          },
          token: {
            accessToken: params.accessToken,
            accessExp: params.accessExp,
            refreshToken: params.refreshToken,
            refreshExp: params.refreshExp,
          },
        });
        this.redirectToRoute('/settings');
        break;
      default:
        break;
    }
  }
}

export default StatusCodeService;

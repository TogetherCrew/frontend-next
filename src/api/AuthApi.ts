import { api } from '../lib/api';
import { IAuthTokens } from '../utils/interfaces';

/**
 * AuthApi class provides methods to interact with the auth API.
 */
class AuthApi {
  /**
   * Logs in the user using a Discord account.
   */
  public static loginWithDiscordAccount(): void {
    const discordLoginUrl = `${import.meta.env.VITE_API_BASE_URL}auth/login`;
    window.location.href = discordLoginUrl;
  }

  /**
   * Redirects to the Discord authorization URL for the "Try Now" experience.
   */
  public static redirectToDiscord(): void {
    const discordAuthUrl = `${import.meta.env.VITE_API_BASE_URL}auth/try-now`;
    window.location.href = discordAuthUrl;
  }

  /**
   * Refreshes the access token.
   * @param refreshToken - The refresh token.
   * @returns A Promise that resolves to an object containing both the access token and the refresh token.
   */
  public static async refreshAccessToken(
    refreshToken: string
  ): Promise<IAuthTokens> {
    try {
      const response = await api.post('/auth/refresh-tokens', { refreshToken });
      const { access, refresh } = response.data.tokens;
      return { access, refresh };
    } catch (error) {
      throw new Error('Failed to refresh access token');
    }
  }

  /**
   * Logs out the user by revoking the refresh token.
   * @param refreshToken - The refresh token.
   * @returns A Promise that resolves when the user is logged out.
   */
  public static async logout(refreshToken: string) {
    try {
      await api.post('/auth/logout', { refreshToken });
    } catch (error) {
      throw new Error('Failed to logout');
    }
  }
}

export default AuthApi;

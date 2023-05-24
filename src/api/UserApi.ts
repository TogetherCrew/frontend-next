import { api } from '../lib/api';
import { IUserGuildResponse, IUserResponse } from '../utils/interfaces';

/**
 * UserApi class provides methods to interact with the User API.
 */
class UserApi {
  /**
   * Fetches the guilds where the user has an admin role.
   * @returns A Promise that resolves to an array of user guilds with admin role.
   * @throws Error if the request fails.
   */
  public static async getUserGuildsWithAdminRole(): Promise<
    IUserGuildResponse[]
  > {
    try {
      const response = await api.get('/users/@me/guilds-with-admin-role');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user guilds with admin role');
    }
  }

  /**
   * Fetches the user information.
   * @returns A Promise that resolves to the user object.
   * @throws Error if the request fails.
   */
  public static async getUserInfo(): Promise<IUserResponse> {
    try {
      const response = await api.get('/users/@me');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user information');
    }
  }

  /**
   * Updates the user's email.
   * @param payload - The payload containing the email to be updated.
   * @returns A Promise that resolves to the updated user object.
   * @throws Error if the request fails.
   */
  public static async updateEmail(payload: {
    email: string;
  }): Promise<IUserResponse> {
    try {
      const response = await api.patch('/users/@me', payload);
      return response.data;
    } catch (error) {
      throw new Error('Failed to update user email');
    }
  }
}

export default UserApi;

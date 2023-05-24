import { api } from '../lib/api';
import {
  IGuildQueryOptions,
  IGuildPayloadOptions,
  IDisconnectTypeValue,
} from '../utils/interfaces';

/**
 * GuildApi class provides methods to interact with the Guild API.
 */
class GuildApi {
  /**
   * Fetches all guilds based on the specified query options.
   * @param options - Query options to filter and paginate guilds.
   * @returns A Promise that resolves to the fetched guilds data.
   */
  public static async getAllGuilds(options: IGuildQueryOptions) {
    try {
      const { isInProgress, isDisconnected, sortBy, limit, page } = options;
      const response = await api.get('guilds', {
        params: {
          isInProgress,
          isDisconnected,
          sortBy,
          limit,
          page,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch all guilds');
    }
  }

  /**
   * Fetches a specific guild by its ID.
   * @param guildId - The ID of the guild to fetch.
   * @returns A Promise that resolves to the fetched guild data.
   */
  public static async getGuildById(guildId: string) {
    try {
      const response = await api.get(`/guilds/${guildId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch guild with ID ${guildId}`);
    }
  }

  /**
   * Fetches guild information from the Discord API based on the guild ID.
   * @param guildId - The ID of the guild to fetch from the Discord API.
   * @returns A Promise that resolves to the fetched guild data.
   */
  public static async getGuildByIdFromDiscordAPI(guildId: string) {
    try {
      const response = await api.get(`/guilds/discord-api/${guildId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch guild with ID ${guildId} from Discord API`
      );
    }
  }

  /**
   * Fetches the channels of a guild by its ID.
   * @param guildId - The ID of the guild to fetch the channels for.
   * @returns A Promise that resolves to the fetched channels data.
   */
  public static async getGuildChannelsById(guildId: string) {
    try {
      const response = await api.get(`/guilds/${guildId}/channels`);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch channels for guild with ID ${guildId}`);
    }
  }

  /**
   * Fetches the selected channels of a guild by its ID.
   * @param guildId - The ID of the guild to fetch the selected channels for.
   * @returns A Promise that resolves to the fetched selected channels data.
   */
  public static async getSelectedChannelsById(guildId: string) {
    try {
      const response = await api.get(`/guilds/${guildId}/selected-channels`);
      return response.data;
    } catch (error) {
      throw new Error(
        `Failed to fetch selected channels for guild with ID ${guildId}`
      );
    }
  }

  /**
   * Updates a guild with the provided guild data.
   * @param guildId - The ID of the guild to update.
   * @param guildData - The data to update the guild with.
   * @returns A Promise that resolves to the updated guild data.
   */
  public static async updateGuild(
    guildId: string,
    guildData: IGuildPayloadOptions
  ) {
    try {
      const response = await api.patch(`/guilds/${guildId}`, guildData);
      return response.data;
    } catch (error) {
      throw new Error(`Failed to update guild with ID ${guildId}`);
    }
  }

  /**
   * Disconnects a guild based on the disconnect type.
   * @param guildId - The ID of the guild to disconnect.
   * @param disconnectType - The type of disconnect (soft or hard).
   * @returns A Promise that resolves to the result of the disconnect action.
   */
  public static async disconnectGuild(
    guildId: string,
    disconnectType: IDisconnectTypeValue
  ) {
    try {
      const response = await api.post(
        `/guilds/${guildId}/disconnect`,
        disconnectType
      );
      return response.data;
    } catch (error) {
      throw new Error(`Failed to disconnect guild with ID ${guildId}`);
    }
  }

  /**
   * Redirects to the Discord authorization URL for guild connection.
   */
  public static redirectToDiscordFromSettings(): void {
    const discordConnectGuildUrl = `${
      import.meta.env.VITE_API_BASE_URL
    }guilds/connect`;
    window.location.href = discordConnectGuildUrl;
  }
}

export default GuildApi;

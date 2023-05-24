import { api } from '../lib/api';
import { IHeatmapChartPayload, IGraphPeriodPayload } from '../utils/interfaces';

/**
 * GraphApi class provides methods to interact with the graph API.
 */
class GraphApi {
  /**
   * Retrieves the heatmap chart data for a guild.
   * @param guildId - The ID of the guild.
   * @param payload - The heatmap chart payload.
   * @returns The heatmap chart data.
   * @throws Error if the request fails.
   */
  public static async getHeatmapChart(
    guildId: string,
    payload: IHeatmapChartPayload
  ) {
    try {
      const response = await api.post(
        `/heatmaps/${guildId}/heatmap-chart`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get heatmap chart');
    }
  }

  /**
   * Retrieves the line graph data for a guild's heatmap.
   * @param guildId - The ID of the guild.
   * @param payload - The graph period payload.
   * @returns The line graph data.
   * @throws Error if the request fails.
   */
  public static async getHeatmapLineGraph(
    guildId: string,
    payload: IGraphPeriodPayload
  ) {
    try {
      const response = await api.post(
        `/heatmaps/${guildId}/line-graph`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get line graph');
    }
  }

  /**
   * Retrieves the line graph data for the composition of active members in a guild.
   * @param guildId - The ID of the guild.
   * @param payload - The graph period payload.
   * @returns The line graph data.
   * @throws Error if the request fails.
   */
  public static async getActiveMembersCompositionLineGraph(
    guildId: string,
    payload: IGraphPeriodPayload
  ) {
    try {
      const response = await api.post(
        `/member-activity/${guildId}/active-members-composition-line-graph`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get active members composition line graph');
    }
  }

  /**
   * Retrieves the line graph data for the composition of disengaged members in a guild.
   * @param guildId - The ID of the guild.
   * @param payload - The graph period payload.
   * @returns The line graph data.
   * @throws Error if the request fails.
   */
  public static async getDisengagedMembersCompositionLineGraph(
    guildId: string,
    payload: IGraphPeriodPayload
  ) {
    try {
      const response = await api.post(
        `/member-activity/${guildId}/disengaged-members-composition-line-graph`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error(
        'Failed to get disengaged members composition line graph'
      );
    }
  }

  /**
   * Retrieves the line graph data for the composition of inactive members in a guild.
   * @param guildId - The ID of the guild.
   * @param payload - The graph period payload.
   * @returns The line graph data.
   * @throws Error if the request fails.
   */
  public static async getInactiveMembersLineGraph(
    guildId: string,
    payload: IGraphPeriodPayload
  ) {
    try {
      const response = await api.post(
        `/member-activity/${guildId}/inactive-members-line-graph`,
        payload
      );
      return response.data;
    } catch (error) {
      throw new Error('Failed to get inactive members line graph');
    }
  }
}

export default GraphApi;

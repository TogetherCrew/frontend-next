import { useQuery } from 'react-query';
import GraphApi from '../api/GraphApi';
import { IHeatmapChartPayload } from '../utils/interfaces';

export default function useHeatmapChart(
  guildId: string,
  payload: IHeatmapChartPayload
) {
  const fetchHeatmapChart = async () => {
    const data = await GraphApi.getHeatmapChart(guildId, payload);
    return data;
  };

  return useQuery('heatmapChart', fetchHeatmapChart, {
    refetchInterval: 60000,
  });
}

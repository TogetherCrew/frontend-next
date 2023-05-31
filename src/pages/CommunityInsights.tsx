import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import TcHeatmap from '../components/charts/TcHeatmap';
import useHeatmapChart from '../hooks/GraphHooks';
import { IHeatmapChartPayload } from '../utils/interfaces';
import { Box } from '@mui/material';

// Load the dayjs plugins
dayjs.extend(utc);
dayjs.extend(timezone);

function CommunityInsights() {
  // Get the user's local timezone
  const timeZone = dayjs.tz.guess();

  const endDate = dayjs().format('YYYY-MM-DD');
  const startDate = dayjs().subtract(6, 'day').format('YYYY-MM-DD');

  const payload: IHeatmapChartPayload = {
    timeZone,
    channelIds: [],
    startDate,
    endDate,
  };

  const heatmapChartQuery = useHeatmapChart('1012430565959553145', payload);
  const { isLoading, error, data: heatmapData } = heatmapChartQuery;

  const xAxisCategories: string[] = [
    '12 AM',
    '1 AM',
    '2 AM',
    '3 AM',
    '4 AM',
    '5 AM',
    '6 AM',
    '7 AM',
    '8 AM',
    '9 AM',
    '10 AM',
    '11 AM',
    '12 PM',
    '1 PM',
    '2 PM',
    '3 PM',
    '4 PM',
    '5 PM',
    '6 PM',
    '7 PM',
    '8 PM',
    '9 PM',
    '10 PM',
    '11 PM',
  ];

  const yAxisCategories: string[] = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return (
    <div>
      <TcHeatmap
        data={heatmapData}
        xAxisCategories={xAxisCategories}
        yAxisCategories={yAxisCategories}
      />{' '}
    </div>
  );
}

export default CommunityInsights;

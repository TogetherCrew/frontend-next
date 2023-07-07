import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Box, Container, Typography } from '@mui/material';
import TcHeatmap from '../components/charts/TcHeatmap';
import useHeatmapChart from '../hooks/GraphHooks';
import { IHeatmapChartPayload } from '../utils/interfaces';
import BoxContainer from '../components/BoxContainer';
import TcPeriodPicker from '../components/TcPeriodPicker';

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
    channelIds: [
      '1012430565959553148',
      '1012430565959553149',
      '1018893637326749858',
    ],
    startDate,
    endDate,
  };

  const heatmapChartQuery = useHeatmapChart('1012430565959553145', payload);
  const { isLoading, error, data: heatmapData } = heatmapChartQuery;

  const xAxisCategories: string[] = [
    '12',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
  ];

  const yAxisCategories: string[] = [
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT',
    'SUN',
  ];

  return (
    <Container maxWidth="xl">
      <BoxContainer width="auto" height="auto" p={4}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="initial">
            When is the community most active?
          </Typography>
          <TcPeriodPicker />
        </Box>
        <Typography variant="body1" color="initial" py={2}>
          Hourly messages summed over the selected time period.
        </Typography>
        <TcHeatmap
          data={heatmapData}
          xAxisCategories={xAxisCategories}
          yAxisCategories={yAxisCategories}
        />
      </BoxContainer>
    </Container>
  );
}

export default CommunityInsights;

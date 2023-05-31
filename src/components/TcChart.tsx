import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface ChartOptions {
  [key: string]: unknown;
}

interface TcChartProps {
  options: ChartOptions;
}

function TcChart({ options }: TcChartProps) {
  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default TcChart;

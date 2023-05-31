import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCHeatmap from 'highcharts/modules/heatmap'; // Import the Heatmap module

interface TcHeatmapProps {
  data: number[][];
  xAxisCategories: string[];
  yAxisCategories: string[];
}

function TcHeatmap({ data, xAxisCategories, yAxisCategories }: TcHeatmapProps) {
  HCHeatmap(Highcharts);
  const options: Highcharts.Options = {
    chart: {
      type: 'heatmap',
    },
    title: {
      text: 'Heatmap Chart',
    },
    xAxis: {
      categories: xAxisCategories,
    },
    yAxis: {
      categories: yAxisCategories,
    },
    colorAxis: {
      min: 0,
      max: 100,
      stops: [
        [0, '#F3F3F3'],
        [10 / 100, '#F3F3F3'],
        [10 / 100, '#E3E9FF'],
        [20 / 100, '#E3E9FF'],
        [20 / 100, '#C5D2FF'],
        [30 / 100, '#C5D2FF'],
        [30 / 100, '#9971E7'],
        [50 / 100, '#9971E7'],
        [50 / 100, '#673FB5'],
        [70 / 100, '#673FB5'],
        [70 / 100, '#35205E'],
        [1, '#35205E'],
      ].map(([position, color]) => [position, color] as [number, string]),
    },
    series: [
      {
        type: 'heatmap',
        data,
        dataLabels: {
          enabled: true,
          color: '#000000',
          style: {
            textOutline: 'none',
          },
        },
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default TcHeatmap;

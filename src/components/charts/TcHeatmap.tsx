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
      plotBorderWidth: 0,
    },
    title: {
      text: '',
    },
    legend: {
      enabled: false,
    },
    xAxis: {
      categories: xAxisCategories,
      tickInterval: 1,
      labels: {
        step: 1,
        style: {
          fontSize: '14px',
          fontFamily: 'Inter',
        },
      },
      opposite: true,
      gridLineWidth: 0,
      lineWidth: 0,
      lineColor: 'rgba(0,0,0,0.75)',
      tickWidth: 0,
      tickLength: 0,
      tickColor: 'rgba(0,0,0,0.75)',
      title: {
        text: 'Hour',
        style: {
          fontSize: '14px',
          fontFamily: 'Inter',
        },
        align: 'low',
      },
    },
    yAxis: {
      categories: yAxisCategories,
      title: {
        text: '',
      },
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
        data: data?.map((item: number[]) => [item[1], item[0], item[2] || 0]),
        dataLabels: {
          enabled: true,
          color: '#000000',
          style: {
            textOutline: 'none',
          },
        },
        pointPadding: 1.5,
        colsize: 0.8,
        rowsize: 0.8,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
}

export default TcHeatmap;

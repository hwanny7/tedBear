import Chart from 'react-apexcharts';

const series = [
  {
    name: 'Metric1',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric2',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric3',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric4',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric5',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric6',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric7',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric8',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
  {
    name: 'Metric9',
    data: generateData(18, {
      min: 0,
      max: 90,
    }),
  },
];

const options = {
  chart: {
    height: 350,
    type: 'heatmap',
    // 차트 다운로드 버튼 숨기기
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  colors: ['#FEAD55'],
  // title: {
  //   text: 'HeatMap Chart (Single color)',
  // },
  // hide
  tooltip: {
    x: {
      show: false,
    },
    y: {
      show: false,
    },
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};

function generateData(count, yrange) {
  var i = 0;
  var series = [];
  while (i < count) {
    var x = (i + 1).toString();
    var y =
      Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    series.push({
      x: x,
      y: y,
    });
    i++;
  }
  return series;
}

export default function Heatmap() {
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="heatmap"
        height={350}
        width={1000}
      />
    </div>
  );
}

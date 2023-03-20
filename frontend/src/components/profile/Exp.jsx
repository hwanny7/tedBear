import Chart from 'react-apexcharts';

const series = [
  {
    name: 'Exp',
    data: [77],
  },
  { name: 'Keep Going!', data: [23] },
];

const options = {
  // chart type : 100 % stacked bar chart
  chart: {
    type: 'bar',
    stacked: true,
    stackType: '100%',
    // 차트 다운로드 버튼 숨기기
    toolbar: {
      show: false,
    },
  },
  // 수평의 bar
  plotOptions: {
    bar: {
      horizontal: true,
    },
  },
  colors: [
    '#df3333',
    // '#ff6600',
    // '#ffff00',
    // '#80ff00',
    // '#00eaff',
    // '#0011ff',
    // '#f700ff',
    // '#8e0089',
    // '#482000',
    '#505050',
  ],
  fill: {
    opacity: 0.8,
  },
  // hidden
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
  legend: {
    show: false,
  },
  tooltip: {
    x: {
      show: false,
    },
    y: {
      show: false,
    },
  },
  // responsive
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

export default function Exp() {
  return (
    <div>
      <Chart
        options={options}
        series={series}
        type="bar"
        height={100}
        width={300}
      />
    </div>
  );
}

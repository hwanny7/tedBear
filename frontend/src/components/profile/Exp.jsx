import Chart from 'react-apexcharts';
import styled from 'styled-components';

const ExpStyle = styled.div`
  .exp-paper {
    width: 33.5vw;
    height: 15vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .exp-name {
    padding: 10px 0px 0px 10px;
  }
`;

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
    <ExpStyle>
      <div className="exp-paper">
        <h2 className="exp-name">Exp</h2>
        <Chart
          options={options}
          series={series}
          type="bar"
          height={70}
          width={500}
        />
      </div>
    </ExpStyle>
  );
}

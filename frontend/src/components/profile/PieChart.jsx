import Chart from 'react-apexcharts';
import styled from 'styled-components';

const ChartStyle = styled.div`
  .chart-paper {
    width: 30vw;
    height: 60vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .chart-name {
    padding: 10px 0px 0px 20px;
  }
`;

// 비율
const series = [15, 5, 10, 10, 10, 10, 10, 10, 10, 10];

const options = {
  // chart type
  chart: {
    type: 'polarArea',
  },
  // 간격
  stroke: {
    colors: ['#fff'],
  },
  // 투명도
  fill: {
    opacity: 0.8,
  },
  // 라벨
  labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
  // 컬러
  colors: [
    '#df3333',
    '#ff6600',
    '#ffff00',
    '#80ff00',
    '#00eaff',
    '#0011ff',
    '#f700ff',
    '#8e0089',
    '#482000',
    '#505050',
  ],
  // 그래프 위 % 라벨
  dataLabels: {
    enabled: true,
    // style: {
    //   fontSize: '14px',
    //   fontFamily: 'Helvetica, Arial, sans-serif',
    //   fontWeight: 'bold',
    //   colors: undefined,
    // },
    // background: {
    //   enabled: true,
    //   foreColor: '#fff',
    //   padding: 4,
    //   borderRadius: 2,
    //   borderWidth: 1,
    //   borderColor: '#fff',
    //   opacity: 0.9,
    //   dropShadow: {
    //     enabled: false,
    //     top: 1,
    //     left: 1,
    //     blur: 1,
    //     color: '#000',
    //     opacity: 0.45,
    //   },
    // },
  },
  // 라벨 위치
  legend: {
    position: 'bottom',
  },
  // responsive custom
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          position: 'left',
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

export default function PieChart() {
  return (
    <ChartStyle>
      <div className="chart-paper">
        <h2 className="chart-name">Statistics</h2>
        <Chart
          options={options}
          series={series}
          type="polarArea"
          height={400}
        />
      </div>
    </ChartStyle>
  );
}

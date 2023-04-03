import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { authApi } from 'utils/api/customAxios';

const ChartStyle = styled.div`
  .chart-paper {
    width: 40vw;
    height: 55vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .chart-name {
    padding: 0px 0px 0px 20px;
  }
`;

export default function PieChart() {
  const [values, setValues] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`/member/pie`)
        .then(response => {
          setValues(response.data.pieList);
          console.log(response.data.pieList);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    setLoaded(true);
    fetchData();
  }, []);

  const series = values;

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
    labels: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'etc'],
    // 컬러
    colors: [
      '#FF4949',
      '#FF8E3D',
      '#EBFF00',
      '#00FF38',
      '#2EB4FF',
      '#5F27FF',
      '#BC2FFF',
      '#CDAB8B',
      '#C6C6C6',
      '#FFD700',
      '#000000',
    ],
    // 그래프 위 % 라벨
    dataLabels: {
      enabled: true,
    },
    // 라벨 위치
    legend: {
      position: 'right',
    },
    // responsive custom
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            position: 'left',
            width: 250,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <ChartStyle>
      <div className="chart-paper">
        <h2 className="chart-name">Statistics</h2>
        <Chart
          options={options}
          series={series}
          type="polarArea"
          height={350}
        />
      </div>
    </ChartStyle>
  );
}

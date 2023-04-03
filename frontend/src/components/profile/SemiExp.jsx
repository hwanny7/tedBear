import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { authApi } from 'utils/api/customAxios';

const SemiStyle = styled.div`
  .exp-paper {
    width: 35vw;
    height: 55vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .exp-name {
    text-align: center;
    padding: 35px 0px 0px 0px;
    font-size: 50px;
    color: #6255a4;
  }
  .exp-chart {
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;

const options = {
  colors: ['#8F84CE'],
  chart: {
    type: 'radialBar',
    offsetY: -20,
    sparkline: {
      enabled: true,
    },
  },
  plotOptions: {
    radialBar: {
      startAngle: -90,
      endAngle: 90,
      track: {
        background: '#e7e7e7',
        strokeWidth: '97%',
        margin: 5, // margin is in pixels
        dropShadow: {
          enabled: true,
          top: 2,
          left: 0,
          color: '#999',
          opacity: 1,
          blur: 2,
        },
      },
      dataLabels: {
        name: {
          show: true,
          color: '#888',
        },
        value: {
          fontSize: '50px',
          offsetY: -50,
          color: '#6255A4',
        },
      },
    },
  },
  grid: {
    padding: {
      top: -5,
    },
  },
  fill: {
    type: 'solid',
    gradient: {
      shade: 'light',
      shadeIntensity: 0.4,
      inverseColors: false,
      opacityFrom: 1,
      opacityTo: 1,
      stops: [0, 50, 53, 91],
    },
  },
  labels: ['Experience'],
};

export default function SemiExp() {
  const [level, setLevel] = useState();
  const [experience, setExperience] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  // const series = []; // 여기에 경험치 % 넣고
  // console.log(series);

  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`/member/level`)
        .then(response => {
          setLevel(response.data.level);
          const exp = response.data.percent;
          console.log(response.data.percent);
          setExperience(prevList => [...prevList, exp]);
          console.log(experience);
          // console.log(series);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    setLoaded(true);
    fetchData();
  }, []);

  return (
    <SemiStyle>
      <div className="exp-paper">
        <p className="exp-name">Lv.{level}</p>
        <div className="exp-chart">
          <Chart
            options={options}
            series={experience}
            type="radialBar"
            height={500}
            width={500}
          />
        </div>
      </div>
    </SemiStyle>
  );
}

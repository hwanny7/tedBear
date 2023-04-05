import Chart from 'react-apexcharts';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { authApi } from 'utils/api/customAxios';

const SemiStyle = styled.div`
  /* border: 1px solid red; */
  width: 300px;

  .exp-paper {
    width: 35vw;
    height: 55vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .exp-name {
    /* border: 1px solid red; */
    text-align: center;
    /* padding: 40px 0px 0px 0px; */
    font-size: 24px;
    font-weight: 600;
    color: ${props => props.theme.textColor2};
  }
  .exp-chart {
    display: flex;
    align-content: center;
    justify-content: center;
  }
`;

const options = {
  colors: ['#ff825c'],
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
        background: '#e9e9e9',
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
          show: false,
          color: '#fe896e',
          fontSize: '16px',
        },
        value: {
          fontSize: '48px',
          offsetY: -10,
          color: '#fe896e',
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
  labels: ['경험치'],
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
      {/* <div className="exp-paper"> */}
      <p className="exp-name">레벨 {level}</p>
      <div className="exp-chart">
        <Chart
          options={options}
          series={experience}
          type="radialBar"
          height={360}
          width={360}
        />
      </div>
      {/* </div> */}
    </SemiStyle>
  );
}

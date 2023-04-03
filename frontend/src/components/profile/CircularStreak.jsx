import { useState, useEffect } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import styled from 'styled-components';
import { authApi } from 'utils/api/customAxios';

const StreakStyle = styled.div`
  .streak-paper {
    width: 82vw;
    height: 38vh;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
  .streak-name {
    padding: 10px 0px 0px 20px;
  }
  .gauge {
    padding: 0px 30px 0px 0px;
    text-align: right;
  }
  .gauge-text {
    -webkit-appearance: none;
    border-radius: 20px;
    background-color: #d6ebff;
  }
  .gradation {
  }
`;

const CircularStreak = () => {
  const [range, setRange] = useState(5);
  const [size, setSize] = useState(0);
  const [values, setValues] = useState();
  const [Loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await authApi
        .get(`/member/streak`)
        .then(response => {
          setValues(response.data.streakList);
          console.log(response.data.streakList);
        })
        .catch(error => {
          console.log(error.data);
        });
    }
    setLoaded(true);
    fetchData();
  }, []);

  // const value = [
  //   { date: '2023/01/11', count: 1 },
  //   ...[...Array(17)].map((_, idx) => ({
  //     date: `2023/01/${idx + 10}`,
  //     count: idx,
  //   })),
  //   ...[...Array(17)].map((_, idx) => ({
  //     date: `2023/02/${idx + 10}`,
  //     count: idx,
  //   })),
  //   { date: '2023/04/12', count: 2 },
  // ];

  return (
    <StreakStyle>
      <div className="streak-paper">
        <h2 className="streak-name">Streak</h2>
        {/* 원 ~ 사각형  */}
        {/* <div className="gauge">
          <h5>Custom the roundness!</h5>
          <input
            className="gauge-text"
            type="range"
            // 굴곡
            min="0"
            max="20"
            step="0.1"
            value={range}
            onChange={e => setRange(e.target.value)}
          />
        </div> */}
        <HeatMap
          // 히트맵 크기
          width={1200}
          height={180}
          // 조각 크기
          rectSize={20}
          value={values}
          legendCellSize={size} // legend 크기 ( show여부 )
          startDate={new Date('2023/01/01')}
          endDate={new Date('2023/12/31')}
          rectProps={{
            rx: range,
          }}
          panelColors={{
            0: '#FFF6EC',
            1: '#FFEDD9',
            2: '#FFE4C6',
            3: '#FFDBB3',
            4: '#FED1A1',
            5: '#FEC88E',
            6: '#FEBF7B',
            7: '#FEB668',
            8: '#FEBF7B',
            9: '#FEAD55',
          }}
          // // tooltip
          rectRender={(props, data) => {
            return (
              <Tooltip
                key={data.index}
                placement="top"
                content={`${data.count || 0} on ${data.date}`}
              >
                <rect {...props} />
              </Tooltip>
            );
          }}
        />
      </div>
    </StreakStyle>
  );
};
export default CircularStreak;

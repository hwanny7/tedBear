import { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';

const value = [
  { date: '2023/01/11', count: 1 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2023/01/${idx + 10}`,
    count: idx,
  })),
  ...[...Array(17)].map((_, idx) => ({
    date: `2023/02/${idx + 10}`,
    count: idx,
  })),
  { date: '2023/04/12', count: 2 },
  { date: '2023/05/01', count: 3 },
  { date: '2023/05/02', count: 4 },
  { date: '2023/05/03', count: 5 },
  { date: '2023/05/04', count: 6 },
  { date: '2023/05/08', count: 7 },
  { date: '2023/06/08', count: 8 },
  { date: '2023/07/08', count: 9 },
];

const CircularStreak = () => {
  const [range, setRange] = useState(5);
  const [size, setSize] = useState(0);

  return (
    <div>
      {/* 원 ~ 사각형  */}
      <input
        type="range"
        min="0"
        max="5"
        step="0.1"
        value={range}
        onChange={e => setRange(e.target.value)}
      />{' '}
      {/* {range} */}
      Custom the roundness!
      {/* 색상 그라데이션 */}
      <label style={{ userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={size === 0}
          onChange={e => setSize(e.target.checked ? 0 : 12)}
        />
        {size === 0 ? 'Gradation Hide' : 'Gradation Show'}
      </label>
      <HeatMap
        width={600}
        value={value}
        legendCellSize={size}
        startDate={new Date('2023/01/01')}
        // legendRender={props => <rect {...props} rx={!enableCircle ? 0 : 5} />}
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
          // if (!data.count) return <rect {...props} />;
          // console.log(props, data);
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
  );
};
export default CircularStreak;

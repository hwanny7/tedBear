import { useState } from 'react';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';

const value = [
  { date: '2023/01/11', count: 2 },
  ...[...Array(17)].map((_, idx) => ({
    date: `2023/01/${idx + 10}`,
    count: idx,
  })),
  ...[...Array(17)].map((_, idx) => ({
    date: `2023/02/${idx + 10}`,
    count: idx,
  })),
  { date: '2023/04/12', count: 1 },
  { date: '2023/05/01', count: 2 },
  { date: '2023/05/02', count: 3 },
  { date: '2023/05/03', count: 4 },
  { date: '2023/05/04', count: 5 },
  { date: '2023/05/08', count: 6 },
];

const CircularStreak = () => {
  const [range, setRange] = useState(5);
  const [size, setSize] = useState(0);

  return (
    <div>
      {/* 원 ~ 사각형  */}
      {/* <input
        type="range"
        min="0"
        max="5"
        step="0.1"
        value={range}
        onChange={e => setRange(e.target.value)}
      />{' '}
      {range} */}
      {/* 색상 그라데이션 */}
      {/* <label style={{ userSelect: 'none' }}>
        <input
          type="checkbox"
          checked={size === 0}
          onChange={e => setSize(e.target.checked ? 0 : 12)}
        />
        {size === 0 ? ' Hide' : ' Show'} Hide
      </label> */}
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
          1: '#FFDBB3',
          2: '#FED1A1',
          3: '#FEC88E',
          4: '#FEBF7B',
          5: '#FEB668',
          6: '#FEAD55',
        }}
        // // tooltip
        rectRender={(props, data) => {
          // if (!data.count) return <rect {...props} />;
          // console.log(props, data);
          return (
            <Tooltip
              key={data.index}
              placement="top"
              content={`count: ${data.count || 0}`}
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

// import ReactDOM from 'react-dom';
import CalendarHeatmap from 'react-calendar-heatmap';
import { Tooltip } from 'react-tooltip';
import styled from 'styled-components';

const StreakStyle = styled.div`
  .react-calendar-heatmap text {
    font-size: 7px;
    fill: #aaa;
  }
  // 사각형에 hover 테두리 색상
  .react-calendar-heatmap rect:hover {
    stroke: #e1ff00;
    stroke-width: 1px;
  }
  .react-calendar-heatmap {
    .react-calendar-heatmap-small-text {
      font-size: 5px;
    }
    // default color scale
    .color-empty {
      fill: #eeeeee;
    }
    .color-filled {
      fill: #8cc665;
    }
    // custom color scale
    .color-scale-1 {
      fill: #ffcd61;
    }
    .color-scale-2 {
      fill: #ff7b00;
    }
    .color-scale-3 {
      fill: #fff3c1;
    }
    .color-scale-4 {
      fill: #ffc71e;
    }
  }
`;

const Streak = () => {
  return (
    <StreakStyle>
      <CalendarHeatmap
        showWeekdayLabels={true}
        startDate={new Date('2023-01-01')}
        endDate={new Date('2023-12-31')}
        values={[
          { date: '2023-02-01', count: 1 },
          { date: '2023-03-22', count: 2 },
          { date: '2023-06-15', count: 3 },
          { date: '2023-09-10', count: 4 },
          // back에서 받아야하는 데이터 : 날짜 format & count 횟수
        ]}
        classForValue={value => {
          if (!value) {
            return 'color-empty';
          }
          return `color-scale-${value.count}`;
        }}
        // tooltipDataAttrs={value => {
        //   return {
        //     'data-tip': `${value.date.toISOString().slice(0, 10)} has count: ${
        //       value.count
        //     }`,
        //   };
        // }}
      />

      <Tooltip />
    </StreakStyle>
  );
};

export default Streak;

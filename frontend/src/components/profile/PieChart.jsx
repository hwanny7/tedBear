import Chart from 'react-apexcharts';

const series = [10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
const options = {
  chart: {
    type: 'donut',
  },
};

export default function PieChart() {
  return (
    <div>
      <Chart options={options} series={series} type="donut" height={300} />
    </div>
  );
}

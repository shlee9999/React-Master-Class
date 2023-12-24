import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';
interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () => fetchCoinHistory(coinId));
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            dataLabels: { enabled: false },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            theme: { mode: isDark ? 'dark' : 'light' },
            xaxis: {
              categories: data?.map((price) => price.time_close),
              type: 'datetime',
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            yaxis: { show: false },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#0be881'], stops: [0, 100] }, // blue에서
            },
            colors: ['#0fbcf9'], //red로 그라데이션
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;

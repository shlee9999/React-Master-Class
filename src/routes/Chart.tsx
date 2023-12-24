import { useQuery } from 'react-query';
import { fetchCoinHistory } from '../api';
import ApexChart from 'react-apexcharts';
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
  const { isLoading, data } = useQuery<IHistorical[]>(['ohlcv', coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        'Loading Chart...'
      ) : (
        <ApexChart
          type='line'
          options={{
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: 'transparent',
            },
            grid: { show: false },
            theme: { mode: 'dark' },
            xaxis: {
              categories: data?.map((price) =>
                price.time_close.slice(5, 10).replace('-', '/')
              ),
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
            yaxis: { show: false },
            stroke: {
              curve: 'smooth',
              width: 3,
            },
          }}
          series={[
            {
              name: 'Price',
              data: data?.map((price) => price.close) as number[],
            },
          ]}
        ></ApexChart>
      )}
    </div>
  );
}
export default Chart;

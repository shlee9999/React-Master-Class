import { useParams } from 'react-router-dom';
interface ParamsProps {
  coinId: string;
}
function Coin() {
  const { coinId } = useParams<ParamsProps>();

  return <h1>Coin : {coinId}</h1>;
}
export default Coin;

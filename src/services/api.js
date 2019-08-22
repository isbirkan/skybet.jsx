import axios from 'axios';
import * as actions from '../constants/actions';

const api = axios.create({
  baseURL: 'http://localhost:8888',
  responseType: 'json'
});

export default function service(dispatch) {
  async function getMarket(marketId) {
    await api
      .get(`/sportsbook/market/${marketId}`)
      .then(({ data }) => {
        dispatch([actions.MARKET, data.market]);
      })
      .catch(error => {
        dispatch([actions.FAILURE, error]);
      });
  }

  return { getMarket };
}

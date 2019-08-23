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

  async function getMarkets(marketIdList) {
    const promises = marketIdList.map(marketId => getMarket(+marketId));
    console.log(promises);
  }

  async function getOutcome(outcomeId) {
    await api
      .get(`/sportsbook/outcome/${outcomeId}`)
      .then(({ data }) => {
        dispatch([actions.OUTCOME, data.outcome]);
      })
      .catch(error => {
        dispatch([actions.FAILURE, error]);
      });
  }

  return { getMarket, getMarkets, getOutcome };
}

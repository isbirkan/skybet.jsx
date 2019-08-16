import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/socket';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/markets';

import Loader from '../../components/Loader/SmallLoader';
import Error from '../Error';

import './Market.scss';

export default function Market(props) {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);
  const marketId = props.match.params.id;

  function getCurrentMarket() {
    return store.markets.find(m => m.marketId === +marketId);
  }

  useEffect(() => {
    if (!store.loading && !getCurrentMarket()) {
      sendMessage({ type: requestType.MARKET, id: +marketId });
    }
  }, [marketId, store.loading, sendMessage]);

  function buildStatus(statusObject) {
    let status = '';
    Object.keys(statusObject).forEach(key => {
      if (statusObject[key]) {
        if (status === '') {
          status = key;
        } else {
          status = `${status}, ${key}`;
        }
      }
    });

    return status;
  }

  const market = getCurrentMarket();
  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && market) {
    content = (
      <table className="table table-responsive-sm market">
        <tbody>
          <tr>
            <th>{resources.NAME}</th>
            <td>{market.name}</td>
          </tr>
          <tr>
            <th>{resources.TYPE_NAME}</th>
            <td>{market.type}</td>
          </tr>
          <tr>
            <th>{resources.STATUS}</th>
            <td>{buildStatus(market.status)}</td>
          </tr>
          <tr>
            <th>{resources.PRICE_LIMIT}</th>
            <td>{market.liabilities.livePriceLimit}</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-sm-10 offset-sm-1">
          <h5>{resources.HEADER_TEXT}</h5>
          {content}
        </div>
      </div>
    </div>
  );
}

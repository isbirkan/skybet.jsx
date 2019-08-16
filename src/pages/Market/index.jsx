import React, { useContext, useEffect, useState } from 'react';
import { SocketContext } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/socket';
import * as requestType from '../../constants/requestTypes';

import Loader from '../../components/Loader/FullLoader';
import Error from '../Error';

export default function Market(props) {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);
  const [market, setMarket] = useState(null);
  const marketId = props.match.params.id;

  function getMarketFromStore() {
    return store.markets.find(m => m.marketId === marketId);
  }

  useEffect(() => {
    setMarket(getMarketFromStore());

    if (!store.loading && !market) {
      sendMessage({ type: requestType.MARKET, id: marketId });
    }
  }, [market, store.loading, sendMessage]);

  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && market) {
    content = 'Hello';
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-sm-10 offset-sm-1">{content}</div>
      </div>
    </div>
  );
}

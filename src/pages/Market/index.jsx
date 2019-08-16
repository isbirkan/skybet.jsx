import React, { useContext, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/socket';
import * as requestType from '../../constants/requestTypes';

export default function Market(props) {
  const store = useContext(StoreContext);
  const { sendMessage } = useSocket();
  console.log(store);
  console.log(props.match.params.id);

  useEffect(() => {
    if (!store.loading && store.liveEvents.length === 0) {
      sendMessage({ type: requestType.LIVE_EVENTS, primaryMarkets: true });
    }
  }, [store.liveEvents, store.loading, sendMessage]);

  return <div>Hello</div>;
}

import React, { useContext, useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { useSocket } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/socket';
import * as requestType from '../../constants/requestTypes';

import Loader from '../../components/Loader/FullLoader';

export default function LiveEvents() {
  const store = useContext(StoreContext);
  const { sendMessage } = useSocket();

  useEffect(() => {
    if (!store.loading) {
      sendMessage({ type: requestType.LIVE_EVENTS, primaryMarkets: true });
    }
  }, [store.loading]);

  return store.loading === true ? (
    <Loader />
  ) : (
    <Container>
      <Row>{JSON.stringify(store.liveEvents)}</Row>
    </Container>
  );
}

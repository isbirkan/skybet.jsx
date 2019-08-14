import React, { useEffect } from 'react';
import { Container, Row } from 'reactstrap';
import { useSocket } from '../../hooks/useSocket';
import { getWebSocket, closeWebSocket } from '../../instances/socket';

import Loader from '../../components/Loader/FullLoader';

export default function Home() {
  const { state, getLiveEvents } = useSocket();
  const socket = getWebSocket();

  useEffect(() => {
    if (socket !== undefined) {
      getLiveEvents();
    }
  });

  return (
    <Container>
      <Row>{JSON.stringify(state.liveEvents)}</Row>
    </Container>
  );
}

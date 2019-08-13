import React from 'react';
import { Container, Row } from 'reactstrap';
import { useSocket } from '../../hooks/useSocket';
import { service } from '../../services/socket';

export default function Home() {
  const { messages, socket } = useSocket();
  const { getLiveEvents } = service(socket);

  console.log(messages);
  getLiveEvents();

  return (
    <Container>
      <Row>Hello</Row>
    </Container>
  );
}

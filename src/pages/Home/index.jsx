import React from 'react';
import { Container, Row } from 'reactstrap';

const w = new Websocket('ws://localhost:8889');

export default function Home() {
  return (
    <Container>
      <Row>Hello</Row>
    </Container>
  );
}

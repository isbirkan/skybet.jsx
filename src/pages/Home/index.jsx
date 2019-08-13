import React from 'react';
import { Container, Row } from 'reactstrap';
import { useApiSubscriber } from '../../hooks/socketHook';

export default function Home() {
  const { messages } = useApiSubscriber();
  console.log(messages);

  const content =
    messages.error != null ? (
      <Row>{messages.error}</Row>
    ) : (
      messages.liveEvents.map(message => <Row>{JSON.stringify(message)}</Row>)
    );

  return <Container>{content}</Container>;
}

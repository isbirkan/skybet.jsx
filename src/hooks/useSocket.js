import { useEffect, useState } from 'react';
import * as responseType from '../constants/responseTypes';

export function useSocket() {
  const [socket, setSocket] = useState();
  const [messages, setMessages] = useState({
    events: [],
    markets: [],
    outcomes: [],
    liveEvents: [],
    error: null
  });

  function getMessage(message) {
    const data = JSON.parse(message.data);

    switch (data.type) {
      case responseType.INIT:
        break;
      case responseType.LIVE_EVENTS:
        setMessages({ liveEvents: data.data });
        break;
      default:
        setMessages({ error: data });
    }
  }

  useEffect(() => {
    if (socket === undefined) {
      const ws = new WebSocket('ws://localhost:8889');

      ws.onopen = () => {
        console.log('socket connected');
        setSocket(ws);
      };

      ws.onerror = error => {
        console.log(`socket error: ${error}`);
      };

      ws.onmessage = getMessage;
    }
  });

  return { messages, socket };
}

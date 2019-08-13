import { useEffect, useState } from 'react';
import * as responseType from '../constants/responseTypes';

export function useApiSubscriber() {
  let socket = {};
  const [messages, setMessages] = useState({
    events: [],
    markets: [],
    outcomes: [],
    liveEvents: [],
    error: null
  });

  function connect() {
    return new Promise((resolve, reject) => {
      socket = new WebSocket('ws://localhost:8889');
      socket.onopen = function() {
        console.log('socket connected');
        resolve();
      };
      socket.onerror = function(error) {
        console.log(`socket error: ${error}`);
        reject(error);
      };
    });
  }

  function disconnect() {
    socket.close();
    console.log('socket disconnected');
  }

  function getLiveEvents(primaryMarkets) {
    socket.send(JSON.stringify({ type: 'getLiveEvents', primaryMarkets }));
  }

  useEffect(() => {
    connect()
      .then(() => {
        socket.onmessage = function(m) {
          const data = JSON.parse(m.data);

          switch (data.type) {
            case responseType.INIT:
              break;
            case responseType.LIVE_EVENTS:
              setMessages({ liveEvents: data.data });
              break;
            default:
              setMessages({ error: data });
          }
        };

        getLiveEvents(false);
      })
      .catch(error => {
        setMessages({ error });
      });

    return () => {
      socket.send(JSON.stringify({ type: 'unsubscribe' }));
      disconnect();
    };
  }, [messages]);

  return { messages };
}

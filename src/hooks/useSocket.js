import { useState, useEffect } from 'react';
import { initialiseSocket, closeWebSocket } from '../instances/socket';
import * as responseType from '../constants/responseTypes';

const socket = initialiseSocket();

export function useSocket() {
  const [state, setState] = useState({
    events: [],
    markets: [],
    outcomes: [],
    liveEvents: [],
    loading: true,
    error: null
  });

  useEffect(() => {
    socket.onmessage = response => {
      const data = JSON.parse(response.data);

      switch (data.type) {
        case responseType.INIT:
          break;
        case responseType.LIVE_EVENTS:
          setState({ liveEvents: data.data });
          break;
        default:
          setState({ error: data });
      }
    };

    return () => {
      closeWebSocket();
    };
  });

  const getLiveEvents = primaryMarkets => {
    socket.send(JSON.stringify({ type: 'getLiveEvents', primaryMarkets }));
  };

  return { state, getLiveEvents };
}

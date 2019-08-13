import * as requestTypes from '../constants/requestTypes';

export function service(socket) {
  function getLiveEvents(primaryMarkets) {
    socket.send(JSON.stringify({ type: requestTypes.LIVE_EVENTS, primaryMarkets }));
  }

  return { getLiveEvents };
}

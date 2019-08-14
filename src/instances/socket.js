let socket;

export const initialiseSocket = () => {
  socket = new WebSocket('ws://localhost:8889');

  socket.onopen = () => {
    console.log('socket connected');
  };

  socket.onerror = error => {
    console.log(`socket error: ${JSON.stringify(error)}`);
  };

  return socket;
};

export const getWebSocket = () => {
  if (socket.readyState === 1) {
    return socket;
  }
  return initialiseSocket();
};

export const closeWebSocket = () => {
  try {
    socket.close();
    console.log('socket disconnected');
  } catch (error) {
    console.log(`socket disconnect error: ${JSON.stringify(error)}`);
  }
};

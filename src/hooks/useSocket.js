import { useCallback, useContext, useEffect, useRef } from 'react';
import { DispatchContext } from '../reducers/socket';
import * as requestType from '../constants/requestTypes';
import * as actions from '../constants/actions';

export function useSocket() {
  const dispatch = useContext(DispatchContext);
  const socketRef = useRef();

  const sendMessage = useCallback(
    message => {
      socketRef.current.send(JSON.stringify(message));
    },
    [socketRef]
  );

  useEffect(() => {
    dispatch([actions.LOADING]);

    function handleOpen() {
      console.log('socket connected');
    }

    function handleClose() {
      console.log('socket disconnected');
    }

    function handleError(error) {
      dispatch([actions.FAILURE, error]);
      console.log('socket error');
    }

    const handleReceiveMessage = ({ data }) => {
      const response = JSON.parse(data);
      dispatch([response.type, response.data]);
    };

    const socket = new WebSocket('ws://localhost:8889');
    socket.onopen = handleOpen;
    socket.onclose = handleClose;
    socket.onerror = handleError;
    socket.onmessage = handleReceiveMessage;
    socketRef.current = socket;

    return () => {
      try {
        socket.send(JSON.stringify({ type: requestType.UNSUBSCRIBE }));
        socket.close();
      } catch (error) {
        dispatch([actions.FAILURE, error]);
        console.log(error);
        console.log('socket disconnect error');
      }
    };
  }, [dispatch]);

  return { sendMessage };
}

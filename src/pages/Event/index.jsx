import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/socket';
import { StoreContext } from '../../reducers/appReducer';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/event';

import Loader from '../../components/Loader/SmallLoader';
import Error from '../Error';

import './Event.scss';

export default function Event(props) {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);
  const eventId = props.match.params.id;

  function getCurrentEvent() {
    return store.events.find(e => e.eventId === +eventId);
  }

  useEffect(() => {
    document.title = `${resources.DOCUMENT_TITLE} ${eventId}`;

    if (!store.loading && !store.events.find(e => e.eventId === +eventId)) {
      sendMessage({ type: requestType.EVENT, id: +eventId });
    }
  }, [eventId, store.events, store.loading, sendMessage]);

  const event = getCurrentEvent();
  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && event) {
    content = event.eventId;
  }
  return content;
}

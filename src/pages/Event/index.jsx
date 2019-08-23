import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/appReducer';
import * as helper from '../../helpers/stringHelpers';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/event';

import Paginated from '../../components/Event/Paginated';
import Infinite from '../../components/Event/Infinite';
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
    const event = store.events.find(e => e.eventId === +eventId);

    if (!store.loading && !event) {
      sendMessage({ type: requestType.EVENT, id: +eventId });
    }
  }, [eventId, store.events, store.loading, store.options.marketsViewType, sendMessage]);

  const { marketsViewType } = store.options;
  const event = getCurrentEvent();
  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && event) {
    content = (
      <div className="card bg-light mb-3 mt-3 shadow rounded">
        <div className="card-header">
          <span className="event-header">
            <label className="event-name">{event.name}</label>
            <label>
              {event.className}
              {event.linkedEventTypeName ? ` - ${event.linkedEventTypeName}` : ''}
            </label>
            <label>{`${resources.SCORE}: ${helper.buildScores(event.scores)}`}</label>
            <label>{`${resources.START_DATE}: ${helper.formatDate(event.startTime)}`}</label>
            <label>{`${resources.STATUS}: ${helper.buildStatus(event.status)}`}</label>
          </span>
        </div>
        {marketsViewType === 'infinite' ? (
          <Infinite marketList={event.markets} />
        ) : (
          <Paginated marketList={event.markets} />
        )}
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">{content}</div>
    </div>
  );
}

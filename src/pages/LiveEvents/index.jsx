import React, { Fragment, useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/socket';
import { StoreContext } from '../../reducers/appReducer';
import * as helper from '../../helpers/stringHelpers';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/liveEvents';

import PrimaryMarket from '../../components/PrimaryMarket';
import Loader from '../../components/Loader/SmallLoader';
import Error from '../Error';

import './LiveEvents.scss';

export default function LiveEvents(props) {
  const store = useContext(StoreContext);
  const sendMessage = useContext(SocketContext);

  useEffect(() => {
    document.title = resources.DOCUMENT_TITLE;

    if (!store.loading && store.liveEvents.length === 0) {
      sendMessage({ type: requestType.LIVE_EVENTS, primaryMarkets: true });
    }
  }, [store.liveEvents, store.loading, store.options.primaryMarkets, sendMessage]);

  function goToEvent(eventId) {
    props.history.push(`/event/${eventId}`);
  }

  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && store.liveEvents) {
    content = (
      <table className="table table-responsive-sm live-events">
        <thead>
          <tr className="row-live-event">
            <th>{resources.NAME}</th>
            <th>{resources.SCORE}</th>
            <th>{resources.START_TIME}</th>
          </tr>
        </thead>
        <tbody>
          {store.liveEvents.map(event => (
            <Fragment key={`event_${event.eventId}`}>
              <tr className="row-live-event" onClick={() => goToEvent(event.eventId)}>
                <td>{event.name}</td>
                <td>{helper.buildScores(event.scores)}</td>
                <td>{helper.formatTime(event.startTime)}</td>
              </tr>
              {store.options.primaryMarket &&
                event.markets.map(market => <PrimaryMarket key={`market_${market}`} id={market} />)}
            </Fragment>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-sm-10 offset-sm-1">
          <div className="card bg-light mb-3 mt-3 shadow p-3 rounded">
            <h5 className="text-center">{resources.HEADER_TEXT}</h5>
            {content}
          </div>
        </div>
      </div>
    </div>
  );
}

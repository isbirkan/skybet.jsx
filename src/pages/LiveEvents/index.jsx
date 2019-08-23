import React, { Fragment, useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/useSocket';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import * as helper from '../../helpers/stringHelpers';
import * as actions from '../../constants/actions';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/liveEvents';

import PrimaryMarket from '../../components/Market';
import Loader from '../../components/Loader/SmallLoader';
import Error from '../Error';

import './LiveEvents.scss';

export default function LiveEvents(props) {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const sendMessage = useContext(SocketContext);

  useEffect(() => {
    document.title = resources.DOCUMENT_TITLE;

    if (!store.loading && store.liveEvents.length === 0) {
      sendMessage({ type: requestType.LIVE_EVENTS, primaryMarkets: true });
    }
  }, [store.liveEvents, store.loading, store.options.primaryMarkets, sendMessage]);

  function goToEvent(eventId) {
    dispatch([actions.PAGE_RESET]);
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
                event.markets.map(market => (
                  <tr key={`market_${market}`}>
                    <td colSpan="3" className="row-primary-market">
                      <PrimaryMarket id={market} callType="socket" />
                    </td>
                  </tr>
                ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="row">
      <div className="col-md-8 offset-md-2">
        <div className="card bg-light mb-3 mt-3 shadow p-3 rounded">
          <h5 className="live-footbal-tag">{resources.LIVE_FOOTBAL}</h5>
          <h5 className="text-center">{resources.HEADER_TEXT}</h5>
          {content}
        </div>
      </div>
    </div>
  );
}

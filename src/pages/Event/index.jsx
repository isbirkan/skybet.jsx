import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../../hooks/socket';
import { DispatchContext, StoreContext } from '../../reducers/appReducer';
import * as helper from '../../helpers/stringHelpers';
import * as requestType from '../../constants/requestTypes';
import * as actions from '../../constants/actions';
import * as resources from '../../constants/resources/event';

import Market from '../../components/Market';
import Loader from '../../components/Loader/SmallLoader';
import Error from '../Error';

import './Event.scss';

export default function Event(props) {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);
  const sendMessage = useContext(SocketContext);
  const eventId = props.match.params.id;
  const page = store.options.marketsPage;
  const resultsPerPage = store.options.marketsResultsPerPage;
  let incrementAvailable = false;

  function getCurrentEvent() {
    return store.events.find(e => e.eventId === +eventId);
  }

  function handleChangePage(increment) {
    if (increment && incrementAvailable) {
      dispatch([actions.PAGE_INCREMENT]);
    } else {
      dispatch([actions.PAGE_DECREMENT]);
    }
  }

  useEffect(() => {
    document.title = `${resources.DOCUMENT_TITLE} ${eventId}`;

    if (!store.loading && !store.events.find(e => e.eventId === +eventId)) {
      sendMessage({ type: requestType.EVENT, id: +eventId });
    }
  }, [
    eventId,
    store.options.marketsPage,
    store.options.marketsResultsPerPage,
    store.events,
    store.loading,
    sendMessage
  ]);

  const event = getCurrentEvent();
  let content = <Loader />;
  if (store.error) {
    content = <Error message={store.error.message} />;
  }
  if (!store.loading && event) {
    const numberOfMarkets = event.markets.length;
    incrementAvailable = page < Math.ceil(numberOfMarkets / resultsPerPage);

    const nav = (
      <nav aria-label="Event markets pagination">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              disabled={page === 1}
              tabIndex="-1"
              onClick={() => handleChangePage()}>
              {resources.PREVIOUS}
            </button>
          </li>
          <li className="page-item">
            <button type="button" className="page-link unlink" tabIndex="-1">
              {page}
            </button>
          </li>
          <li className="page-item">
            <button
              type="button"
              className="page-link"
              disabled={!incrementAvailable}
              tabIndex="-1"
              onClick={() => handleChangePage(true)}>
              {resources.NEXT}
            </button>
          </li>
        </ul>
      </nav>
    );

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
        <div className="card-body">
          <div className="card-title">
            <h5>{resources.MARKETS_HEADER}</h5>
            <span className="event-top-nav">{nav}</span>
          </div>
          <ul className="list-group list-group-flush">
            {event.markets.slice((page - 1) * resultsPerPage, page * resultsPerPage).map(market => (
              <li key={`market_${market}`} className="list-group-item">
                <Market id={market} />
              </li>
            ))}
          </ul>
        </div>
        <div className="card-footer">{nav}</div>
      </div>
    );
  }
  return (
    <div className="row">
      <div className="col-md-10 offset-md-1">{content}</div>
    </div>
  );
}

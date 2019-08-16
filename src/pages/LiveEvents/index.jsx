import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSocket } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/socket';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/liveEvents';

import Loader from '../../components/Loader/FullLoader';

import './LiveEvents.scss';

export default function LiveEvents(props) {
  const store = useContext(StoreContext);
  const { sendMessage } = useSocket();

  useEffect(() => {
    if (!store.loading && store.liveEvents.length === 0) {
      sendMessage({ type: requestType.LIVE_EVENTS, primaryMarkets: true });
    }
  }, [store.liveEvents, store.loading, sendMessage]);

  function goToMarkets(marketId) {
    props.history.push(`/market/${marketId}`);
  }

  function buildStatus(statusObject) {
    let status = '';
    Object.keys(statusObject).forEach(key => {
      if (statusObject[key]) {
        if (status === '') {
          status = key;
        } else {
          status = `${status}, ${key}`;
        }
      }
    });

    return status;
  }

  function formatTime(dateTimeObject) {
    const dateTime = new Date(dateTimeObject);
    return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
  }

  function buildScores(scoresObject) {
    return `${scoresObject.home} - ${scoresObject.away}`;
  }

  let content = <Loader />;
  if (!store.loading && store.liveEvents) {
    content = (
      <table className="table table-responsive-sm">
        <thead>
          <tr>
            <th>{resources.NAME}</th>
            <th>{resources.TYPE_NAME}</th>
            <th>{resources.CLASS_NAME}</th>
            <th>{resources.STATUS}</th>
            <th>{resources.START_TIME}</th>
            <th>{resources.SCORE}</th>
          </tr>
        </thead>
        <tbody>
          {store.liveEvents.map(item => (
            <tr key={`row_${item.eventId}`} onClick={() => goToMarkets(item.markets[0])}>
              <td>{item.name}</td>
              <td>{item.typeName}</td>
              <td>{item.className}</td>
              <td>{buildStatus(item.status)}</td>
              <td>{formatTime(item.startTime)}</td>
              <td>{buildScores(item.scores)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 offset-md-1 col-sm-10 offset-sm-1">
          <div className="card bg-light mb-3 mt-3">{content} </div>
        </div>
      </div>
    </div>
  );
}

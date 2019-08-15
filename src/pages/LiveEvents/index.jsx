import React, { useContext, useEffect } from 'react';
import { useSocket } from '../../hooks/useSocket';
import { StoreContext } from '../../reducers/socket';
import * as requestType from '../../constants/requestTypes';
import * as resources from '../../constants/resources/liveEvents';

import Loader from '../../components/Loader/FullLoader';

import './LiveEvents.css';

export default function LiveEvents() {
  const store = useContext(StoreContext);
  const { sendMessage } = useSocket();

  useEffect(() => {
    if (!store.loading) {
      sendMessage({ type: requestType.LIVE_EVENTS, primaryMarkets: true });
    }
  }, [store.loading]);

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
    return `Home: ${scoresObject.home}, away: ${scoresObject.away}`;
  }

  let content = <Loader />;
  if (!store.loading && store.liveEvents) {
    content = (
      <table className="table table-striped table-bordered table-hover table-responsive-sm">
        <thead>
          <tr>
            <th>{resources.NAME}</th>
            <th>{resources.TYPE_NAME}</th>
            <th>{resources.CLASS_NAME}</th>
            <th>{resources.STATUS}</th>
            <th>{resources.START_TIME}</th>
            <th>{resources.SCORES}</th>
          </tr>
        </thead>
        <tbody>
          {store.liveEvents.map(item => (
            <tr key={`row_${item.eventId}`}>
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

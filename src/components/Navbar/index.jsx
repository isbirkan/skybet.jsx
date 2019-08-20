import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DispatchContext, StoreContext } from '../../reducers/socket';
import * as actions from '../../constants/actions';
import * as ROUTES from '../../constants/routes';
import * as RESOURCES from '../../constants/resources/navbar';

import FormatToggler from '../Toggler';

import './Navbar.scss';

export default function Navbar() {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  function toggleFormat() {
    dispatch([actions.TRIGGER_FORMAT, store.format === true ? 'fractional' : 'decimal']);
  }

  function togglePrimaryMarket() {
    dispatch([actions.TRIGGER_PRIMARY_MARKET, !store.primaryMarket]);
  }

  function displayStoreObject() {
    console.log(store);
  }

  useEffect(() => {}, [store.format, store.primaryMarket]);

  return (
    <ul className="navbar nav">
      <div className="container">
        <li className="nav-item">
          <Link to={ROUTES.LANDING}>{RESOURCES.LIVE_EVENTS}</Link>
        </li>
        <div className="float-right">
          {RESOURCES.ODDS_FORMAT}
          <div className="btn-group btn-group-toggle ml-2" data-toggle="buttons">
            <label className={`btn btn-sm ${store.format === 'fractional' ? 'active' : ''}`}>
              <input type="radio" autoComplete="off" onClick={() => toggleFormat()} />
              {RESOURCES.FRACTIONAL}
            </label>
            <label className={`btn btn-sm ${store.format === 'decimal' ? 'active' : ''}`}>
              <input type="radio" autoComplete="off" onClick={() => toggleFormat()} />
              {RESOURCES.DECIMAL}
            </label>
          </div>
          <input
            type="button"
            value="Store"
            className="btn btn-primary btn-sm"
            hidden
            onClick={() => displayStoreObject()}
          />
        </div>
        <FormatToggler checked={store.format === 'fractional'} onChange={() => toggleFormat()} />
      </div>
    </ul>
  );
}

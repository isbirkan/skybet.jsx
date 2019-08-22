import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../reducers/appReducer';
import * as ROUTES from '../../constants/routes';
import * as RESOURCES from '../../constants/resources/navbar';

import FormatToggler from '../Toggler/FormatToggler';
import PrimaryMarketToggler from '../Toggler/PrimaryMarketToggler';

import './Navbar.scss';

export default function Navbar() {
  const store = useContext(StoreContext);

  function logStore() {
    console.log(store);
  }

  return (
    <ul className="navbar nav">
      <div className="container">
        <li className="nav-item">
          <Link to={ROUTES.LANDING}>{RESOURCES.LIVE_EVENTS}</Link>
        </li>
        <div className="row">
          <FormatToggler />
          <PrimaryMarketToggler />
          <button
            type="button"
            className={`store-log btn btn-warning ${process.env.NODE_ENV === 'production' ? 'd-none' : ''}`}
            onClick={() => logStore()}>
            LOG <br /> STORE
          </button>
        </div>
      </div>
    </ul>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as RESOURCES from '../../constants/resources/navbar';

import FormatToggler from '../Toggler/FormatToggler';
import PrimaryMarketToggler from '../Toggler/PrimaryMarketToggler';

import './Navbar.scss';

export default function Navbar() {
  return (
    <ul className="navbar nav">
      <div className="container">
        <li className="nav-item">
          <Link to={ROUTES.LANDING}>{RESOURCES.LIVE_EVENTS}</Link>
        </li>
        <div className="row">
          <FormatToggler />
          <PrimaryMarketToggler />
        </div>
      </div>
    </ul>
  );
}

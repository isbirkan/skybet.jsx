import React, { useContext, useEffect } from 'react';
import { Button, Container, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DispatchContext, StoreContext } from '../../reducers/socket';
import * as actions from '../../constants/actions';
import * as ROUTES from '../../constants/routes';
import * as RESOURCES from '../../constants/resources/navbar';

import './Navbar.scss';

export default function Navbar() {
  const store = useContext(StoreContext);
  const dispatch = useContext(DispatchContext);

  function toggleFormat() {
    dispatch([actions.TRIGGER_FORMAT, store.format === 'fractional' ? 'decimal' : 'fractional']);
  }

  function displayStoreObject() {
    console.log(store);
  }

  useEffect(() => {}, [store.format]);

  return (
    <Nav className="navbar">
      <Container>
        <NavItem>
          <Link to={ROUTES.LANDING}>{RESOURCES.LIVE_EVENTS}</Link>
        </NavItem>
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
          <Button color="primary" size="sm" hidden onClick={() => displayStoreObject()}>
            Store
          </Button>
        </div>
      </Container>
    </Nav>
  );
}

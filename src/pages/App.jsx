import React, { useReducer } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { DispatchContext, StoreContext, initialState, socketReducer } from '../reducers/socket';
import * as ROUTES from '../constants/routes';

import Navbar from '../components/Navbar';
import LiveEvents from './LiveEvents';
import NotFound from './404';

import './global.css';

export default function App() {
  const [store, dispatch] = useReducer(socketReducer, initialState);
  console.log(store);

  return (
    <Router>
      <DispatchContext.Provider value={dispatch}>
        <StoreContext.Provider value={store}>
          <Navbar />
          <Container fluid className="app-container">
            <Switch>
              <Redirect exact from={ROUTES.LANDING} to={ROUTES.LIVE_EVENTS} />
              <Route path={ROUTES.LIVE_EVENTS} component={LiveEvents} />
              <Route component={NotFound} />
            </Switch>
          </Container>
        </StoreContext.Provider>
      </DispatchContext.Provider>
    </Router>
  );
}

import React, { useReducer } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import { DispatchContext, StoreContext, initialState, socketReducer } from '../reducers/socket';
import { SocketContext, useSocket } from '../hooks/useSocket';
import * as ROUTES from '../constants/routes';

import Navbar from '../components/Navbar';
import LiveEvents from './LiveEvents';
import Market from './Market';
import NotFound from './404';
import Loader from '../components/Loader/FullLoader';

import './global.scss';

export default function App() {
  const [store, dispatch] = useReducer(socketReducer, initialState);
  const { sendMessage } = useSocket(dispatch);
  console.log(store);

  let content = <Loader />;
  if (!store.loading) {
    content = (
      <Switch>
        <Redirect exact from={ROUTES.LANDING} to={ROUTES.LIVE_EVENTS} />
        <Route path={ROUTES.LIVE_EVENTS} component={LiveEvents} />
        <Route path={ROUTES.MARKET} component={Market} />
        <Route component={NotFound} />
      </Switch>
    );
  }

  return (
    <Router>
      <DispatchContext.Provider value={dispatch}>
        <StoreContext.Provider value={store}>
          <SocketContext.Provider value={sendMessage}>
            <Navbar />
            <Container fluid className="app-container">
              {content}
            </Container>
          </SocketContext.Provider>
        </StoreContext.Provider>
      </DispatchContext.Provider>
    </Router>
  );
}

import React, { useReducer } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { DispatchContext, StoreContext, initialState, appReducer } from '../reducers/appReducer';
import { SocketContext, useSocket } from '../hooks/socket';
import * as ROUTES from '../constants/routes';

import Navbar from '../components/Navbar';
import LiveEvents from './LiveEvents';
import Event from './Event';
import NotFound from './404';
import Loader from '../components/Loader/FullLoader';

import './App.scss';

export default function App() {
  const [store, dispatch] = useReducer(appReducer, initialState);
  const { sendMessage } = useSocket(dispatch);

  let content = <Loader />;
  if (!store.loading) {
    content = (
      <Switch>
        <Redirect exact from={ROUTES.LANDING} to={ROUTES.LIVE_EVENTS} />
        <Route path={ROUTES.LIVE_EVENTS} component={LiveEvents} />
        <Route path={ROUTES.EVENT} component={Event} />
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
            <div className="container fluid app-container">{content}</div>
          </SocketContext.Provider>
        </StoreContext.Provider>
      </DispatchContext.Provider>
    </Router>
  );
}

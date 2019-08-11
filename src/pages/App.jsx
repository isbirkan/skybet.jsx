import React, { Fragment } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';
import * as ROUTES from '../constants/routes';

import Navbar from '../components/Navbar';
import Home from './Home';
import NotFound from './404';

import './global.css';

export default function App() {
  return (
    <Router>
      <Fragment>
        <Navbar />
        <Container fluid className="app-container">
          <Switch>
            <Redirect exact from={ROUTES.LANDING} to={ROUTES.HOME} />
            <Route path={ROUTES.HOME} component={Home} />
            <Route component={NotFound} />
          </Switch>
        </Container>
      </Fragment>
    </Router>
  );
}

import React from 'react';
import { Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './Navbar.css';

export default function Navbar(props) {
  return (
    <Nav className="navbar navbar-dark bg-secondary">
      <NavItem>
        <Link to={ROUTES.LANDING}>Home</Link>
      </NavItem>
    </Nav>
  );
}

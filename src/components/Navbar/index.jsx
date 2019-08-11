import React from 'react';
import { Container, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

import './Navbar.css';

export default function Navbar() {
  return (
    <Nav className="navbar navbar-dark bg-secondary">
      <Container>
        <NavItem>
          <Link to={ROUTES.LANDING}>Home</Link>
        </NavItem>
      </Container>
    </Nav>
  );
}

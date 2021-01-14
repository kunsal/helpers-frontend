import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { navigationLinks } from "./constants/navigation-links";
// import createHistory from 'history/createBrowserHistory';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const AppNavbar = ({ containerized }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="nav-transparent nav-tall">
      { containerized ? <Container>{navContent()}</Container> : navContent() }
    </Navbar>
  );
};

const navContent = () => {
  const pages = navigationLinks.filter(nav => nav.useInNavbar === true);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {
            pages.map(page => <Link className="nav-link" to={page.link} key={page.link}>{page.title}</Link>)
          }
        </Nav>
        <Nav>
          <Link className="btn btn-primary" to="/login">Login</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default AppNavbar;

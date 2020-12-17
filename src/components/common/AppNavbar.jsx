import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from 'react-router-dom';
import { navigationLinks } from "./constants/navigation-links";
import createHistory from 'history/createBrowserHistory';

const history = createHistory();

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
  <React.Fragment>
    <Link to="/" className="navbar-brand"><span className="text-danger">Helpers</span></Link>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="ml-auto">
        {
          pages.map(page => <Link className="nav-link" to={page.link} key={page.link}>{page.title}</Link>)
        }
      </Nav>
    </Navbar.Collapse>
  </React.Fragment>
  )
};

export default AppNavbar;

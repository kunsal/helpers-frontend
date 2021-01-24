import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { navigationLinks } from "./constants/navigation-links";
import { createBrowserHistory } from "history";
import { isLoggedIn } from "../../common/helpers";
import Logo from "./Logo";

const history = createBrowserHistory();

const AppNavbar = ({ containerized, logout, user }) => {
  const pages = navigationLinks.filter(nav => nav.useInNavbar === true);

//   return (
//   <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <div className="container-fluid">
//     <a className="navbar-brand" href="#">Navbar</a>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      // <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      //   <li className="nav-item">
      //     <a className="nav-link" href="#">Link</a>
      //   </li>
      //   <li className="nav-item">
      //     <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
      //   </li>
      // </ul>
      // <form className="d-flex">
      //   <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
      //   <button className="btn btn-outline-success" type="submit">Search</button>
      // </form>
//     </div>
//   </div>
// </nav>

//   );

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="nav-transparent nav-tall"
    >
      {containerized ? (
        <Container>{navContent(user, logout)}</Container>
      ) : (
        navContent(user, logout)
      )}
    </Navbar>
  );
};

const navContent = (user, logout) => {
  const pages = navigationLinks.filter(nav => nav.useInNavbar === true);
  return (
    <React.Fragment>
      <Navbar.Brand href="#home">
        <Logo />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto mb-2 mb-lg-0">
            {pages.map(page => (
              <Link className="nav-link mx-1" to={page.link} key={page.link}>
                {page.title}
              </Link>
            ))}
          </Nav>
          <Nav>
            {user && <a href='#' className="nav-link username">Hi {user.first_name}</a>}
            {!isLoggedIn() && (
              <Link className="btn btn-primary" to="/login">
                Login
              </Link>
            )}
            {isLoggedIn() && (
              <button className="btn btn-danger mr-1" onClick={logout}>
                Logout
              </button>
            )}
          </Nav>
        </Navbar.Collapse>
    </React.Fragment>
  );
};

export default AppNavbar;

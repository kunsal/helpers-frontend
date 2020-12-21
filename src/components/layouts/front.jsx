import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../common/AppNavbar";

class Front extends Component {
  
  render() {
    const { children } = this.props;

    return (
      <main>
        <AppNavbar containerized/>
        {children}
      </main>
    );
  }
}

export default withRouter(Front);

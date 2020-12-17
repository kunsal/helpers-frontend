import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

class Front extends Component {
  
  render() {
    const { children } = this.props;

    return (
      <main>
        <Container>
          
        </Container>
        {children}
      </main>
    );
  }
}

export default withRouter(Front);

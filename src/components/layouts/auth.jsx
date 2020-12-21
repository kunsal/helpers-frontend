import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

class AuthLayout extends Component {
  state = {  }
  render() { 
    return ( 
      <Container>
        <Row>
          <Col>
            { this.props.children }
          </Col>
        </Row>
      </Container>
    );
  }
}
 
export default AuthLayout;
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../common/AppNavbar";
import userService from "../../services/user-service";
import redirectIfNotLoggedIn from "../../middlewares/redirect-if-not-logged-in";

class Front extends Component {
  
  async componentDidMount() {
    redirectIfNotLoggedIn(this.props);
 
    if (await userService.isLoggedIn()) {
      const user = await userService.profile();
      this.setState({user});
    } 
  }

  async componentDidUpdate() {
    redirectIfNotLoggedIn(this.props)
  }

  handleLogout = () => {
    userService.logout();
    this.props.history.push('/login');
  }
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

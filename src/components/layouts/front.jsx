import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import AppNavbar from "../common/AppNavbar";
import userService from "../../services/user-service";
import redirectIfNotLoggedIn from "../../middlewares/redirect-if-not-logged-in";
import { Helmet } from 'react-helmet';

class Front extends Component {
  state = {
    user: null
  }

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
        <Helmet>
          <title>Helpers</title>
          <style type="text/css">{`
            .nav-link {
              color: #ccc !important;
              letter-spacing: 1px;
              font-weight: bold;
              font-size: 15px;
            }

            .nav-link:hover, .nav-link:active {
              color: #fff !important; 
            }

            .nav-link.username {
              text-decoration: none !important;
              letter-spacing: 1px;
              font-weight: normal;
            }
          `}</style>
        </Helmet>
        <AppNavbar logout={this.handleLogout} user={this.state.user} />
        <div className="">
         {children}
        </div>
        
      </main>
    );
  }
}

export default withRouter(Front);

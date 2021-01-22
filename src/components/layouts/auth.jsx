import React, { Component } from "react";
import { Container } from "react-bootstrap";
import redirectIfLoggedIn from "../../middlewares/redirect-if-logged-in";
import { Helmet } from "react-helmet";
class AuthLayout extends Component {
  state = {};

  componentDidMount() {
    redirectIfLoggedIn(this.props);
  }

  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <style type="text/css">
            {`
              html, body {
                height: 100%;
                display: flex;
              }
              body {
                background-color: #d2d2d2;
                background-image: url(https://cdn.pixabay.com/photo/2020/01/04/18/40/trees-4741364_960_720.png);
                background-size: cover;
              }

              .main-container {
                display: flex !important;
                justify-content: center;
                align-items: center;
                height: 100%;
              }

              .wrapper {
                background-color: #fcfcfc;
                padding: 20px;
                border-radius: 15px;
                box-shadow: 10px 10px 20px 10px #999; 
                width: 80%;
                min-height: 400px;
              }

              .centralize {
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .form-wrapper {
                display: flex;
                flex-direction: column;
                align-items: space-around
              }

              .page-title {
                font-size: 22px;
                letter-spacing: 2px;
              }
            `}
          </style>
        </Helmet>

        <div className="main-container">
          {this.props.children}
        </div>
      </React.Fragment>
    );
  }
}

export default AuthLayout;

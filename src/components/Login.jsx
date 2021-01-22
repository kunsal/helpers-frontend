import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { Link } from 'react-router-dom';
import userService from "../services/user-service";
import redirectIfLoggedIn from "../middlewares/redirect-if-logged-in";

class Login extends Component {
  state = {
    hasError: false,
    message: "",
    email: "",
    password: ""
  };

  componentDidMount() {
    redirectIfLoggedIn(this.props);
  }

  componentDidUpdate() {
    redirectIfLoggedIn(this.props);
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleLogin = async () => {
    const { email, password } = this.state;
    if (email == "") {
      this.setState({ hasError: true, message: "Email is required" });
    } else if (password == "") {
      this.setState({ hasError: true, message: "Password is required"})
    } 
    else {
      this.setState({ hasError: false, message: "" });
      const response = await userService.login(email, password);
      if (response.hasOwnProperty('errors')) {
        this.setState({hasError: true, message: response.errors.error[0]});
      } else {
        this.setState({hasError: false, message: 'Logged in successfully'});
      }
    }
  };

  render() {
    const { hasError, message, email, password } = this.state;
    let messageClasses = "alert";
    if (hasError) messageClasses += " alert-danger";
    if (!hasError && message !== '') messageClasses += " alert-success";

    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Row className="m-auto">
          <div className="col-md-12 text-center">
            <h1 className="page-title">Login</h1>
            <div className={messageClasses}>{message}</div>
          
            <div className="form-group">
              <label htmlFor="" className="control-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={email}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="" className="control-label">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
                className="form-control"
              />
            </div>
            <button
              className="btn btn-primary submit"
              onClick={this.handleLogin}
            >
              Login
            </button>
            <Link to="/register" id="registration-link">
              No account? Register
            </Link>
          </div>
        </Row>
      </div>
    );
  }
}

export default Login;

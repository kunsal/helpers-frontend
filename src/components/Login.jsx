import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';

class Login extends Component {
  state = { 
    hasError: false,
    message: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    this.setState({[event.target.name]: event.target.value})
  }

  handleLogin = () => {
    const {email, password} = this.state;
    if (email === '') {
      this.setState({ hasError: true, message: 'Email is required' });
    } else {
      this.setState({hasError: false, message: ''})
    }
  }

  render() { 
    const { hasError, message, email, password } = this.state;
    let messageClasses = 'alert';
    if (hasError) messageClasses += ' alert-danger';

    return ( 
      <Row>
        <div className="col-md-12 text-center">
          <h1 className="page-title">Login</h1>
          <div className={ messageClasses }>{ message }</div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="" className="control-label">Email</label>
            <input type="email" name="email" value={email} onChange={this.handleChange} className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="" className="control-label">Password</label>
            <input type="password" name="password" value={password} onChange={this.handleChange} className="form-control" />
          </div>
          <button className="btn btn-primary submit" onClick={ this.handleLogin }>Login</button>
          <a href="#" id="registration-link">Already has an account? Login</a>
        </div>
      </Row>
    );
  }
}
 
export default Login;

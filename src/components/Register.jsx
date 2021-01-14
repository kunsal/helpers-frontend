import React, { Component } from "react";
import {Row} from 'react-bootstrap';

class Register extends Component {
  state = {
    hasError: false,
    message: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    government_id: null
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  }
  
  createImage = (govt_id) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        govt_id: e.target.result
      })
    };
    console.log(reader);
    reader.readAsDataURL(govt_id);
  }

  handleRegister = () => {
    const {firstName, lastName, email, password} = this.state;
    if (firstName == '') {
      this.setState({hasError: true, message: 'First name is required'})
    } else if (lastName == '') {
      this.setState({hasError: true, message: 'Last name is required'})
    } else if (email == '') {
      this.setState({hasError: true, message: 'Email is required'})
    } else if (password == '') {
      this.setState({hasError: true, message: 'Password is required'})
    } else {
      alert('No error')
    }
  }

  render() {
    let messageClasses = "alert";
    const {firstName, lastName, email, password, government_id, hasError, message} = this.state;
    messageClasses = hasError ? messageClasses + ' alert-danger' : messageClasses;
    return (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <Row className="m-auto">
          <div className="col-md-12 text-center">
            <h1 className="page-title">Register</h1>
            <div className={messageClasses}>{message}</div>
            <div className="form-group">
              <label htmlFor="firstName" className="control-label">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={ firstName }
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName" className="control-label">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={ lastName }
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="control-label">
                Email Address
              </label>
              <input
                type="text"
                name="email"
                value={ email }
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="control-label">
                Password
              </label>
              <input
                type="text"
                name="password"
                value={ password }
                onChange={this.handleChange}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="government_id" className="control-label">
                Government Issued ID
              </label>
              <input
                type="file"
                name="government_id"
                value={ government_id }
                onChange={this.handleFileChange}
                className="form-control"
              />
            </div>

            <button
              className="btn btn-primary submit"
              onClick={this.handleRegister}
            >
              Submit
            </button>
          </div>
        
        </Row>
      </div>
    );
  }
}

export default Register;

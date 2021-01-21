import React, { Component } from "react";
import {Row} from 'react-bootstrap';
import UserService from '../services/user-service';

class Register extends Component {
  state = {
    hasError: false,
    message: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    government_id: '',
    errors: []
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFileChange = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    this.createImage(files[0]);
  }
  
  createImage = (government_id) => {
    let reader = new FileReader();
    reader.onload = (e) => {
      this.setState({
        government_id: e.target.result
      });
    };
    console.log(reader);
    reader.readAsDataURL(government_id);
  }

  handleRegister = async () => {
    const {firstName, lastName, email, password, government_id} = this.state;
    
    if (firstName === '') {
      this.setState({hasError: true, message: 'First name is required'})
    } else if (lastName === '') {
      this.setState({hasError: true, message: 'Last name is required'})
    } else if (email === '') {
      this.setState({hasError: true, message: 'Email is required'})
    } else if (password === '') {
      this.setState({hasError: true, message: 'Password is required'})
    } else if (government_id === '') {
      this.setState({hasError: true, message: 'Government issued ID is required'})
    } else if (this._validate_image(government_id) === false) {
      this.setState({hasError: true, message: 'Invalid image type. Please use png, jpg or gif', government_id: ''})
    } else {
      console.log(this.state);
      this.setState({hasError: false, message: ''})
      try {
        const response = await UserService.register({
          first_name: firstName, last_name: lastName, email, password, government_id
        });
        if (response.hasOwnProperty('token')) {
          this.setState({
            message: response.message,
            first_name: '', last_name: '', email: '', password: '', government_id: ''
          })
        } else {
          let errorMessage = '';
          for (let key in response) {
            for (let error of response[key]) {
              errorMessage +=`${key.toUpperCase()} ${error} | `;
            }
          }
          this.setState({ hasError: true, message: errorMessage})
        }
      } catch (exception) {
        this.setState({hasError: false, message: 'An error occurred'})
      }
      
    }
  }

  _validate_image = (file) => {
    const mime = (file.split(';')[0]).split(':')[1];
    console.log(mime);
    if (mime === 'image/png' || mime === 'image/jpeg' || mime === 'image/gif') {
      return true;
    } else {
      return false
    }
  }

  render() {
    let messageClasses = "alert";
    const {firstName, lastName, email, password, government_id, hasError, message} = this.state;
    messageClasses = hasError ? messageClasses + ' alert-danger' : messageClasses;
    messageClasses = !hasError && message !== '' ? messageClasses + ' alert-success' : messageClasses;
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
                type="password"
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
                // name="government_id"
                // value={ government_id }
                onChange={this.handleFileChange}
                className="form-control"
              />
              <img src={government_id} alt="" id="image-box" width="150"/>
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

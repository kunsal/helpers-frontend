import React, { Component } from "react";
import { Link } from "react-router-dom";
import UserService from '../services/user-service';
import { Helmet } from 'react-helmet';
import Logo from "./common/Logo";
import giveBox from "../images/give-box.svg";
import redirectIfLoggedIn from "../middlewares/redirect-if-logged-in";

class Register extends Component {
  state = {
    hasError: false,
    message: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    government_id: '',
    errors: [],
    loading: false
  }

  componentDidUpdate() {
    redirectIfLoggedIn(this.props);
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
      this.setState({hasError: false, message: '', loading: true})
      try {
        const response = await UserService.register({
          first_name: firstName, last_name: lastName, email, password, government_id
        });
        if (response.hasOwnProperty('token')) {
          this.setState({
            message: response.message,
            first_name: '', last_name: '', email: '', password: '', government_id: '',
            loading: false
          })
        } else {
          let errorMessage = '';
          for (let key in response) {
            for (let error of response[key]) {
              errorMessage +=`${key.toUpperCase()} ${error} | `;
            }
          }
          this.setState({ hasError: true, message: errorMessage, loading: false})
        }
      } catch (exception) {
        this.setState({hasError: true, message: 'An error occurred', loading: false})
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
    const {firstName, lastName, email, password, government_id, hasError, message, loading} = this.state;
    
    if (hasError) messageClasses += " alert-danger";
    if (!hasError && message !== '') messageClasses += " alert-success";

    return (
      <React.Fragment>
        <Helmet>
          <title>Register</title>
        </Helmet>

        <div className="row wrapper">
          <div className="col-md-12 text-center">
            <Link to='/'>
              <Logo width={200}/>
            </Link>
          </div>
          <div className="col-md-6 centralize" >
            <img src={giveBox} width="100%" />
          </div>
          <div className="col-md-6 form-wrapper">
            
            <div className={messageClasses}>{message}</div>
            <h2 className="page-title">Register</h2>
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
              disabled={loading ? true : false}
              >
                {loading ? '...' : 'Submit'}
            </button>
            <Link to="/login">
              Already registered? Login
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;

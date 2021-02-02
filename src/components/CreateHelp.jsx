import React from 'react';
import { Helmet } from 'react-helmet';
import Alert from './common/Alert';
import helpService from '../services/help-service';
import ActionCableBase from './ActionCableBase';


class CreateHelp extends ActionCableBase {

  state = { 
    categories: [],
    title: '',
    category: '',
    description: '',
    long: '',
    lat: '',
    hasError: false,
    message: "",
    loading: false
  }

  async componentDidMount() {
    const categories = await helpService.categories();
    this.setState({categories});
    this.subscription = this.consumer.subscriptions.create({channel: 'HelpsChannel', id: 1 }, {
      received: (data) => {
        // console.log(data);
      }
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = async (e) => {
    const {title, category, description, long, lat} = this.state;
    this.setState({ loading: true })
    if (title === "") {
      this.setState({ hasError: true, message: "Title is required" });
    } else if (category === '') {
      this.setState({ hasError: true, message: "Category is required" });
    } else if (description === '') {
      this.setState({ hasError: true, message: "Description is required" });
    } else if (long === '') {
      this.setState({ hasError: true, message: "Longitude is required" });
    } else if (lat === '') {
      this.setState({ hasError: true, message: "Latitude is required" });
    } else {
      this.setState({ hasError: false, message: "" });
      try {
        const response = await helpService.create({
          title, category_id: category, description, long, lat
        });
        //console.log(response);
        if (response.status === 201) {
          this.setState({
            message: 'Help created successfully.',
            title: '', category: '', description: '', long: '', lat: '',
            loading: false
          })
        } else {
          let errorMessage = '';
          let errors = response.data;
          for (let key in errors) {
            for (let error of errors[key]) {
              errorMessage +=`${key.toUpperCase()} ${error} | `;
            }
          }
          this.setState({ hasError: true, message: errorMessage, loading: false})
        }
      } catch (exception) {
        this.setState({hasError: true, message: 'An error occurred', loading: false})
      }
    }
   this.setState({ loading: false })
  }

  render() {
    const {title, category, description, long, lat, categories, hasError, message, loading} = this.state;

    let messageClasses = "alert";
    if (hasError) messageClasses += " alert-danger";
    if (!hasError && message !== "") messageClasses += " alert-success";

    return ( 
      <React.Fragment>
        <Helmet>
          <title>{this.props.appName} - Seek Help</title>
        </Helmet>
        <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <h2 className="page-title">Seek for New Help</h2>
              </div>
              <div className="col-md-8">
                <Alert messageclasses={messageClasses} message={message} />
                
                  <div className="form-group">
                    <label className="control-label">Title</label>
                    <input className="form-control" value={title} name="title" onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Category</label>
                    <select className="form-control" name="category" onChange={this.handleChange} value={category}>
                      <option>-- Choose a category --</option>
                      {categories.length > 0 && categories.map(category => 
                        <option value={category.id} key={category.id}>{category.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Description</label>
                    <textarea className="form-control" value={description} name="description" onChange={this.handleChange} />
                  </div>
                  
                  <div className="form-group">
                    <label className="control-label">Longitude</label>
                    <input className="form-control" value={long} name="long" onChange={this.handleChange} />
                  </div>

                  <div className="form-group">
                    <label className="control-label">Latitude</label>
                    <input className="form-control" value={lat} name="lat" onChange={this.handleChange} />
                  </div>
                  
                  <button 
                    className="btn btn-primary" 
                    disabled={loading ? true : false}
                    onClick={this.handleFormSubmit}
                  >
                    {loading ? '...' : 'Submit'}
                  </button>
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}
 
export default CreateHelp;
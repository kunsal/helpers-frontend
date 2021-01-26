import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Alert from './common/Alert';
import helpService from '../services/help-service';
import ActionCable from 'actioncable';
import userService from '../services/user-service';

const Pointer = () => <div style={{ color: 'red', fontSize: '18px', fontWeight: 'bold'}}>Marker</div>

class CreateHelp extends Component {
  constructor() {
    super();
    this.consumer = ActionCable.createConsumer(`ws://localhost:8800/cable?token=${userService.token()}`)
  }

  state = { 
    categories: [],
    title: '',
    category: '',
    description: '',
    location: '',
    hasError: false,
    message: "",
    loading: false
  }

  async componentDidMount() {
    const categories = await helpService.categories();
    this.setState({categories});
    this.subscription = this.consumer.subscriptions.create({channel: 'HelpsChannel'}, {
      received: (data) => {
        console.log(data);
      },
      away: () => {

      }
    });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = async (e) => {
    const {title, category, description, location} = this.state;
    this.setState({ loading: true })
    if (title === "") {
      this.setState({ hasError: true, message: "Title is required" });
    } else if (category === '') {
      this.setState({ hasError: true, message: "Category is required" });
    } else if (description === '') {
      this.setState({ hasError: true, message: "Description is required" });
    } else if (location === '') {
      this.setState({ hasError: true, message: "Location is required" });
    } else {
      this.setState({ hasError: false, message: "" });
      try {
        const response = await helpService.create({
          title, category_id: category, description, location
        });
        //console.log(response);
        if (response.status === 201) {
          console.log('success');
          this.setState({
            message: 'Help created successfully.',
            title: '', category: '', description: '', location: '',
            loading: false
          })
        } else {
          console.log('Here we are');
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
    const {title, category, description, location, categories, hasError, message, loading} = this.state;

    let messageClasses = "alert";
    if (hasError) messageClasses += " alert-danger";
    if (!hasError && message !== "") messageClasses += " alert-success";

    return ( 
      <React.Fragment>
        <Helmet>
          <title>Seek Help</title>
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
                    <label className="control-label">Location (Enter long and lat coordinates)</label>
                    <input className="form-control" value={location} name="location" onChange={this.handleChange} />
                  </div>
                  
                  <button 
                    className="btn btn-primary" 
                    disabled={loading ? true : false}
                    onClick={this.handleFormSubmit}
                  >
                    {loading ? '...' : 'Submit'}
                  </button>
                  {/* <div style={{ height: '300px', width: '100%' }}>
                    <GoogleMapReact
                      bootstrapURLKeys={{ key: 'AIzaSyCs8rvda2R2CEy9tVbhzimcNl9R8ec54mQ' }}
                      defaultCenter={[59.95, 30.33]}
                      defaultZoom={11}
                      yesIWantToUseGoogleMapApiInternals
                      //onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
                      onDragEnd={(map) => console.log(map)}
                      onChildMouseEnter={this.handleMarkerHover}
                      //draggable={false}
                    >
                      <Pointer
                        lat={59.95}
                        lng={30.33}
                      />
                    </GoogleMapReact>
                  </div> */}
                
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}
 
export default CreateHelp;
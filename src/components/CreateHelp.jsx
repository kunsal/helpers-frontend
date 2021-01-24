import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import GoogleMapReact from 'google-map-react';
import Marker from './common/Marker';
import Alert from './common/Alert';

const Pointer = () => <div style={{ color: 'red', fontSize: '18px', fontWeight: 'bold'}}>Marker</div>

class CreateHelp extends Component {
  state = { 
    categoryOptions: [{id: 1, name: 'Monetary Need'}, {id: 2, name: 'Material Need'}],
    title: '',
    category: '',
    description: '',
    location: '',
    hasError: false,
    message: "",
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = e => {
    const {title, category, description, location} = this.state;
    if (title === "") {
      this.setState({ hasError: true, message: "Title is required" });
    } else if (category === '') {
      this.setState({ hasError: true, message: "Category is required" });
    } else if (description === '') {
      this.setState({ hasError: true, message: "Description is required" });
    } else if (location === '') {
      this.setState({ hasError: true, message: "Location is required" });
    } else {
      console.log(this.state);
    }
    e.preventDefault();
  }

  render() {
    const {categoryOptions, hasError, message} = this.state;

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
                <form onSubmit={this.handleFormSubmit}>
                  <div className="form-group">
                    <label className="control-label">Title</label>
                    <input className="form-control" name="title" onChange={this.handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="control-label">Category</label>
                    <select className="form-control" name="category" onChange={this.handleChange}>
                      <option>-- Choose a category --</option>
                      {categoryOptions && categoryOptions.map(category => 
                        <option value={category.id} key={category.id}>{category.name}</option>
                      )}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Description</label>
                    <textarea className="form-control" name="description" onChange={this.handleChange} />
                  </div>
                  
                  <div className="form-group">
                    <label className="control-label">Location (Enter long and lat coordinates)</label>
                    <input className="form-control" name="location" onChange={this.handleChange} />
                  </div>
                  
                  <button className="btn btn-primary" type="submit">Submit</button>
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
                </form>
              </div>
            </div>
          </div>
      </React.Fragment>
    );
  }
}
 
export default CreateHelp;
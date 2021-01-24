import React, { Component, useEffect, useState } from 'react';
import ActionCable from 'actioncable';
import userService from '../services/user-service';
import GoogleMapReact from 'google-map-react';
import Marker from './common/Marker';
import helpService from '../services/help-service';

class Home extends Component {
  state = {
    user: null,
    center: {
      lat: 6.507882833566003,
      lng: 3.361924141847338
    },
    zoom: 13,
    helps: []
  }

  async componentDidMount() {
    this.setState({user: userService.getUser()});
    const helps = await helpService.getHelps();
    this.setState({helps})
  }
 
  render() {
    const { helps } = this.state;

    return (
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCs8rvda2R2CEy9tVbhzimcNl9R8ec54mQ' }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
              onDragEnd={(map) => console.log(map)}
            >
              {
                helps.map(help => {
                  let coordinates = help.location.split(',');
                  let lng = coordinates[0];
                  let lat = coordinates[1];
                  return <Marker lat={lng} lng={lat} help={help} /> 
                })
              }
              {/* <Marker
                lat={59.955413}
                lng={30.337844}
              />
              <Marker
                lat={59.93}
                lng={30.33}
              /> */}
            </GoogleMapReact>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          {helps.length > 0 ? helps.map(help => (
          <div className="card mb-3">
            <div className="card-header">
              {help.location}
            </div>
            <div className="card-body">
              <h5 className="card-title">{help.title}</h5>
              <p className="card-text">{help.description}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          ))
          : 
          <div className="alert alert-info">No help found</div>}
        </div>
      </div>
      // Important! Always set the container height explicitly
      
    );
  }
  
}
 
export default Home;
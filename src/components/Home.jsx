import React, { Component, useEffect, useState } from 'react';
import ActionCable from 'actioncable';
import userService from '../services/user-service';
import GoogleMapReact from 'google-map-react';
import Marker from './common/Marker';

class Home extends Component {
  state = {
    user: null,
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  }

  componentDidMount() {
    this.setState({user: userService.getUser()});
  }

  static defaultProps = {
    
  };
 
  render() {
    return (
      <div className="row">
        <div className="col-8">
          <div style={{ height: '100vh', width: '100%', border: '1px solid #000' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: 'AIzaSyCs8rvda2R2CEy9tVbhzimcNl9R8ec54mQ' }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals
              //onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
              onDragEnd={(map) => console.log(map)}
            >
              <Marker
                lat={59.955413}
                lng={30.337844}
              />
              <Marker
                lat={59.93}
                lng={30.33}
              />
            </GoogleMapReact>
          </div>
        </div>
      </div>
      // Important! Always set the container height explicitly
      
    );
  }
  
}
 
export default Home;
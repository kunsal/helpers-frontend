import React, { Component } from 'react';
import Map from './common/Map';

class Home extends Component {
  state = {  }

  render() { 
    return ( 
      <Map 
        coordinates={[
          {
            lat: 39.95, 
            lng: -105.24,
            icon: 'https://img.icons8.com/material-sharp/2x/bike-path.png',
            id: 1
          },
          {
            lat: 40, 
            lng: -105.35,
            icon: 'https://img.icons8.com/ios-filled/1x/car-cleaning.png',
            id: 2
          },
          {
            lat: 40.06, 
            lng: -105.26,
            icon: 'https://img.icons8.com/nolan/1x/find-clinic.png',
            id: 3
          },
          {
            lat: 40.05, 
            lng: -105.35,
            icon: 'https://img.icons8.com/ios-filled/1x/car-cleaning.png',
            id: 4
          },
        ]} 
        defaultLat={40.014984} defaultLng={-105.270546} zoom={12} 
      />
    );
  }
}
 
export default Home;
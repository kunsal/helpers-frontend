import React from 'react';
import userService from '../services/user-service';
import GoogleMapReact from 'google-map-react';
import Marker from './common/Marker';
import ActionCableBase from './ActionCableBase';

class Home extends ActionCableBase {
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
    this.notification = this.consumer.subscriptions.create({channel: 'HelpListChannel'}, {
      connected: () => {
        console.log('connected to help list channel')
      },
      received: data => {
        this.setState({helps: data.helps})
      }
    })
  }
 
  render() {
    const { helps } = this.state;

    return (
      <div className="row">
        <div className="col-md-8 col-sm-12">
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals
              onGoogleApiLoaded={({map, maps}) => console.log(map, maps)}
              onDragEnd={(map) => console.log(map)}
            >
              {
                helps && helps.map((help) => {
                  let coordinates = help.location.split(',');
                  let lng = coordinates[0];
                  let lat = coordinates[1];
                  return <Marker yesIWantToUseGoogleMapApiInternals draggable lat={lng} lng={lat} help={help} key={help.id} /> 
                })
              }
            </GoogleMapReact>
          </div>
        </div>
        <div className="col-md-4 col-sm-12">
          <p>Unfulfilled Helps: {helps.length}</p>
          {helps && helps.length > 0 ? helps.map(help => (
          <div className="card mb-3" key={help.id}>
            <div className="card-header" style={{ backgroundColor: help.category.color }}>
              {help.category.name}
            </div>
            <div className="card-body">
              <h5 className="card-title">{help.title}</h5>
              <p className="card-text">{help.description}</p>
              <p className="help-text">{help.user.first_name}</p>
              <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
          </div>
          ))
          : 
          <div className="alert alert-info">No help found</div>}
        </div>
      </div>
    );
  }
  
}
 
export default Home;
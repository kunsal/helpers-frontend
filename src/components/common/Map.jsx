import React from 'react';
import { withGoogleMap, withScriptjs, GoogleMap, Marker } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import { useHistory } from 'react-router-dom';

const Map = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCs8rvda2R2CEy9tVbhzimcNl9R8ec54mQ&v=3.exp&libraries=geometry,drawing",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)(({coordinates, defaultLat, defaultLng, zoom}) => {
  const history = useHistory();

  const handleMarkerClick = (markerId) => {
    history.push('/help/' + markerId);
  }
  return (
    <GoogleMap
      defaultZoom={zoom ? zoom : 11}
      defaultCenter={{ lat: defaultLat, lng: defaultLng }}
    >
      { coordinates.map(({lat, lng, icon, id}, idx) => 
      <Marker 
        position = {{ lat, lng }} 
        icon = {{ url: icon }}
        key = {idx}
        onClick = { markerId => handleMarkerClick(id) }
        title = 'This is an help'
      />)}
    </GoogleMap> 
  );
}

);

export default Map
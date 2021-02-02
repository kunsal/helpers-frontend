import React from 'react';
import userService from '../services/user-service';
import GoogleMapReact from 'google-map-react';
import Marker from './common/Marker';
import ActionCableBase from './ActionCableBase';
import helpService from '../services/help-service';
import Helmet from 'react-helmet';
import moment from 'moment';
import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Home extends ActionCableBase {
  state = {
    user: null,
    center: {
      lat: 6.507882833566003,
      lng: 3.361924141847338
    },
    zoom: 13,
    helps: [],
    showModal: false,
    help: null
  }

  async componentDidMount() {
    const helps = await helpService.getHelps();
    if (helps) this.setState({helps});
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
    const { helps, showModal, help } = this.state;

    return (
      <React.Fragment>
       <Helmet>
         <style type="text/css">{`
          body {
            background-color: rgb(222, 217, 251);
          }
          #map {
            height: 90vh;
          }   
          @media screen and (min-width: 700px) {
            .help-list {
              height: 78vh;
              overflow: scroll;
            }
          }
          .stats {
            text-align: center;
          }
          .stat-title {
            font-size: 18px;
            letter-spacing: 5px;
            color: #6b55e4;
          }
          .stat-value {
            font-size: 50px;
            font-weight: bold;
            line-height: 1;
          }
          .meta {
            font-size: 12px;
          }
          .card-text {
            font-size: 14px !important;
            color: #666;

          }

          @media screen and (max-width: 759px) {
            #map {
              height: 50vh;
            }
          }
          
        `}</style>
       </Helmet>
       <div className="row">
        <div className="col-md-8 col-sm-12">
          <div id="map">
            <GoogleMapReact
              bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
              defaultCenter={this.state.center}
              defaultZoom={this.state.zoom}
              yesIWantToUseGoogleMapApiInternals
              
            >
              {
                helps && helps.map((help) => {
                  let coordinates = help.location.split(',');
                  let lng = coordinates[0];
                  let lat = coordinates[1];
                  return <Marker lat={lng} lng={lat} handleOpen={() => this.handleModalOpen(help)} key={help.id} type={help.category.color} /> 
                })
              }
            </GoogleMapReact>
          </div>
        </div>
        <div className="col-md-4">
          <div className="stats">
            <p className="stat-title">UNFULFILLED HELPS</p>
            <p className="stat-value">{helps.length}</p>
          </div>
          
          <div className="help-list">
            {helps && helps.length > 0 ? helps.map(help => (
            <div className="card mb-3" key={help.id}>
              <div className="card-header" style={{  }}>
                {help.title}
              </div>
              <div className="card-body">
                <div className="row meta">
                  <div className="col-md-6"><span className="label" style={{ 
                    backgroundColor: help.category.color, padding: '2px 8px', 
                    color: 'white', borderRadius: '7px', fontWeight: 'bold'
                  }}>{help.category.name}</span></div>
                  <div className="col-md-6 text-end">Posted <span style={{ fontWeight: 'bold' }}>
                    {moment(help.created_at).fromNow()}
                  </span></div>
                </div>
                <p className="card-text">{help.description.substring(0, 70)}...
                  <Link as="a" onClick={() => this.handleModalOpen(help)}>View Details</Link>
                </p>
              </div>
              <div className="card-footer text-end" style={{ fontSize: 12 }}>
                Requested by <span style={{ fontWeight: 'bold'}}>{help.user.first_name} {help.user.last_name}</span>
              </div>
            </div>
            ))
            : 
            <div className="alert alert-info">No help found</div>}
          </div>
          
        </div>
        <Modal
          show={showModal}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
        { help && 
          <>
            <Modal.Header>
              <Modal.Title>{ help.title }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              { help.description }
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Link to={`/help/${help.id}`} className="btn btn-primary">
              { help.user_id === this.state.user.id ? 'View Offers' : 'Offer Help' }
              </Link>
            </Modal.Footer>
          </>
        }
        </Modal>
      </div>
      </React.Fragment>
    );
  }
  
  handleClose = () => {
    this.setState({showModal: false});
  }

  handleModalOpen = (help) => {
    this.setState({help, showModal: true});
  }

}
 
export default Home;
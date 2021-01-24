import React, { Component } from "react";
import redMarker from "../../images/red-marker.svg";
import { Helmet } from "react-helmet";
import { Modal, Button } from "react-bootstrap";

class Marker extends Component {
  state = {
    defaultWidth: 30,
    show: false,
    help: null
  };

  handleMouseOver = e => {
    e.target.width = 45;
  };

  handleMouseOut = e => {
    e.target.width = this.state.defaultWidth;
  };

  handleClose = () => {
    this.setState({show: false});
  }

  render() {
    const { show } = this.state;
    const { help } = this.props;

    return (
      <React.Fragment>
        <Helmet>
          <style>{`
            .marker {
              cursor: pointer
            }
          `}</style>
        </Helmet>
        <img
          src={redMarker}
          width={this.state.defaultWidth}
          className="marker"
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          onClick={() => {
            this.setState({show: true});
          }}
        />

        <Modal
          show={show}
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
              <Button variant="primary">Render Help</Button>
            </Modal.Footer>
          </>
        }
        </Modal>

      </React.Fragment>
    );
  }
}

export default Marker;

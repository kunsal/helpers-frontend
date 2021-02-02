import React, { Component } from "react";
import redMarker from "../../images/red-marker.svg";
import blackMarker from "../../images/black-marker.svg";
import { Helmet } from "react-helmet";

class Marker extends Component {
  state = {
    defaultWidth: 30,
  };

  handleMouseOver = e => {
    e.target.width = 45;
  };

  handleMouseOut = e => {
    e.target.width = this.state.defaultWidth;
  };

  render() {
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
          src={this.props.type === 'blue' ? redMarker : blackMarker}
          width={this.state.defaultWidth}
          className="marker"
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseOut}
          onClick={this.props.handleOpen}
        />
      </React.Fragment>
    );
  }
}

export default Marker;

import React, { Component } from 'react';

class HelpDetails extends Component {
  state = {  }

  render() { 
    const { id } = this.props.match.params
    return (
      <h1>Help ID is {id}</h1>
    )
  }
}
 
export default HelpDetails;
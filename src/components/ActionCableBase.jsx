import React, {Component} from 'react';
import userService from "../services/user-service";
import actioncable from 'actioncable';

class ActionCableBase extends Component {
  constructor() {
    super();
    this.consumer = actioncable.createConsumer(`${process.env.REACT_APP_SOCKET_URL}/cable?token=${userService.token()}`)
  }
  
  render() { 
    return ( null );
  }
}
 
export default ActionCableBase;
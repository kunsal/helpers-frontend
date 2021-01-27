import React, {Component} from 'react';
import userService from "../services/user-service";
import actioncable from 'actioncable';

class ActionCableBase extends Component {
  constructor() {
    super();
    this.consumer = actioncable.createConsumer(`ws://localhost:8800/cable?token=${userService.token()}`)
  }
  
  render() { 
    return ( null );
  }
}
 
export default ActionCableBase;
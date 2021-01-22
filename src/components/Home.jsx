import React, { Component } from 'react';
import ActionCable from 'actioncable';
import userService from '../services/user-service';
class Home extends Component {
  constructor() {
    super();
    this.consumer = ActionCable.createConsumer(`ws://localhost:8800/cable?token=${userService.token()}`)
  } 

  state = { 
    message: '',
    chatMsg: [],
    user: null
  }

  componentDidMount() {
    this.setState({user: userService.getUser()});
    this.subscription = this.consumer.subscriptions.create({channel: 'AppearanceChannel', id: 1}, {
      received: (data) => {
        this.setState({chatMsg: [...this.state.chatMsg, data]});
      },
      away: () => {

      }
    });
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitMessage = () => {
    this.subscription.send({id: this.state.user.id, message: this.state.message})
    this.setState({message: ''})
  }

  render() { 
    const { chatMsg } = this.state;
    return ( 
      <div className="row">
        <div className="col-md-6">
          <div className="p-20 m-10" style={{ background: '#ccc'}}>
            {chatMsg.map(chat => (
              chat.id === this.state.user.id ?
              <p className="pull-right" style={{ color: 'green'}}>You say: {chat.message}</p>
              : <p style={{ color: 'blue'}}>{chat.username} says: {chat.message}</p>
            ))}
          </div>
          
          <h1>Chats</h1>
          <input className="form-control" type="text" value={this.state.message} name="message" onChange={this.handleChange} />
          <button className="btn btn-primary" onClick={this.submitMessage}>Send</button>
        </div>
      </div>
      
    );
  }
}
 
export default Home;
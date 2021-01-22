import React, { Component } from 'react';
import ActionCable from 'actioncable';
import userService from '../services/user-service';
const id = 1;
class Home extends Component {
  constructor() {
    
    super();
    this.consumer = ActionCable.createConsumer(`ws://localhost:8800/cable?token=${userService.token()}`)
    this.subscription = this.consumer.subscriptions.create({channel: 'AppearanceChannel', id: 1}, {
      connected: () => {
        console.log('Connected to channel')
      },
      disconnected: () => {},
      received: (data) => {
        console.log(data)
      },
      away: () => {

      }
    })
    
  } 

  state = { 
    message: '',
    chatMsg: []
  }

  componentDidMount() {
    console.log('Component mounted')
    this.subscription = this.consumer.subscriptions.create({channel: 'AppearanceChannel', id: 1}, {
      received: (data) => {
        const chats = [...this.state.chatMsg, data];
        this.setState({chatMsg: chats});
      },
      away: () => {

      }
    })
  }

  componentDidUpdate() {
    
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitMessage = () => {
    this.subscription.send({id: id, message: this.state.message})
    
    this.setState({message: ''})
  }

  render() { 
    const { chatMsg } = this.state;
    return ( 
      <div className="row">
        <div className="col-md-6">
          <div className="p-20 m-10" style={{ background: '#ccc'}}>
            {chatMsg.map(chat => (
              chat.id === id ?
              <p className="pull-right" style={{ color: 'green'}}>{chat.username} says: {chat.message}</p>
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
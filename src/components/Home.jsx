import React, { Component } from 'react';
import ActionCable from 'actioncable';
const tokenFire = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJleHAiOjE2MTEzNDk2MzAsImlhdCI6MTYxMTE3NjgzMH0.TPvpjBquZekNjiBTKJ_z2VkHlG3eUunNiUZNf3Elu94';
const tokenChrm = 'eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE2MTEzNTM4NjYsImlhdCI6MTYxMTE4MTA2Nn0.Bo8UKBPGBuyQ0nOi3DD0uitXGJo_JIMWeMOsgRC3Us8'

const isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
const isFirefox = typeof InstallTrigger !== 'undefined';
const token = isChrome ? tokenChrm : tokenFire;
class Home extends Component {
  constructor() {
    
    super();
    this.consumer = ActionCable.createConsumer(`ws://localhost:3000/cable?token=${token}`)
    // this.subscription = this.consumer.subscriptions.create({channel: 'AppearanceChannel', id: 1}, {
    //   connected: () => {
    //     console.log('Connected to channel')
    //   },
    //   disconnected: () => {},
    //   received: (data) => {
    //     console.log(data)
    //   },
    //   away: () => {

    //   }
    // })
    
  } 

  state = { 
    message: '',
    chatMsg: []
  }

  componentDidMount() {
    console.log('Component mounted')
  }

  componentDidUpdate() {
    this.subscription = this.consumer.subscriptions.create({channel: 'AppearanceChannel', id: 1}, {
      received: (data) => {
        const chats = [...this.state.chatMsg, data.message];
        this.setState({chatMsg: chats});
      },
      away: () => {

      }
    })
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitMessage = () => {
    this.subscription.send({message: this.state.message})
    
    this.setState({message: ''})
  }

  render() { 
    const { chatMsg } = this.state;
    return ( 
      <div>
        {chatMsg.map(chat => (
          <p>{chat}</p>
        ))}
        <h1>Chats</h1>
        <input type="text" value={this.state.message} name="message" onChange={this.handleChange} />
        <button onClick={this.submitMessage}>Send</button>
      </div>
      
    );
  }
}
 
export default Home;
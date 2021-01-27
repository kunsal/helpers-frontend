import React, { Component } from 'react';
import helpService from '../services/help-service';
import Skeleton from 'react-loading-skeleton';
import ActionCableBase from './ActionCableBase';
import chatService from '../services/chat-service';
import userService from '../services/user-service';

class HelpDetails extends ActionCableBase {
  state = { help: false, message: '', chats: [] }

  async componentDidMount() {
    try {
      const help = await helpService.getHelp(this.props.match.params.id)
      this.setState({help})
      this.subscription = this.consumer.subscriptions.create({channel: 'ChatsChannel', id: help.id }, {
        connected: () => {
          console.log('Connection successful')
        },
        received: (data) => {
          //console.log(data);
          if (data.initial !== undefined) {
            this.setState({chats: JSON.parse(data.chats)})
          } else {
            data = JSON.parse(data)
            this.setState({chats: [...this.state.chats, data]});
          }
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = async () => {
    const { message, help } = this.state;
    try {
      this.subscription.send({id: this.state.help.id, message});
      const saveChat = await chatService.create({
        help_id: help.id,
        user_id: chatService.getUser().id,
        message
      })
  
      this.setState({ message: '' })
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  render() { 
    const { help, chats } = this.state;
    return (
      <div className="row">
        { help ?
        <div className="col-md-7">
          <img src={help.user.government_id} alt="" width="250"/>
          <h2>{help.title}</h2>
          <p>By: {help.user.first_name}</p>
          <p>{help.description}</p>
        </div>
        :
        <div className="col-md-7">
          <div className="row">
            <div className="col-md-2">
              <Skeleton circle={true} height={70} width={70} />
            </div>
            <div className="col-md-offset-2 col-md-8">
              <Skeleton height={20}/>
              <br/>
              <Skeleton height={20}/>
              <Skeleton height={20}/>
              <Skeleton height={20}/>
            </div>
          </div>
          
        </div> 
        }
        <div className="col-md-5">
          { chats.length > 0 ? chats.map((chat) => (
            <div className="row" key={chat.id}>
            { chat.user_id === userService.getUser().id ? 
              <React.Fragment>
                <div className="col-md-6"></div>
                <div className="col-md-6">
                  <p style={{ fontSize: '11px', color: 'blue', fontWeight: 'bold' }}>{chat.user.first_name}</p>
                  <p>{ chat.message }</p>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className="col-md-6">
                  <p style={{ fontSize: '11px', color: 'red', fontWeight: 'bold' }}>{chat.user.first_name}</p>
                  <p>{ chat.message }</p>
                </div>
                <div className="col-md-6"></div>
              </React.Fragment>
            }
            </div>
          )):
          <React.Fragment>
            <Skeleton height={20}/>
            <Skeleton height={20}/>
          </React.Fragment>}
          <div className="form-group">
            <label htmlFor="message" className="control-label"></label>
            <textarea name="message" id="message" value={this.state.message} rows="5" className="form-control" onChange={this.handleChange}></textarea>
          </div>
          <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
        </div>
      </div>
      
    )
  }
}
 
export default HelpDetails;
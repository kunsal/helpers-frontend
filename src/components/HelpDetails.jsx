import React, { Component } from 'react';
import helpService from '../services/help-service';
import Skeleton from 'react-loading-skeleton';
import ActionCableBase from './ActionCableBase';

class HelpDetails extends ActionCableBase {
  state = { help: false, message: '', messages: [] }

  async componentDidMount() {
    try {
      const help = await helpService.getHelp(this.props.match.params.id)
      this.setState({help})
      this.subscription = this.consumer.subscriptions.create({channel: 'ChatsChannel', id: help.id }, {
        connected: () => {
          console.log('Connected to channel')
        },
        received: (data) => {
          console.log(data);
          this.setState({messages: [...this.state.messages, data.message]});
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    this.subscription.send({id: this.state.help.id, message: this.state.message});
    this.setState({message: ''})
  }

  render() { 
    const { help } = this.state;
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
          {this.state.messages.map((message, idx) => (
            <p key={idx}>{message}</p>
          ))}
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
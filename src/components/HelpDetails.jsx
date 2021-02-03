import React from 'react';
import helpService from '../services/help-service';
import Skeleton from 'react-loading-skeleton';
import ActionCableBase from './ActionCableBase';
import chatService from '../services/chat-service';
import userService from '../services/user-service';
import verified from '../images/verified.svg';
import cancel from '../images/cancel.svg';
import Helmet from 'react-helmet';
import moment from 'moment';

class HelpDetails extends ActionCableBase {
  constructor() {
    super();
    this.chatBottom = React.createRef();
  }

  state = { help: false, message: '', chats: [], typing: '', fulfilled: false }

  async componentDidMount() {
    try {
      const help = await helpService.getHelp(this.props.match.params.id)
      this.setState({help, fulfilled: help.status})
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
      });
      this.notification = this.consumer.subscriptions.create({channel: 'NotificationChannel', id: help.id}, {
        connected: () => {
          console.log('connected to notification')
        },
        received: data => {
          // console.log(data);
          this.setState({typing: data.message})
        }
      })

      this.status = this.consumer.subscriptions.create({channel: 'StatusChannel', id: help.id}, {
        connected: () => {
          console.log('connected to status channel')
        },
        received: data => {
          // console.log(data);
          this.setState({fulfilled: data.status})
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = async () => {
    const { message, help } = this.state;
    try {
      this.subscription.send({id: this.state.help.id, message});
      await chatService.create({
        help_id: help.id,
        user_id: chatService.getUser().id,
        message
      })
      this.chatBottom.current.scrollIntoView();
      this.setState({ message: '' })
    } catch (error) {
      console.log('Something went wrong')
    }
  }

  handleKeyPress = async e => {
    if (e.code == 'Enter' && !e.ctrlKey) {
      e.preventDefault();
      await this.handleSubmit();
    } 
    // if (this.state.help.user_id === userService.getUser().id) {
    //   this.notification.send({key: 'typing'})
    // }
  }

  handleKeyUp = async e => {
    this.notification.send({key: 'not typing'})
  }

  render() { 
    const { help, chats, typing, fulfilled } = this.state;
    const user = userService.getUser();
    return (
      <div className="container">
      <div className="row page-container">
        <Helmet>
          <title>{help && help.title}</title>
          
          <style type="text/css">
          {`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@900&display=swap');
            .page-container {
              padding-top: 10px;
            }

            .chat-box {
              width: 45%;
              border-radius: 0 10px;
              margin-bottom: 5px;
            }
            .chat-container {
              position: relative;
              height: 78vh;  
              overflow: scroll;
              background: #fcfcfc;
            }
            .beneficiary {
              background: #e0fde4;
              border: 1px solid #e0fde4;
            }
            .volunteer {
              background: #fde0e0;
              border: 1px solid #fde0e0;
            }
            .user-name {
              font-size: 10px;
              font-weight: bold;
              margin-bottom: -7px; 
            }
            .beneficiary .user-name {
              color: green;
            }
            .volunteer .user-name {
              color: red;
            }
            .help-title {
              font-family: "Poppins"
            }
            .requester {
              font-family: "Poppins";
              font-weight: 400;
              color: #666;
            }
            
          `}
          </style>
          
        </Helmet>
        <div className="col-md-5">
        { help ?
        <React.Fragment>
          <div className="row">
            <div className="col-md-12">
              <img src={help.user.government_id} height="200" style={{ height: '30vh', maxWidth:'100%', marginBottom: '20px' }} />
              {/* <div style={{ height: '30vh' }}>
                <GoogleMapReact
                  bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                  defaultCenter={{ lat: help.lat, long: help.long}}
                  defaultZoom={ 11 }
                >
                  <Marker lat={help.lat} lng={help.long} help={help} /> 
                </GoogleMapReact>
              </div> */}
            </div>
            <div className="col-md-9">
              <h4 className="help-title" style={{ fontSize: '18px' }}>{help.title}</h4>
            </div>
            <div className="col-md-3 text-center">
              <img src={ fulfilled ? verified : cancel } width="30" />
              <p className="text-center" style={{ fontSize: '12px' }}>{ fulfilled ? <span className="text-primary">Fulfilled</span> : <span className="text-danger">Unfulfilled</span> }</p>
            </div>
          </div>
          
          <p>Posted By: <span className="requester">{help.user.first_name} {help.user.last_name}</span><span className="mr-auto"></span> </p>
          <p>Category: <span className="requester">{help.category.name}</span><span className="mr-auto"></span></p>
          <p>Posted: <span className="requester">{moment(help.created_at).fromNow()}</span><span className="mr-auto"></span></p>
          
          <p style={{ textAlign: 'justify' }}>{help.description}</p>
        </React.Fragment>
        :
        <div className="row">
          <div className="col-md-12">
            <Skeleton height={200} />
          </div>

          <div className="col-md-offset-2 col-md-8">
            <div className="row">
              <div className="col-md-10">
                <Skeleton height={30} width={150} />
              </div>
              <div className="col-md-2">
                <Skeleton circle={true} height={70} width={70} />
              </div>
            </div>
            <br/>
            <Skeleton height={20}/>
            <Skeleton height={20}/>
            <Skeleton height={20}/>
            <Skeleton height={50}/>
          </div>
        </div>
        }
        </div>
        <div className="col-md-7">
          <div className="chat-container">
          { chats.length > 0 ? chats.map((chat) => (
            <div className="row" key={chat.id}>
            { chat.user_id === user.id ? 
              <React.Fragment>
                <div className="col-md-6"></div>
                <div className="col-md-6 chat-box beneficiary">
                  <p className="user-name">You</p>
                  <p>{ chat.message }</p>
                </div>
              </React.Fragment>
              :
              <React.Fragment>
                <div className="col-md-6 chat-box volunteer">
                  <p className="user-name">{chat.user.first_name} {chat.user.last_name}{chat.user_id === help.user_id && `(requester)`}</p>
                  <p>{ chat.message }</p>
                </div>
                <div className="col-md-6"></div>
              </React.Fragment>
            }
            </div>
          )):
            <React.Fragment>
              <div className="alert alert-info">Type a message to engage requester</div>
            </React.Fragment>}
            <div ref={this.chatBottom}></div>
          </div>
          <div className="row">
            {!fulfilled &&
            <div className="col-md-12">
              <div className="form-group">
                {typing !== '' && <p className="text-info">{typing}</p>}
                <textarea 
                  name="message" 
                  placeholder="Your message here..." 
                  id="message" value={this.state.message} 
                  className="form-control" 
                  onChange={this.handleChange} 
                  onKeyDown={this.handleKeyPress}
                  onKeyUp={this.handleKeyUp}
                ></textarea>
              </div>
              <button onClick={this.handleSubmit} className="btn btn-primary">Submit</button>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
      
      
    )
  }
}
 
export default HelpDetails;
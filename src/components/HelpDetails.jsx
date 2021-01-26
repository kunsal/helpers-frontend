import React, { Component } from 'react';
import helpService from '../services/help-service';
import Skeleton from 'react-loading-skeleton';

class HelpDetails extends Component {
  state = { help: false }

  async componentDidMount() {
    try {
      const help = await helpService.getHelp(this.props.match.params.id)
      this.setState({help})
    } catch (error) {
      console.log(error);
    }
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
      </div>
      
    )
  }
}
 
export default HelpDetails;
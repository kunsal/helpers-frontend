import React, { Component } from 'react';

class Home extends Component {
  state = { count: 0 }

  incrementCounter = () => {
    const count = this.state.count + 1;
    this.setState({ count });
  }

  decrementCounter = () => {
    let count = this.state.count - 1;
    this.setState({ count: count < 0 ? 0 : count });
  }

  render() { 
    return ( 
      <React.Fragment>
        <button className="increment" onClick={this.incrementCounter}>Increment</button>        
        <button className="decrement" onClick={this.decrementCounter}>Decrement</button>        
        <div className="countdown">{this.state.count}</div>
      </React.Fragment>
    );
  }
}
 
export default Home;
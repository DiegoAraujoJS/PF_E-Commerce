import React, {Component} from 'react';
import Calendar from "./calendar/Calendar";

class App extends Component {

  render() {
    const propsEmail={email:this.props.email || this.props.children[0]}
    
    return (
      <Calendar {...propsEmail} />
    );
  }
}

export default App;

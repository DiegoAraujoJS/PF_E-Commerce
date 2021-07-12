import React, {Component} from 'react';
import Calendar from "./calendar/Calendar";

class App extends Component {

  render() {
    
    const propsEmail={email:this.props.email}
    return (
      <Calendar {...propsEmail} />
    );
  }
}

export default App;

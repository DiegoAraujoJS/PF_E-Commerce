import React, {Component} from 'react';
import Calendar from "./calendar/Calendar";

class App extends Component {

  render() {
    console.log("Esto es clase",this.props.email)
    const propsEmail={email:this.props.email}
    return (
      <Calendar {...propsEmail} />
    );
  }
}

export default App;

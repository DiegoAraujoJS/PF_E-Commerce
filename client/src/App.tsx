import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
        
        <Route exact path='/clases' ><div><span>funca</span></div></Route>
        <Route exact path='/'> <Login /> </Route>
    </BrowserRouter>
    // <Login />
  );
}

export default App;

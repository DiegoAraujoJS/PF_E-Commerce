import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import ClassContainer from './components/classContainer/ClassContainer';
function App() {
  return (
    <BrowserRouter>
        
        <Route exact path='/clases'><ClassContainer /></Route>
        <Route exact path='/'> <Login /> </Route>
    </BrowserRouter>
    // <Login />
  );
}

export default App;

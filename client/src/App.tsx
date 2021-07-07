import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import ClassContainer from './components/classContainer/ClassContainer';
import CalendarApp from './components/calendar/Calendar';
function App() {
  return (
    <BrowserRouter>
        <Route exact path='/clases'><ClassContainer /></Route>
        <Route exact path='/'> <Login /> </Route>
        <Route exact path='/calendar'> <CalendarApp /> </Route>
    </BrowserRouter>
    
  );
}

export default App;

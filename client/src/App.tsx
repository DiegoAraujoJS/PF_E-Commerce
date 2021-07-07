import React from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './components/login/login';
import {BrowserRouter} from 'react-router-dom'
import {Route} from 'react-router-dom'
import ClassContainer from './components/classContainer/ClassContainer';
import CalendarApp from './components/calendar/Calendar';
import Claims from './components/Claims/Claims';
import AddClaim from './components/Claims/AddClaim';
import DetailClaim from './components/Claims/DetailClaim';
function App() {
  return (
    <BrowserRouter>
        <Route exact path='/clases'><ClassContainer /></Route>
        <Route exact path='/'> <Login /> </Route>
        <Route exact path='/calendar'> <CalendarApp /> </Route>
        <Route exact path = '/claim'><Claims/></Route>
      <Route exact path = '/claim/:id'><DetailClaim/></Route>
      <Route exact path = '/claim/add'><AddClaim/></Route>
    </BrowserRouter>
    
  );
}

export default App;

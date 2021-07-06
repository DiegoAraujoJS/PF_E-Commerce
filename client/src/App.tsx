import React from 'react';
import { Route } from 'react-router';
import './App.css';
//import Login from './components/login/login';
import Claims from './components/Claims/Claims';
import DetailClaim from './components/Claims/DetailClaim';

function App() {
  return (
    // <Login />
    <div>
      <Route exact path = '/claim'><Claims/></Route>
      <Route exact path = '/claim/:id'><DetailClaim/></Route>
    </div>
  );
}

export default App;

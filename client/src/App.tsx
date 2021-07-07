import React from 'react';
import { Route } from 'react-router';
import './App.css';
//import Login from './components/login/login';
import Claims from './components/Claims/Claims';
import DetailClaim from './components/Claims/DetailClaim';
import AddClaim from './components/Claims/AddClaim';

function App() {
  return (
    // <Login />
    <div>
      <Route exact path = '/claim'><Claims/></Route>
      <Route exact path = '/claim/:id'><DetailClaim/></Route>
      <Route exact path = '/add'><AddClaim/></Route>
    </div>
  );
}

export default App;

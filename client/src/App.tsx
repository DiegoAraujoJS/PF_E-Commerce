import React from 'react';

import './App.css';
import Login from './components/login/login';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom'
import ClassContainer from './components/classContainer/ClassContainer';
import CalendarApp from './components/calendar/Calendar';
import Claims from './components/Claims/Claims';
import AddClaim from './components/Claims/AddClaim';
import DetailClaim from './components/Claims/DetailClaim';
import Profile from './components/perfilProfesor/profile';
import Chat from './components/Chat/Chat'
import Home from './components/home/Home'
import Register from './components/Register/Register'
import axios from 'axios';

interface User{username: string, password: string, role: string}



function App() {

  let [role, setRole] = React.useState('')
  
  

  React.useEffect(() => {
    async function setRoleOfUser () {
      if (localStorage.getItem('user')) {
        const roleOfUser = await axios.get(`http://localhost:3001/api/session/${JSON.parse(localStorage.getItem('user')).username}`)
        if (roleOfUser.data) {
          setRole(roleOfUser.data)
        } else {
          console.log('el servidor no encontro ningun usuario con ese id')
        }
      }
    }
    setRoleOfUser()
  }, [role])

  
  return (
    <BrowserRouter>
      <Route exact path = '/home'> <Home/> </Route>
      <Route exact path = '/clases'><ClassContainer /></Route>
      <Route exact path = '/login'> <Login /> </Route>
      <Route exact path = '/calendar'> <CalendarApp /> </Route>
      <Route exact path = '/claim' render={() => {
        console.log('role data ', role)

        // if (!role) axios.get(`http://localhost:3001/api/session/${JSON.parse(localStorage.getItem('user')).username}`)
        // .then(e => setRole(e.data)
        if (role === 'admin') return <Claims />
      }
      }></Route>
      <Route exact path = '/claim/:id'><DetailClaim/></Route>
      <Route exact path = '/claim/add'><AddClaim/></Route>
      <Route exact path = '/claim/id/add'><AddClaim/></Route>
      <Route exact path = '/perfil'><Profile /></Route>
      <Route  path='/perfil/:email' exact render={({ match }) => {
           return <Profile >{match.params.email} </Profile>     
     }}/>
      <Route exact path = '/chat'><Chat /></Route>
      <Route exact path = '/registro'><Register /></Route>
    </BrowserRouter>
    
  );
}

export default App;

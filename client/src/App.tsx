import React from 'react';

import './App.css';
import Login from './components/login/login';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
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
import NavBar from './components/NavBar/NavBar'


function App() {

  let [role, setRole] = React.useState(undefined)

  React.useEffect(() => {
    async function setRoleOfUser() {
      
      if (localStorage.getItem('user')) {
        const roleOfUser = await axios.get(`http://localhost:3001/api/session/${JSON.parse(localStorage.getItem('user')).mail}`)
        console.log('role ', roleOfUser)
        if (roleOfUser.data === 1) {
          console.log(localStorage.getItem('user'))
          setRole(roleOfUser.data)
        } else {
          console.log('el servidor no encontro ningun usuario con ese id')    
          setRole(undefined)      
        }
      }
    }
    setRoleOfUser()
  }, [])


  return (
    <BrowserRouter>
      <Route path='/'> <NavBar /> </Route>

      
        <Route exact path='/claim' render={() => {

          
          if (role === 1) {
            return <Claims />
          }
          else {
            return < Redirect to="/home" />
          }           
      }
      }></Route>
      
      <Route exact path='/claim/:id' render={() => {
          if (role === 1) {
            return <DetailClaim />
          }
          else {
            return < Redirect to="/home" />
          }          
      }
      }>
      </Route>

      <Route exact path='/claim/id/add' render={() => {
          if (role === 1) {
            return <AddClaim />
          }
          else {
            return < Redirect to="/home" />
          }        
      }
      }></Route>

    <Route exact path='/perfil' render={() => {
            
            return < Redirect to={`/perfil/${JSON.parse(localStorage.getItem('user')).mail}`} />
          }           
      }
      ></Route>
      <Route path='/perfil/:email' exact render={({ match }) => {
            return <Profile >{match.params.email} </Profile>           
          }           
      } />
      

      <Route exact path='/registro' render={() => {
          if (role === undefined) {
            return <Register />
          }
          else {
            return <Register />
          }           
      }
      }></Route>

      <Route exact path='/login'> <Login /> </Route>
      <Route exact path='/calendar'> <CalendarApp /> </Route>
      <Route exact path='/chat'><Chat /></Route>
      <Route exact path='/claim/add'><AddClaim /></Route>
      <Route exact path='/home'> <Home /> </Route>
      <Route exact path='/clases'><ClassContainer /></Route>
    </BrowserRouter>

  );
}

export default App;

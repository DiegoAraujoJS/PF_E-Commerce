import React from 'react';

import './App.css';
import Login from './components/login/login';
import { BrowserRouter, Redirect, Route, useHistory } from 'react-router-dom';
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
import AddClass from './components/addClass/addClass';
import SearchBar from './components/searchBar/SearchBar';
import SearchBarHome from './components/searchBar/SearchBarHome';
import getCookieValue from './cookieParser';

enum Role {USER, PROFESSOR, ADMIN}
function App() {
  const history = useHistory()

  let [role, setRole] = React.useState(undefined)

  React.useEffect(() => {
    async function setRoleOfUser() {
      
      if (localStorage.getItem('login')) {
        const token = getCookieValue('token').slice(1, getCookieValue('token').length - 1)
        const roleOfUser = await axios.post(`http://localhost:3001/api/verify`, {},{ withCredentials: true, headers: {Authorization: token}})
        console.log(roleOfUser)
        if (roleOfUser.status === 200) {
          
          setRole(roleOfUser.data.role)
        } else {
          
          setRole(undefined)      
        }
        console.log(role)
      }
    }
    setRoleOfUser()
  }, [])


  return (
    <BrowserRouter>
      <Route path='/'><SearchBarHome /></Route>
      <Route path='/clases/add'><AddClass /></Route>

      
        {role !== undefined ? <Route exact path='/claim' render={() => {
          
          if (role === Role.ADMIN) {
            return <Claims/>
          } else {
            <Redirect to='/home'/>
          }
          
          
      }
      }></Route> : null}
      
      <Route exact path='/claim/:id' render={() => {
          if (role === Role.ADMIN) {
            return <DetailClaim />
          }
          else  {
            console.log('entre')
            return <Redirect to='/home'/>
          }          
      }
      }>
      </Route>

      <Route exact path='/claim/id/add' render={() => {
          if (role === Role.ADMIN) {
            return <AddClaim />
          }
          else {
            return < Redirect to="/home" />
          }        
      }
      }></Route>

    <Route exact path='/perfil' render={() => {      
          if(localStorage.getItem('user') && JSON.parse(localStorage.getItem('user')).mail)  {    
            return < Redirect to={`/perfil/${JSON.parse(localStorage.getItem('user')).mail}`} />
          }           
        }
      }
      ></Route>
      <Route path='/perfil/:email' exact render={({ match }) => {
            return <Profile >{match.params.email} </Profile>           
          }           
      } />

      <Route exact path='/registro' render={() => {
          if (role === Role.USER || role === Role.PROFESSOR) {
            return < Redirect to="/home" />
          }
          else {
            return <Register />
          }           
      }
      }></Route>

      <Route exact path='/login'><Login /></Route>
      <Route exact path='/calendar'><CalendarApp /></Route>
      <Route exact path='/chat'><Chat /></Route>
      <Route exact path='/claim/add'><AddClaim /></Route>
      <Route exact path='/home'><Home /></Route>
      <Route exact path='/clases'><ClassContainer /></Route>
    </BrowserRouter>

  );
}

export default App;

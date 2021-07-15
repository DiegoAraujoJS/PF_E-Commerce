import { useState, useEffect } from 'react';
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
import AddClass from './components/addClass/addClass';
import SearchBarHome from './components/searchBar/SearchBarHome';
import getCookieValue from './cookieParser';


enum Role {USER, PROFESSOR, ADMIN}
function App() {
  const history = useHistory()

  let [user, setUser] = useState<{name: string, lastName: string, role: number, mail: string} | undefined>({name: '', lastName: '', role: null, mail: ''})

  useEffect(() => {
    async function setRoleOfUser() { 
      
      if (localStorage.getItem('login')) {
        if (!document.cookie){
          localStorage.removeItem('login')
          console.log('local storage removed')
          return <Redirect to='/home'/>
        }
        const token = getCookieValue('token').replaceAll("\"", '')
        const thisUser = await axios.post(`http://localhost:3001/api/verify`, {},{ withCredentials: true, headers: {Authorization: token}})
        
        if (thisUser.status === 200) {
          console.log('status 200')
          setUser(thisUser.data)
        } else {
          console.log('else')
          setUser(undefined)      
        }
        
      }
      
    }
    setRoleOfUser()
  }, [])


  return (
    <BrowserRouter>
      <Route path='/'><SearchBarHome /></Route>

      {user.role ? <Route exact path='/clases/add' render={() => {
          console.log(user.role)
          if (user.role === Role.ADMIN || user.role === Role.PROFESSOR) {
            return <AddClass/>
          } else {
            <Redirect to='/home'/>
          }
      }
      }></Route> : null}
      
        {user.role !== undefined ? <Route exact path='/claim' render={() => {
          console.log(user.role)
          if (user.role === Role.ADMIN) {
            return <Claims/>
          } else {
            <Redirect to='/home'/>
          }
      }
      }></Route> : null}
      
      <Route exact path='/claim/:id' render={() => {
          if (user.role === Role.ADMIN) {
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
          if (user.role === Role.ADMIN) {
            return <AddClaim />
          }
          else {
            return < Redirect to="/home" />
          }        
      }
      }></Route>

    <Route exact path='/perfil' render={() => {
      console.log(user)      
          if(user.mail)  {    
            return < Redirect to={`/perfil/${user.mail}`} />
          }           
        }
      }
      ></Route>
      <Route path='/perfil/:email' exact render={({ match }) => {
            return <Profile >{match.params.email} </Profile>           
          }           
      } />

      <Route exact path='/registro' render={() => {
          if (user.role === Role.USER || user.role === Role.PROFESSOR) {
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

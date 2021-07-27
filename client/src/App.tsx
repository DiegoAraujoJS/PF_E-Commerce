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
import EditProfile from './components/editPerfilProf/editProfile'
import AddClass from './components/addClass/addClass';
import SearchBarHome from './components/searchBar/SearchBarHome';
import getCookieValue from './cookieParser';
import PagoExitoso from './components/pagoexitoso/PagoExitoso';
import Cesta from './components/cesta/Cesta';
import DetalleClase from './components/detalleclase/DetalleClase';
import CondicionesUso from './components/condicionesuso/CondicionesUso';
import CondicionesServicio from './components/condicionesservicio/CondicionesServicio';
import PoliticaPrivacidad from './components/politicaprivacidad/PoliticaPrivacidad';
import AddStudentClass from './components/addClass/addStudentClass';
import EditPerfilAlum from './components/editPerfilAlum/editPerfilAlum';
import Puntuar from './components/puntuar/Puntuar.jsx';
import AboutCards from './components/aboutCards/AboutCards';

import Historial from './components/historial/Historial';
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
          return <Redirect to='/'/>
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

      {user.role !== undefined ? <Route exact path='/clases/add' render={() => {
          console.log(user.role)
          if (user.role === Role.ADMIN || user.role === Role.PROFESSOR) {
            return <AddClass/>
          } else {
            <Redirect to='/'/>
          }
      }
      }></Route> : null}
      
        {user.role !== undefined ? <Route exact path='/claim' render={() => {
          
          if (user.role === Role.ADMIN) {
            return <Claims/>
          } else {
            <Redirect to='/'/>
          }
      }
      }></Route> : null}   

      <Route exact path='/claim/:id' render={({ match }) => {
          if (user.role === Role.ADMIN) {
            return <DetailClaim id={match.params.id}/>
          }
          else  {
            console.log('entre')
            return <Redirect to='/'/>
          }          
      }
      }>
      </Route>

    <Route exact path='/perfil' render={() => {
      console.log(user)      
          if(user.mail)  {    
            return < Redirect to={`/perfil/${user.mail}`} />
          }           
        }
      }
      ></Route>
      <Route path='/perfil/:email' exact render={({ match }) => {
            return <Profile user={user.lastName}>{match.params.email} </Profile>           
          }           
      } />

      <Route exact path ='/editPerfil'> <EditProfile /></Route>
      <Route exact path='/login'><Login /></Route>
      
      <Route exact path='/calendar' render={() => {    
          if(user.mail)  {    
            return < Redirect to={`/calendar/${user.mail}`} />
          }           
        }
      }
      ></Route>
      <Route path='/calendar/:email' exact render={({ match }) => {
            return <CalendarApp >{match.params.email} </CalendarApp>           
          }           
      } />
        <Route exact path='/editPerfilAlumno'><EditPerfilAlum/></Route>
      <Route exact path='/chat'><Chat mail={""}/></Route>
      <Route exact path='/addclaim'><AddClaim /></Route>
      
      <Route path='/chat/:mail' exact render={({ match }) => {
            return <Chat mail={match.params.mail} />
          }           
      } />
      <Route exact path='/chat'><Chat mail={""}/></Route>
      <Route exact path='/claim/add'><AddClaim /></Route>
      <Route exact path='/'><Home /></Route>
      <Route exact path='/clases'><ClassContainer /></Route>
      <Route path='/about' component={AboutCards}></Route>
      <Route path='/cesta' component={Cesta}></Route>
      <Route path='/historial' component={Historial}></Route>
      <Route path="/pagoexitoso" component={PagoExitoso}></Route>
      <Route path="/detalle/:id" render={({ match }) => <DetalleClase id={match.params.id} />} />
      <Route path="/condicionesdeuso" component={CondicionesUso}></Route>
      <Route path="/condicionesdelservicio" component={CondicionesServicio}></Route>
      <Route path="/politicadeprivacidad" component={PoliticaPrivacidad}></Route>
      <Route exact path="/clases/estudianteAdd"> <AddStudentClass/></Route>
    </BrowserRouter>

  );
}

export default App;

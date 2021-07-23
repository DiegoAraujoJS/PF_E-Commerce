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
import EditProfile from './components/editProfile/editProfile'
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
import Puntuar from "./components/puntuar/Puntuar"
enum Role {USER, PROFESSOR, ADMIN}

const moneda = 'USD';
const cliente = 'edwardburgos@gmail.com';
// const clasesPorComprar = [
//   {
//     id: 8,
//     imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
//     nombre: '4 horas de clase de matemáticas',
//     precioDescuento: 14.30,
//     precioOriginal: 16.99,
//     dia: '16/07/2021', 
//     horaInicio: '9:30 AM', 
//     horaFin: '10:00 PM',
//     profesor: 'braiansilva@gmail.com'
//   },
//   {
//     id: 56,
//     imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
//     nombre: '4 horas de clase de comunicación',
//     precioDescuento: 14.30,
//     precioOriginal: 16.99,
//     dia: '17/07/2021', 
//     horaInicio: '10:30 AM', 
//     horaFin: '2:00 PM',
//     profesor: 'braiansilva@gmail.com'
//   },
//   {
//     id: 63,
//     imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
//     nombre: '4 horas de clase de inglés',
//     precioDescuento: 14.30,
//     precioOriginal: 16.99,
//     dia: '18/07/2021', 
//     horaInicio: '3:30 PM', 
//     horaFin: '9:00 PM',
//     profesor: 'braiansilva@gmail.com'
//   },
//   {
//     id: 71,
//     imagen: 'https://images.unsplash.com/photo-1561657819-51c0511e35ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=751&q=80',
//     nombre: '4 horas de clase de ciencia',
//     precioDescuento: 14.30,
//     precioOriginal: 16.99,
//     dia: '19/07/2021', 
//     horaInicio: '5:30 PM', 
//     horaFin: '6:00 PM',
//     profesor: 'braiansilva@gmail.com'
//   }
// ]

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

      {user.role !== undefined ? <Route exact path='/clases/add' render={() => {
          console.log(user.role)
          if (user.role === Role.ADMIN || user.role === Role.PROFESSOR) {
            return <AddClass/>
          } else {
            <Redirect to='/home'/>
          }
      }
      }></Route> : null}
      
        {user.role !== undefined ? <Route exact path='/claim' render={() => {
          
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

      {/* <Route exact path='/addclaim/' render={() => {
          if (user.role === Role.ADMIN) {
            return <AddClaim />
          }
          else {
            return < Redirect to="/home" />
          }        
      }
      }></Route> */}

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

      {/* <Route exact path='/registro' render={() => {
          if (user.role === Role.USER || user.role === Role.PROFESSOR) {
            return < Redirect to="/home" />
          }
          else {
            return <Register />
          }           
      }
      }></Route> */}
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
      <Route exact path='/puntuar'><Puntuar /></Route>
      <Route exact path='/chat'><Chat /></Route>
      <Route exact path='/addclaim'><AddClaim /></Route>
      <Route exact path='/home'><Home /></Route>
      <Route exact path='/clases'><ClassContainer /></Route>
      {/* <Route path='/cesta' render={({ match }) => {
          <Cesta clasesPorComprar={clasesPorComprar} moneda={moneda} cliente={cliente}/>}}></Route> */}
      <Route path='/cesta' component={Cesta}></Route>
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

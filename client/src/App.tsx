import './App.css';
import { useState, useEffect } from 'react';
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
import firebase from 'firebase/app';
import 'firebase/auth';
import deleteAllCookies from "./cookieClearer";
import { setRoleOfUser } from './functions';
import { auth } from './firebase';
import { verificacionLogueo } from './functions';
import { useDispatch } from 'react-redux';
import { modificarCantidadClasesPorComprar, modificarEstadoLogueado, modificarUsuarioLogueado } from './Actions/Actions';
import Register from './components/Register/Register'
enum Role { USER, PROFESSOR, ADMIN }
const moneda = 'USD';
const cliente = 'edwardburgos@gmail.com';

function App() {

  const [usuarioLogueado, setUsuarioLogueado]: any = useState('')
  const [cantidadClasesPorComprar, setCantidadClasesPorComprar]: any = useState(0)

  //dispatch(modificarUsuario)

  // Cuando se ejecuta la aplicación ejecutamos esto
  useEffect(() => {
    async function inicio() {
      let usuarioActual = await setRoleOfUser();                                                                               // Verificamos usuario logueado
      firebase.auth().onAuthStateChanged(() => {
        async function cambio() { usuarioActual = await setRoleOfUser(); console.log('EL USUARIO LOGUEADO FIREBASE ES', usuarioActual); setUsuarioLogueado(usuarioActual); } cambio();
      });  // Verificamos usuario logueado cuando el auth de Firebase cambie
      console.log('EL USUARIO LOGUEADO ES', usuarioActual)
      setUsuarioLogueado(usuarioActual);

    }
    inicio();
  }, [])

  useEffect(() => {
    async function obtenerClases() {
      if (Array.isArray(usuarioLogueado)) {
        const clases = await axios.get(`http://localhost:3001/api/carrito/all/${usuarioLogueado[1].mail}`)
        setCantidadClasesPorComprar(clases.data.length)
      } else {
        setCantidadClasesPorComprar(0)
      }
    } 
    obtenerClases();
  }, [usuarioLogueado])


  const dispatch = useDispatch();
  dispatch(modificarUsuarioLogueado(usuarioLogueado))
  dispatch(modificarCantidadClasesPorComprar(cantidadClasesPorComprar))








  const history = useHistory();

  let [user, setUser] = useState<{ name: string, lastName: string, role: number, mail: string } | undefined>({ name: '', lastName: '', role: null, mail: '' })












  // dispatch(modificarEstadoLogueado(user));



  return (
    <BrowserRouter>
      <Route path='/'><SearchBarHome /></Route>
      <Route exact path='/'><Home /></Route>


      {user.role !== undefined ? <Route exact path='/clases/add' render={() => {
        console.log(user.role)
        if (user.role === Role.ADMIN || user.role === Role.PROFESSOR) {
          return <AddClass />
        } else {
          <Redirect to='/home' />
        }
      }
      }></Route> : null}

      {user.role !== undefined ? <Route exact path='/claim' render={() => {

        if (user.role === Role.ADMIN) {
          return <Claims />
        } else {
          <Redirect to='/home' />
        }
      }
      }></Route> : null}

      <Route exact path='/claim/:id' render={() => {
        if (user.role === Role.ADMIN) {
          return <DetailClaim />
        }
        else {
          console.log('entre')
          return <Redirect to='/home' />
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
        if (user.mail) {
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
      <Route exact path='/editPerfil'> <EditProfile /></Route>

      {/* //verificacionLogueo */}
      <Route exact path='/login'><Login /></Route>


      <Route exact path='/calendar' render={() => {
        if (user.mail) {
          return < Redirect to={`/calendar/${user.mail}`} />
        }
      }
      }
      ></Route>
      <Route path='/calendar/:email' exact render={({ match }) => {
        return <CalendarApp >{match.params.email} </CalendarApp>
      }
      } />

      <Route exact path='/chat'><Chat /></Route>
      <Route exact path='/claim/add'><AddClaim /></Route>
      <Route exact path='/home'><Home /></Route>
      {/* <Route exact path='/registro'><Register handle={true}/></Route> */}
      <Route exact path='/clases'><ClassContainer /></Route>
      {/* <Route path='/cesta' render={({ match }) => {
          <Cesta clasesPorComprar={clasesPorComprar} moneda={moneda} cliente={cliente}/>}}></Route> */}
      <Route path='/cesta' component={Cesta}></Route>
      <Route path="/pagoexitoso" component={PagoExitoso}></Route>
      <Route path="/detalle/:id" render={({ match }) => <DetalleClase id={match.params.id} />} />
      <Route path="/condicionesdeuso" component={CondicionesUso}></Route>
      <Route path="/condicionesdelservicio" component={CondicionesServicio}></Route>
      <Route path="/politicadeprivacidad" component={PoliticaPrivacidad}></Route>
    </BrowserRouter>

  );
}

export default App;

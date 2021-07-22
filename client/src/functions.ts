import axios from "axios";
import getCookieValue from "./cookieParser";
import { auth } from "./firebase";
import { modificarEstadoLogueado } from './Actions/Actions';
import firebase from 'firebase/app';
import 'firebase/auth';
import { useDispatch } from 'react-redux';


export function verificacionLogueo() {

  if (localStorage.getItem('login') === 'true' || auth.currentUser) {
    if (auth.currentUser) console.log('', auth.currentUser);
    if (localStorage.getItem('login') === 'true') console.log('', auth.currentUser)
    console.log('', true)
    return true;
  } else {
    console.log('', auth.currentUser);
    console.log('', false)
    return false;
  }
}

export async function setRoleOfUser() {
  if (localStorage.getItem('login') || firebase.auth().currentUser) {
    if (localStorage.getItem('login')) {
      if (!document.cookie) {
        localStorage.removeItem('login')
        return console.log('No hay ningún usuario logueado')
      }
      const token = getCookieValue('token').replaceAll("\"", '')
      try {
        const thisUser = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })
        if (thisUser) {
          return ['db', thisUser.data]
        } else {
          return console.log('No hay ningún usuario logueado')
        }
      } catch {
        return console.log('No hay ningún usuario logueado')
      }
      
    } else {
      try {
        const usuarioActual = await axios.post(`http://localhost:3001/api/defineAccessGoogle`, firebase.auth().currentUser)
        if (usuarioActual) {
          return ['google', usuarioActual.data]
        } else {
          return console.log('No hay ningún usuario logueado')
        }
      } catch {
        return console.log('No hay ningún usuario logueado')
      } 
    }
  } else {
    return console.log('No hay ningún usuario logueado')
  }
}



// const dispatch = useDispatch();
  // dispatch(modificarEstadoLogueado(user));

  // firebase.auth().onAuthStateChanged((user) => dispatch('CASI CASI', { user }));


  // export async function setRoleOfUser() {
  //   if (localStorage.getItem('login') || firebase.auth().currentUser) {
  //     if (!document.cookie) {
  //       localStorage.removeItem('login')
  //       console.log('local storage removed')
  //       // return <Redirect to='/home'/>
  //     }
  //     const token = getCookieValue('token').replaceAll("\"", '')
  //     const thisUser = await axios.post(`http://localhost:3001/api/verify`, {}, { withCredentials: true, headers: { Authorization: token } })

  //     if (thisUser.status === 200) {
  //       console.log('status 200')
  //       // setUser(thisUser.data)
  //       modificarEstadoLogueado(true)
  //       console.log(`LOGUEADO`)
  //     } else {
  //       console.log('xxx')
  //     }


  //    }

  // }
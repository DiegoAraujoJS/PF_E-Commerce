import React, { useState } from 'react';
import logo from '../../logo.svg';
import style from './login.module.css';
import { loginWithGoogle, signIn, createUser } from '../../firebase';
import {Link} from 'react-router-dom'
import {auth} from '../../firebase'
import axios from 'axios';
import { useHistory } from "react-router-dom";


const clientId = '335971411859-5nphqdu952putvhvsd8db519ltc2klco.apps.googleusercontent.com'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: null, password: null})
    const [wrongPassword, setWrongPassword] = React.useState(false)
    const [logoutSuccess, setLogoutSuccess] = React.useState('')
    console.log(auth.currentUser)

    const history = useHistory()

    

    function handleChange(e) {
        validateErrors()
        switch(e.target.name) {
            case 'emailValue':
                setEmail(e.target.value)
                break;
            case 'passValue':
                setPassword(e.target.value)
                break;
            default:
                break;
        }
        
    }

    function validateErrors() {
            if(!email) {
                //email, a pesar de estar vacío y entrar a esta validación, no cambia el estado
                setErrors({...errors, email: 'Se necesita un E-mail'})
                console.log('entro aca') 
            } else if(!/\S+@{1}[a-zA-Z]+\.{1}[a-z]{3}\.?[a-z]*/gm.test(email)) {
                setErrors({...errors, email: 'E-mail inválido'}) 
            } else {
                setErrors({...errors, email: null})
                console.log('tambien acá')
            }
            if(!/[\S]/.test(password)) {
                setErrors({...errors, password: 'No puede contener espacio blanco'})
            } else if (password.length < 4 || password.length > 20) {
                setErrors({...errors, password: 'La contraseña debe tener de 4 a 20 caracteres'})
            } else {
                setErrors({...errors, password: null})
            }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        // validateErrors();
        // console.log(errors)
        // if(errors.email || errors.password) {
        //     alert('Fail')
        // } else {
        //     alert('Login successful');
        // }


        // console.log('auth', auth.currentUser)
        // const response = await signIn(email, password);
        try {
            const login = await axios.post('http://localhost:3001/api/session/login', {
                username: email,
                password: password
            })
            localStorage.setItem('user', JSON.stringify({...login.data}))
            history.push('/home')
            
        } catch (error) {
            setWrongPassword(true)
        }
    }

    function signOut(e) {

        if (localStorage.getItem('user')) {
            localStorage.removeItem('user')
            setLogoutSuccess('true')
            alert("Se cerro sesión correctamente")
        } else {
            setLogoutSuccess('false')
            alert("Fallo al cerrar sesión")
        }           
    }
    
    

    // const onSuccess = (res) => {
    //     console.log('[login Success] currentUser: ', res.profileObj);
    // }

    // const onFailure = (res) => {
    //     console.log('[Login failed] res:', res);
    // }

    // const onLogoutSuccess = () => {
    //     alert('Logout made successfully');
    // }
    // const onLogoutFailure = () => {
    //     alert('Fail');
    // }

    return (
        <div className="container">
                 
       
            <div>
                <img src={logo} alt='logo'></img>
            </div>
            <div>
                <h1>INICIAR SESIÓN</h1>
                <button className="sign-in" onClick={loginWithGoogle}>
                    Sign in with Google
                </button>
                <button className="sign-in" onClick={signOut}>
                    Logout
                </button>
                <form onSubmit={handleSubmit}>
                    <div>
                       
                    </div>
                    <input type='text' value={email} name='emailValue' onChange={handleChange} placeholder='Email'/>
                    <input type='password' value={password} name='passValue' onChange={handleChange} placeholder='Contraseña'/>
                    <input type="submit" value="login" />
                </form>
                <Link to='/registro'>
                    <button>Regístrate</button>
                </Link>
                
            </div>
            {wrongPassword ? <span style={{color:'red'}}>El usuario o la contraseña son incorrectos</span> : ''}
            {logoutSuccess === 'true' ? <span style={{color:'red'}}>Fin de sesión exitosa</span> : ''}
            {logoutSuccess === 'false' ? <span style={{color:'red'}}>Debes haber iniciado sesion para deslogearte</span> : ''}
        </div>
    )
}

export default Login;


{/* <main className="form-signin">
<form>
  <img className="mb-4" src="../assets/brand/bootstrap-logo.svg" alt="" width="72" height="57"/>
  <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

  <div className="form-floating">
    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
    <label htmlFor="floatingInput">Email address</label>
  </div>
  <div className="form-floating">
    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
    <label htmlFor="floatingPassword">Password</label>
  </div>

  <div className="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"></input>
    </label>
  </div>
  <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
  <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
</form>
</main> */}








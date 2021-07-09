import React, { useState } from 'react';
import logo from '../../logo.svg';
import style from './login.module.css';
import { loginWithGoogle, signIn, signOut, createUser } from '../../firebase';
import {Link} from 'react-router-dom'
import {auth} from '../../firebase'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: null, password: null})

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
        console.log('auth', auth.currentUser)
        const response = await signIn(email, password);
        
        
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
                 <main className="form-signin">
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
</main>
       
        </div>
    )
}

export default Login;











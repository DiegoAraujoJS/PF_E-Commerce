import React, { useRef, useState , useImperativeHandle} from 'react';
import logo from '../../logo.svg';
import style from './login.module.css';
import CSS from 'csstype';
import { loginWithGoogle /*  signIn, createUser */, auth } from '../../firebase';
import {Link} from 'react-router-dom'

import axios from 'axios';
import { useHistory } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({email: null, password: null})
    const [wrongPassword, setWrongPassword] = React.useState(false)
    const [logoutSuccess, setLogoutSuccess] = React.useState('')
    // console.log(auth.currentUser)

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
            } else if(!/\S+@{1}[a-zA-Z]+\.{1}[a-z]{3}\.?[a-z]*/gm.test(email)) {
                setErrors({...errors, email: 'E-mail inválido'}) 
            } else {
                setErrors({...errors, email: null})
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
        try {
            const login = await axios.post(`http://localhost:3001/api/tokens/login`, {
                mail: email,
                password: password
            })
            await auth()
            localStorage.setItem('user', JSON.stringify({mail: email}))
            
            history.push('/home')
            window.location.reload();
            
        } catch (error) {
            setWrongPassword(true)
        }
    }
    async function signOut(e) {
        // auth.signOut();
        try {
            localStorage.removeItem('user')
            setLogoutSuccess('true')
            alert("Se cerro sesión correctamente")
            window.location.reload();
        } catch (err) {
            setLogoutSuccess('false')
            alert("Fallo al cerrar sesión. No has iniciado sesión?")
        }   
    }
    async function auth () {
        try {
            const auth = await axios.get(`http://localhost:3001/api/tokens/auth`)
        } catch (err) {
            console.log(err)
        }
    }

    const inputRef = useRef()
    const eyeRef = useRef()

    function myFunction() {
        let showPassword: any = inputRef.current
        let eye: any = eyeRef.current

        if (showPassword && showPassword.type === "password") {
            showPassword.type = "text";
            eye.className = "fa fa-eye";
          } else {
            showPassword.type = "password";
            eye.className = "fa fa-eye-slash";
        }
    }

    const test: CSS.Properties = {
        position: 'relative',
        border: '2px solid red',
    }
    const inputMargin: CSS.Properties = {
        margin: '0px'
    }
    const eyeTest: CSS.Properties = {
        position: 'absolute'
    }

    return (
        <div className={"text-center " + style.height}>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>

            <div className={style.formSignin}>
                <form onSubmit={handleSubmit}>
                    <img className="mb-4" src={logo} alt='logo' width="72" height="57"></img>
            
                    <h1 className="h3 mb-3 fw-normal">INICIAR SESIÓN</h1>
                    <div className="form-floating">
                        <input type='email' value={email} name='emailValue' onChange={handleChange} placeholder='Email' className="form-control"/>
                        <label htmlFor="floatingInput">Email</label>
                    </div>
                    <div style={test} className="form-floating">
                        <input style={inputMargin} ref={inputRef} type='password' value={password} name='passValue' onChange={handleChange} placeholder='Contraseña' className="form-control"/>
                        <label htmlFor="floatingPassword">Password</label>
                        <i style={eyeTest} ref={eyeRef} className="fa fa-eye-slash" onClick={() => myFunction()}></i>
                    </div>
                    
                    <input type="submit" value="Login" className="w-100 btn btn-lg btn-primary mb-2" />
                
                    <Link to='/registro'>
                        <button className="w-100 btn btn-lg btn-secondary mb-2">Regístrate</button>
                    </Link>
                    <button className="w-100 btn btn-lg btn-light mb-2" onClick={loginWithGoogle}>
                        Sign in with Google
                    </button>
                    <button className="w-100 btn btn-lg btn-danger mb-2" onClick={signOut}>
                        Logout
                    </button>
                    <div className="">
                        {wrongPassword ? <span className={"badge bg-danger"}>
                            El usuario o la contraseña son incorrectos</span> : ''}

                        {logoutSuccess === 'true' ? <span className={"badge bg-danger"}>
                            Fin de sesión exitosa</span> : ''}

                        {logoutSuccess === 'false' ? <span className={"badge bg-danger"}>
                            Debes haber iniciado sesion para deslogearte</span> : ''}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;

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

      // validateErrors();
        // console.log(errors)
        // if(errors.email || errors.password) {
        //     alert('Fail')
        // } else {
        //     alert('Login successful');
        // }


        // console.log('auth', auth.currentUser)
        // const response = await signIn(email, password);




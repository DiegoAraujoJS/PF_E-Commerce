import React, { useState } from 'react';
import logo from '../../logo.svg';
import style from './login.module.css';


const clientId = '335971411859-5nphqdu952putvhvsd8db519ltc2klco.apps.googleusercontent.com'

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

    function handleSubmit(e) {
        e.preventDefault()
        validateErrors();
        console.log(errors)
        if(errors.email || errors.password) {
            alert('Fail')
        } else {
            alert('Login successful');
        }
    }

    const onSuccess = (res) => {
        console.log('[login Success] currentUser: ', res.profileObj);
    }

    const onFailure = (res) => {
        console.log('[Login failed] res:', res);
    }

    const onLogoutSuccess = () => {
        alert('Logout made successfully');
    }
    const onLogoutFailure = () => {
        alert('Fail');
    }

    return (
        <div className="container">
            <div>
                <img src={logo} alt='logo'></img>
            </div>
            <div>
                <h1>INICIAR SESIÓN</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                       
                    </div>
                    <input type='text' value={email} name='emailValue' onChange={handleChange} placeholder='Email'/>
                    <input type='password' value={password} name='passValue' onChange={handleChange} placeholder='Contraseña'/>
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    )
}

export default Login;
import React from 'react';
import logo from '../../logo.svg';
import style from './login.module.css';

function Login() {

    function handleSubmit(e) {
        e.preventDefault()
        console.log(e)
    }

    return (
        <div className="container">
            <div>
                <img src={logo} alt='logo'></img>
            </div>
            <div>
                <h1>INICIAR SESIÓN</h1>
                <form onSubmit={handleSubmit}>
                    <input type="submit" value="Enviar" />
                </form>
            </div>
        </div>
    )
}

export default Login;

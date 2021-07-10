import { createUser, loginWithGoogle } from '../../firebase';
import React from 'react'
import axios from 'axios';


export default function Register() {

    const [mail, setMail] = React.useState('')
    const [password, setPass] = React.useState('')
    const [name, setName] = React.useState('')
    const [surname, setSurname] = React.useState('')
    const [city, setCity] = React.useState('')
    const [state, setState] = React.useState('')
    const [alreadyCreated, setAlreadyCreated] = React.useState(false)

    async function handleSubmit (e) {
      e.preventDefault()
      const registro = await axios.post('http://localhost:3001/api/session/register', {
        username: mail,
        password: password
      })
      console.log(registro)
    }

    async function googleSubmit() {

    }

    return (
        <div className="container">
        <form onSubmit={(e) => handleSubmit(e)}>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputEmail4">Email</label>
      <input value={mail} onChange={(e) => setMail(e.target.value)} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
    </div>
    <div className="form-group col-md-6">
      <label htmlFor="inputPassword4">Password</label>
      <input value={password} onChange={(e) => setPass(e.target.value)} type="password" className="form-control" id="inputPassword4" placeholder="Password"/>
      {password.length<6 ? <span style={{color:'red'}}>La contraseña debe tener mas de seis caracteres</span> : ''}
    </div>
  </div>
  <div className="form-group">
    <label htmlFor="inputAddress">Nombre</label>
    <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
  </div>
  <div className="form-group">
    <label htmlFor="inputAddress2">Apellido</label>
    <input value={surname} onChange={(e) => setSurname(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
  </div>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label htmlFor="inputCity">Ciudad</label>
      <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="form-control" id="inputCity"/>
    </div>
    <div className="form-group col-md-4">
      <label htmlFor="inputState">Estado</label>
      <select value={state} onChange={(e) => setState(e.target.value)} id="inputState" className="form-control">
        <option selected>Choose...</option>
        <option>...</option>
      </select>
    </div>
    
  </div>
  <div className="form-group">
    <div className="form-check">
      <input className="form-check-input" type="checkbox" id="gridCheck"/>
      <label className="form-check-label" htmlFor="gridCheck">
        Check me out
      </label>
    </div>
  </div>
  <button type="submit" id="local" className="btn btn-primary">Regístrate</button>
  
</form>
<button onClick={googleSubmit} id="google" className="btn btn-primary">Regístrate con Google</button>
{alreadyCreated ? <span style={{color:'red'}}>El usuario ya está siendo usado</span> : ''}
</div>
    )
}

// import { createUser, loginWithGoogle } from '../../firebase';
import React from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import {UserProps} from '../../../../interfaces'

enum ErrorType {INCOMPLETE_INPUTS, ALREADY_EXISTS}
enum Role {USER, PROFESSOR, ADMIN}
export default function Register() {

  const [mail, setMail] = React.useState('')
  const [password, setPass] = React.useState('')
  const [name, setName] = React.useState('')
  const [lastName, setlastName] = React.useState('')
  const [city, setCity] = React.useState('')
  const [state, setState] = React.useState('')
  const [role, setRole] = React.useState(0)
  const [alreadyCreated, /* setAlreadyCreated */] = React.useState(false)

  const history = useHistory()


  
  async function handleSubmit(e) {
    e.preventDefault()
    let user: UserProps = {
      lastName: lastName,
      mail: mail,
      name: name,
      role: role
    }
    let userWithPassword = {
      ...user,
      password: password
    }
    if (mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    try {
      const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword)
      console.log(registro)
      if (registro) alert("Se registro correctamente")
      history.push('/login')
    }
    catch (error) {
      
      if (error.response.data.type === ErrorType.ALREADY_EXISTS) {
        alert('El usuario ya existe!')
      } else if (error.response.data.type === ErrorType.INCOMPLETE_INPUTS){
        alert('Debe ingresar mail, nombre y apellido')
      }
    }
  }
  async function googleSubmit() {

  }

  return (
    <div className="container">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4">Email</label>
            <input value={mail} onChange={(e) => setMail(e.target.value)} type="email" className="form-control" id="inputEmail4" placeholder="Email" />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4">Password</label>
            <input value={password} onChange={(e) => setPass(e.target.value)} type="password" className="form-control" id="inputPassword4" placeholder="Password" />
            {password.length < 6 ? <span style={{ color: 'red' }}>La contraseña debe tener mas de seis caracteres</span> : ''}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress">Nombre</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2">Apellido</label>
          <input value={lastName} onChange={(e) => setlastName(e.target.value)} type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity">Ciudad</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} type="text" className="form-control" id="inputCity" />
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
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Check me out
            </label>
          </div>
        </div>
        <button type="submit" id="local" className="btn btn-primary">Regístrate</button>

      </form>
      <input className="form-check-input" type="checkbox" id="gridCheck" onChange={() => setRole(Role.PROFESSOR)}/>
      <button onClick={googleSubmit} id="google" className="btn btn-primary">Regístrate con Google</button>
      {alreadyCreated ? <span style={{ color: 'red' }}>El usuario ya está siendo usado</span> : ''}
    </div>
  )
}

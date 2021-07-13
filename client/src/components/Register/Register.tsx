// import { createUser, loginWithGoogle } from '../../firebase';
import React from 'react'
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { UserProps } from '../../../../interfaces'
import { Formik } from 'formik';
import { validationSchemaRegister } from '../../utils/validations';
import imageParser from '../../utils/imageParser';

enum ErrorType { INCOMPLETE_INPUTS, ALREADY_EXISTS }
enum Role { USER, PROFESSOR, ADMIN }

const Register = () => {

  // const [mail, setMail] = React.useState('')
  // const [password, setPass] = React.useState('')
  // const [name, setName] = React.useState('')
  // const [lastName, setlastName] = React.useState('')
  // const [city, setCity] = React.useState('')
  // const [state, setState] = React.useState('')
  // const [role, setRole] = React.useState(0)
  const [alreadyCreated, /* setAlreadyCreated */] = React.useState(false)

  const history = useHistory()

  async function handleSubmitRegister(values) {

    let user: UserProps = {
      lastName: values.lastName,
      mail: values.mail,
      name: values.name,
      role: values.role
    }
    let userWithPassword = {
      ...user,
      password: values.password
    }
    if (values.mail === 'braiansilva@gmail.com') user.role = Role.ADMIN;
    try {
      const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword, { withCredentials: true })
      
      if (registro) alert("Se registro correctamente")
      
      history.push('/login')
    }
    catch (error) {
      if (error.response.data.type === ErrorType.ALREADY_EXISTS) {
        alert('El usuario ya existe!')
      } else if (error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
        alert('Debe ingresar mail, nombre y apellido')
      }
    }
  }
  async function googleSubmit() {

  }

  return (
    <div className="container">

      <h3 className="mt-4 mb-4">Llena el formulario para registrate!</h3>

      <Formik
        validationSchema={validationSchemaRegister}
        initialValues={{
          name: "",
          lastName: "",
          mail: "",
          password: "",
          role: 0,
          city: "",
          state: "",
        }}
        onSubmit={ (values) => {

          handleSubmitRegister(values)

        }}
      >
        {({ handleSubmit, handleChange, values, errors , touched, handleBlur}) => (
          <form onSubmit={handleSubmit} className="mt-6 mb-4">
            <div className="form-row " >
              <div className="form-group col-md-6  mt-6" >
                <label htmlFor="inputEmail">Email</label>
                <input
                  name="mail"
                  value={values.mail}
                  // onChange={(e) => setMail(e.target.value)}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text" id="inputEmail" 
                  className={`form-control ${errors.mail && touched.mail ? 'is-invalid' : ''}`}
                />
                {errors.mail && touched.mail && <div className='invalid-feedback'>{errors.mail}</div>}
           
              </div>
              <div className="form-group col-md-6 mt-2">
                <label htmlFor="inputPassword4">Password</label>
                <input
                  name="password"
                  value={values.password}
                  // onChange={(e) => setPass(e.target.value)} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password"
                  id="inputPassword4"
                  className={`form-control ${errors.password && touched.password ? 'is-invalid' : ''}`} 
                  />
                {errors.password && touched.password  && <div className='invalid-feedback'>{errors.password}</div>}
              </div>
            </div>
            <div className="form-group col-md-6 mt-2">
              <label htmlFor="inputAddress">Nombre</label>
              <input
                name="name"
                value={values.name}
                // onChange={(e) => setName(e.target.value)} 
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                className={`form-control ${errors.name && touched.name ? 'is-invalid' : ''}`} 
                id="inputAddress" 
              />
              {errors.name && touched.name && <div className='invalid-feedback'>{errors.name}</div>}
            </div>
            <div className="form-group col-md-6 mt-2">
              <label htmlFor="inputAddress2">Apellido</label>
              <input
                name="lastName"
                value={values.lastName}
                // onChange={(e) => setlastName(e.target.value)} 
                onChange={handleChange}
                onBlur={handleBlur}
                type="text"
                className={`form-control ${errors.lastName && touched.lastName ? 'is-invalid' : ''}`} 
                id="inputAddress2"  
                />
              {errors.lastName && touched.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
            </div>
            <div className="form-row mt-2">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">Ciudad</label>
                <input
                  name="city"
                  value={values.city}
                  // onChange={(e) => setCity(e.target.value)} 
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  className={`form-control ${errors.city && touched.city ? 'is-invalid' : ''}`} 
                  id="inputCity" 
                  />
                {errors.city && touched.city && <div className='invalid-feedback'>{errors.city}</div>}
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputState">Estado</label>
                <select
                  name="state"
                  // value={values.state}
                  // onChange={(e) => setState(e.target.value)} 
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  id="inputState" 
                  className={`form-control`}           
                  >                  
                  <option defaultValue="">Choose...</option>
                  <option>...</option>
                </select>
              </div>

            </div>

            <div className="form-row mt-2" >
              <label className="form-check-label" htmlFor="gridCheck">Rol</label><br></br>
              <div className="form-group col">
                <label className="form-check-label mr-2" htmlFor="gridCheck">User</label><br></br>
                <input
                  name="role"           
                  type="radio" id="gridCheck"
                  // onChange={() => setRole(Role.PROFESSOR)} 
                  onChange={handleChange}
                  value={Role.USER}
                  defaultChecked
                />
              </div>
              <div className="form-group col">
                <label className="form-check-label mr-3" htmlFor="gridCheck">Profesor</label><br></br>
                <input type="radio"
                  name="role"
                  value={Role.PROFESSOR}            
                  onChange={handleChange}
                ></input>
              </div>          
            </div>

            <button type="submit" id="local" className="btn btn-primary">Regístrate</button>

            <button onClick={googleSubmit} id="google" className="btn btn-primary " >Regístrate con Google</button>
            {alreadyCreated ? <span style={{ color: 'red' }}>El usuario ya está siendo usado</span> : ''}
          </form >
        )}
      </Formik>
      
      
    </div>
  )
}



export default Register
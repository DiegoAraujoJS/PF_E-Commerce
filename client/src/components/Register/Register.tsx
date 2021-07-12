// import { createUser, loginWithGoogle } from '../../firebase';
import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { UserProps } from "../../../../interfaces";
import style from "./Register.module.css";

enum ErrorType {
  INCOMPLETE_INPUTS,
  ALREADY_EXISTS,
}
enum Role {
  USER,
  PROFESSOR,
  ADMIN,
}
export default function Register() {
  const [mail, setMail] = React.useState("");
  const [password, setPass] = React.useState("");
  const [name, setName] = React.useState("");
  const [lastName, setlastName] = React.useState("");
  const [city, setCity] = React.useState("");
  const [state, setState] = React.useState("");
  const [role, setRole] = React.useState(0);
  const [alreadyCreated /* setAlreadyCreated */] = React.useState(false);

  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    let user: UserProps = {
      lastName: lastName,
      mail: mail,
      name: name,
      role: role,
    };
    let userWithPassword = {
      ...user,
      password: password,
    };
    if (mail === "braiansilva@gmail.com") user.role = Role.ADMIN;
    try {
      const registro = await axios.post(
        "http://localhost:3001/api/session/register",
        userWithPassword
      );
      console.log(registro);
      if (registro) alert("Se registro correctamente");
      history.push("/login");
    } catch (error) {
      if (error.response.data.type === ErrorType.ALREADY_EXISTS) {
        alert("El usuario ya existe!");
      } else if (error.response.data.type === ErrorType.INCOMPLETE_INPUTS) {
        alert("Debe ingresar mail, nombre y apellido");
      }
    }
  }
  async function googleSubmit() {}

  return (
    <div className={"text-center " + style.height}>
      <div className={style.formRegister}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h1 className="h3 mb-3 fw-normal">REGISTRATE</h1>
          <div className="form-floating">
            <input
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              type="email"
              className={"form-control"}
              id="inputEmail4"
              placeholder="Email"
            />
            <label htmlFor="inputEmail4">Email</label>
          </div>
          <div className="form-floating">
            <input
              value={password}
              onChange={(e) => setPass(e.target.value)}
              type="password"
              className="form-control"
              id="inputPassword4"
              placeholder="Password"
            />
            <label htmlFor="inputPassword4">Password</label>
          </div>
          <div className="form-floating">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="inputAddress"
              placeholder="1234 Main St"
            />
            <label htmlFor="inputAddress">Nombre</label>
          </div>
          <div className="form-floating">
            <input
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              type="text"
              className="form-control"
              id="inputAddress2"
              placeholder="Apartment, studio, or floor"
            />
            <label htmlFor="inputAddress2">Apellido</label>
          </div>
          <div className="form-floating">
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              className="form-control"
              id="inputCity"
            />
            <label htmlFor="inputCity">Ciudad</label>
          </div>
          <div className="form-floating">
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              id="inputState"
              className="form-select"
            >
              <option>...</option>
              <option>...</option>
            </select>
            <label htmlFor="inputState">Estado</label>
          </div>
          <div className="form-group my-2">
            <div className="form-check form-switch">
              <input
                className="form-check-input"
                type="checkbox"
                id="switchCheck"
                onChange={() => (!role ? setRole(Role.PROFESSOR) : setRole(0))}
              />
              <label className="form-check-label" htmlFor="switchCheck">
                Quiero ser Profesor
              </label>
            </div>
          </div>
          <button
            type="submit"
            id="local"
            className="w-100 btn btn-lg btn-primary mb-2"
          >
            Regístrate
          </button>
          <button
            onClick={googleSubmit}
            id="google"
            className="w-100 btn btn-lg btn-light mb-2"
          >
            Regístrate con Google
          </button>
          {alreadyCreated ? (
            <span className={"badge bg-danger"}>
              El usuario ya está siendo usado
            </span>
          ) : (
            ""
          )}
          {password.length < 6 ? (
              <span className={"badge bg-danger"}>
                La contraseña debe tener mas de seis caracteres
              </span>
            ) : (
              ""
            )}
        </form>
      </div>
    </div>
  );
}

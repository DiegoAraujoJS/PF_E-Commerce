import styles from "./editProfile.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import getCookieValue from "../../cookieParser";
import { useHistory } from "react-router-dom";
import { storage } from "../../firebase";
import bootstrap from "bootstrap";
import { Button, Modal, Row, Col, Form } from "react-bootstrap";
import Swal from "sweetalert2";

const EditProfile = () => {
  const history = useHistory();
  const [img, setImg] = useState<any>("");
  const [img2, setImg2] = useState<any>("");
  const [data, setData] = useState<any>({});
  const [countries, setCountries] = React.useState([]);
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [countryS, setCountryS] = useState<any>({});
  const [stateS, setStateS] = useState<any>({});
  const [cityS, setCitieS] = useState<any>({});

  const Changes = async (e) => {
    try {
      const token = getCookieValue("token").replaceAll('"', "");
      const thisUser = await axios.post(
        `http://localhost:3001/api/verify`,
        {},
        { withCredentials: true, headers: { Authorization: token } }
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      if (img2) {
        let editar = await axios.patch(
          "http://localhost:3001/api/profesores/",
          {
            foto: img2,
            usuario: thisUser.data.mail,
            description: data.description,
            country: countryS,
            title: data.title,
            state: stateS,
            city: cityS,
          }
        );
        Swal.fire("Exito!", "Cambios Realizados!", "success");
      } else {
        let editar = await axios.patch(
          "http://localhost:3001/api/profesores/",
          {
            foto: img,
            usuario: thisUser.data.mail,
            description: data.description,
            country: countryS,
            title: data.title,
            state: stateS,
            city: cityS,
          }
        );
        Swal.fire("Exito!", "Cambios Realizados!", "success");
      }
    } catch (err) {
      console.log(err);
      Swal.fire(
        "Error!",
        "Algo salio mal, ¿Añadiste un pais, estado y ciudad?",
        "error"
      );
    }

    history.push(`/perfil/`);
  };

  const inputsHandler = (e) => {
    e.preventDefault();
    const newdata = { ...data };
    newdata[e.target.id] = e.target.value;
    setData(newdata);
    console.log(newdata);
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const Upload = async ({ file }) => {
    // Referencia al espacio en el bucket donde estará el archivo
    let storageRef = storage.ref().child("images/" + file.name);
    // Subir el archivo
    await storageRef.put(file);
    // Retornar la referencia
    return storageRef;
  };

  const imageFirebaseHandler = async (e) => {
    const file = e.target.files[0];
    const storageRef = await Upload({ file });
    const url = await storageRef.getDownloadURL();
    setImg2(url);
  };
  const fetchProfs = async () => {
    try {
      const token = getCookieValue("token").replaceAll('"', "");
      const thisUser = await axios.post(
        `http://localhost:3001/api/verify`,
        {},
        { withCredentials: true, headers: { Authorization: token } }
      );
      const response = await axios.get(
        `http://localhost:3001/api/profesores/${thisUser.data.mail}`
      );
      if (response.status === 200) {
        setData({
          ...response.data,
        });
      }
      setImg(data.foto);
      // console.log("todo lo que hayt que agregar",prech)
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setImg2(data.foto);
    setImg(data.foto);
  }, [data]);
  useEffect(() => {
    fetchProfs();
    const getCountries = async () => {
      const response_1 = await axios.get(
        "http://localhost:3001/api/allCountries/countries"
      );

      if (response_1.status === 200) {
        setCountries(response_1.data.data);
      }
    };
    if (!countries.length) getCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function handleCountryChange(e) {
    setCountryS(e.target.value);
    const response_2 = await axios.post(
      "http://localhost:3001/api/allCountries/states",
      { country: e.target.value }
    );
    if (response_2.status === 200) {
      setStates(response_2.data);
    }
  }
  async function handleStateChange(e) {
    setStateS(e.target.value);
    const response_3 = await axios.post(
      "http://localhost:3001/api/allCountries/cities",
      { country: countryS, state: e.target.value }
    );
    console.log(response_3.data);
    setCities(response_3.data);
  }

  const handleCitieChange = (e) => {
    setCitieS(e.target.value);
  };

  return (
    <div className={styles.body}>
      <div className={styles.Container}>
        <div className="col-md-5 border-right">
          <div className="p-3 py-5">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="text-right">Ajustes del Perfil</h4>
            </div>
            <div className="col-md-3 border-right">
              <span className={styles.span_imagen}>
                Selecciona una imagen para tu perfil
              </span>
              <input
                type="file"
                onChange={(e) => imageFirebaseHandler(e)}
                id="foto"
                className="form-control"
              />
              <div className="d-flex flex-column align-items-center text-center  p-3 py-5">
                <img
                  className={styles.imgEdit}
                  src={img2 ? img2 : img}
                  alt="profile"
                />
                <span className="font-weight-bold">Vista Previa</span>
                <span className="text-black-50"></span>
                <span> </span>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12">
                <label className="labels">
                  Pon una descripción para los alumnos!
                </label>
                <textarea
                  className="form-control"
                  onChange={(e) => inputsHandler(e)}
                  id="description"
                  value={data.description ? data.description : ""}
                />
              </div>
              {/*  <div className="col-md-12"><label className="labels">Contacto Telefonico</label><input type="text" className="form-control" placeholder="numero de celular" /></div>
                            <div className="col-md-12"><label className="labels">Dirección</label><input type="text" className="form-control" placeholder="escribir direccion" /></div> */}
              <div className="col-md-12">
                <label className="labels">
                  Si tenes una educacion o especialidad ponela acá:
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="educacion"
                  onChange={(e) => inputsHandler(e)}
                  id="title"
                  value={data.title ? data.title : ""}
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-6">
                <label className="labels">País</label>
                <select
                  name="country"
                  onChange={(e) => {
                    handleCountryChange(e);
                  }}
                  className="form-control"
                >
                  {countries.length &&
                    countries.map((c, i) => {
                      return (
                        <option key={i} value={c.name}>
                          {c.name} {c.unicodeFlag}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-6">
                {Object.keys(countryS).length ? (
                  <Col>
                    <label>Estado/Provincia</label>
                    <select
                      name="state"
                      onChange={(e) => {
                        handleStateChange(e);
                      }}
                      disabled={!countries.length}
                      className="form-control"
                    >
                      {states.length &&
                        states.map((c, i) => (
                          <option key={i} value={c.name}>
                            {c.name}
                          </option>
                        ))}
                    </select>
                  </Col>
                ) : null}
              </div>
              <br />
              <div className="col-md-6">
                {cities.length > 1 ? (
                  <Col>
                    <label>Ciudad</label>
                    <select
                      onChange={(e) => handleCitieChange(e)}
                      name="city"
                      disabled={!states.length}
                      className="form-control"
                    >
                      {cities.length &&
                        cities.map((c, i) => (
                          <option key={i} value={c}>
                            {c}
                          </option>
                        ))}
                    </select>
                  </Col>
                ) : null}
              </div>
            </div>
            <div className="mt-5 text-center">
              <button
                className="btn btn-primary profile-button"
                type="button"
                onClick={(e) => Changes(e)}
              >
                Guardar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

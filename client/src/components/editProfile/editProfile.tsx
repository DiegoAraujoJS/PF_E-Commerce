
import styles from './editProfile.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getCookieValue from '../../cookieParser';
const EditProfile = () => {
    const [img, setImg] = useState<any>('')
    const [data, setData] = useState<any>({
        foto: "",
        usuario:"",
        ciudad:"",
        estado:"",
        description:"",
        name:"",
        lastName:""

    });
    const Changes = async (e) => {
        try {
            if(!data.foto){
                return alert("Por favor elija una foto para su perfil") 
             }
             if(!data.ciudad){
                 return alert("Por favor elija una ciudad para su perfil")
             }
             if(!data.description){
                return alert("Por favor escriba una descripción para sus alumnos")
             }
             if(!data.estado && !data.ciudad){
                 return alert("Por favor elija una ciudad para su perfil")
             }

            const token = getCookieValue('token').replaceAll("\"", '')
            const thisUser = await axios.post(`http://localhost:3001/api/verify`, {},{ withCredentials: true, headers: {Authorization: token}})
            let editar = await axios.patch("http://localhost:3001/api/profesores/", {
                foto: img,
                usuario: thisUser.data.mail,
                description: data.description,
                ciudad:data.estado+", "+data.ciudad
            })
            alert("Cambios Realizados")
        } catch (err) {
            console.log(err);
            alert("Algo salio mal")
        }


    }
    

    const inputsHandler = (e) => {
        e.preventDefault();
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value;
        setData(newdata)
        console.log(newdata)

    }
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setImg(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0])
        const newdata = { ...data }
        newdata[e.target.id] = e.target.value;
        setData(newdata)
        console.log(newdata)
    }
    return (
        <div >
            <div className={styles.Container}>

                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Ajustes del Perfil</h4>
                        </div>
                        <div className="col-md-3 border-right">
                            <span className={styles.span_imagen}>Selecciona una imagen para tu perfil</span>
                            <input type='file' onChange={(e) => imageHandler(e)} id='foto' />
                            <div className="d-flex flex-column align-items-center text-center  p-3 py-5"><img className={styles.imgEdit} src={img} /><span className="font-weight-bold">Vista Previa</span><span className="text-black-50"></span><span> </span></div>
                        </div>
                        <div className="row mt-3">
                        <div className="col-md-12"><label className="labels">Pon una descripción para los alumnos!</label><textarea className="form-control" onChange={(e) => inputsHandler(e)} id="description" /></div>
                            <div className="col-md-12"><label className="labels">Contacto Telefonico</label><input type="text" className="form-control" placeholder="numero de celular" /></div>
                            <div className="col-md-12"><label className="labels">Dirección</label><input type="text" className="form-control" placeholder="escribir direccion" /></div>
                            <div className="col-md-12"><label className="labels">Educación</label><input type="text" className="form-control" placeholder="educacion" /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">País</label><input type="text" className="form-control" placeholder="pais" id="ciudad" onChange={(e) => inputsHandler(e)}/></div>
                            <div className="col-md-6"><label className="labels">Estado</label><input type="text" className="form-control" placeholder="estado" id="estado" onChange={(e) => inputsHandler(e)}/></div>
                        </div>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={(e) => Changes(e)}>Guardar Perfil</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile

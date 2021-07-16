
import styles from './editProfile.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const EditProfile = () => {
    const [img, setImg] = useState<any>('')
    const [data, setData] = useState<any>({
        foto: "",

    });
    const Changes = async (e) => {
        try {
            let editar = await axios.put("http://localhost:3001/api/profesores/", {
                foto: img

            })
            alert("Cambios Realizados")
        } catch (err) {
            alert("Algo salio mal xD")
        }


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
        <div>
            <div className={styles.Container}>

                <div className="col-md-5 border-right">
                    <div className="p-3 py-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="text-right">Ajustes del Perfil</h4>
                        </div>
                        <div className="col-md-3 border-right">
                            <span className="text-black-50">Selecciona una imagen</span>
                            <input type='file' onChange={(e) => imageHandler(e)} id='foto' />
                            <div className="d-flex flex-column align-items-center text-center  p-3 py-5"><img className={styles.imgEdit} src={img} /><span className="font-weight-bold"></span><span className="text-black-50">amelly12@bbb.com</span><span> </span></div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6"><label className="labels">Nombre</label><input type="text" className="form-control" placeholder="primer nombre" /></div>
                            <div className="col-md-6"><label className="labels">Apellido</label><input type="text" className="form-control" placeholder="apellido" /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-12"><label className="labels">Contacto Telefonico</label><input type="text" className="form-control" placeholder="numero de celular" /></div>
                            <div className="col-md-12"><label className="labels">Dirección</label><input type="text" className="form-control" placeholder="escribir direccion" /></div>
                            <div className="col-md-12"><label className="labels">Email</label><input type="text" className="form-control" placeholder="escribir email" /></div>
                            <div className="col-md-12"><label className="labels">Educación</label><input type="text" className="form-control" placeholder="educacion" /></div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-md-6"><label className="labels">País</label><input type="text" className="form-control" placeholder="pais" /></div>
                            <div className="col-md-6"><label className="labels">Estado</label><input type="text" className="form-control" placeholder="estado" /></div>
                        </div>
                        <div className="mt-5 text-center"><button className="btn btn-primary profile-button" type="button" onClick={(e) => Changes(e)}>Guardar Perfil</button></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProfile

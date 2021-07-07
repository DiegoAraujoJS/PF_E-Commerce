import React, { useState } from "react";
import { useSelector } from "react-redux";

function AddClaim() {

    let [professor, setProfessor] = useState('');
    let [claim, setClaim] = useState({professors:[], name: '', description: '', detail:""});

    const professorsList = useSelector(state => state['professor']);


    const handleChange = (e) => {
        e.preventDefault();
        let nam = e.target.name;
        let val = e.target.value;
        setClaim({...claim,[nam]:val});
    };
console.log(claim)
    let professorChange = (e) => {
        let cn = e.target.value
        setProfessor(cn);
    };

    let addProfessor = (e) => {
        e.preventDefault();
        if(validateProfessor(professor)) {
            setClaim({...claim, professors: [...claim.professors, professor]})
            setProfessor('')
            let p = document.getElementById('p');
            p['value'] = '';
        } else {
            let p = document.getElementById('p');
            p['value'] = '';
            alert ('No existe ese Profesor')
        }
    };

    let validateProfessor = (a) => {
        return professorsList.some(c => c.name === a)
    };

    let delProfessor = (e) => {
        e.preventDefault();
        setClaim({...claim, professors:[...claim.professors.filter(c => c !== e.target.name)]})
    };

    return (
        <div>
            <form>
                <div>
                    <h4>Crear un Reclamo</h4>
                    <label>Nombre Reclamo</label>
                    <input
                        type = 'text'
                        name = 'name'
                        onChange = {handleChange}
                    /><br/>
                    <label>Descripcion</label>
                    <input
                        type = 'text'
                        name = 'description'
                        onChange = {handleChange}
                    /><br/>
                    <label>Detalla el Reclamo</label>
                    <textarea
                        name = 'detail'
                        rows = {4}
                        cols = {60}
                        onChange = {handleChange}
                    />
                </div>
                <div>
                    <label>Profesor:</label><br/>
                    <input  
                        id = 'p'
                        type='text' 
                        name='professor' 
                        onChange={professorChange}
                    />
                    <button onClick={addProfessor}>+</button><br/>
                    {Array.isArray(claim.professors) && claim.professors.map((c,i) => 
                    <label key={i}> {c} 
                        <button name={c} onClick={delProfessor}>x</button>
                    </label>)}
                </div>
            </form>
        </div>
    )
};

export default AddClaim;
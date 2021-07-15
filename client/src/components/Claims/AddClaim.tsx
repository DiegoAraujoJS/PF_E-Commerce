import { useState } from "react";
import { useSelector } from "react-redux";
import style from './AddClaim.module.css';

function AddClaim() {

    let [professor, setProfessor] = useState('');
    let [claim, setClaim] = useState({professors:[], name: '', description: '', detail:""});

    const professorsList = useSelector(state => state['professors']);


    const handleChange = (e) => {
        e.preventDefault();
        let nam = e.target.name;
        let val = e.target.value;
        setClaim({...claim,[nam]:val});
    };

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
        return professorsList.some(c => c['name'] === a)
    };

    let delProfessor = (e) => {
        e.preventDefault();
        setClaim({...claim, professors:[...claim.professors.filter(c => c !== e.target.name)]})
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        // let { name, description, detail } = claim;

        // claim.professors.map(professor => 
        //     axios.post('http://localhost:3001/api/claim/professor', { name, description, detail })
        // )

        alert('Reclamo Subido')
    };

    return (
        <div className = {style.container}>
            <form className = {style.form}>
                <div className = {style.question}>
                    <h4>Crear un Reclamo</h4>
                    <div className = {style.claim}>
                        <label>Nombre Reclamo</label>
                        <input
                            className = {style.input}
                            type = 'text'
                            name = 'name'
                            onChange = {handleChange}
                        />
                    </div>
                    <div className = {style.claim}>
                        <label>Descripcion</label>
                        <input
                            className = {style.input}
                            type = 'text'
                            name = 'description'
                            onChange = {handleChange}
                        />
                    </div>
                    <div className = {style.claim}>
                        <label>Detalla el Reclamo</label>
                        <textarea
                            className = {style.input}
                            name = 'detail'
                            rows = {4}
                            cols = {60}
                            onChange = {handleChange}
                        />
                    </div>
                </div>
                <div className = {style.profe}>
                    <label>Profesor:</label>
                    <input  
                        className = {style.input}
                        id = 'p'
                        type='text' 
                        name='professor' 
                        onChange={professorChange}
                    />
                    <button 
                        className = {style.sum} 
                        onClick={addProfessor}>
                            +
                    </button>
                </div>
                <div className = {style.claim}>
                    {Array.isArray(claim.professors) && claim.professors.map((c,i) => 
                    <label key={i}> {c} 
                        <button 
                            className = {style.del}
                            name={c} 
                            onClick={delProfessor}>
                                x
                        </button>
                    </label>)}
                </div>
                <button 
                    className = {style.submit}
                    value='Add Claim' 
                    onClick={handleSubmit}>
                        Subir Reclamo
                </button>
            </form>
        </div>
    )
};

export default AddClaim;
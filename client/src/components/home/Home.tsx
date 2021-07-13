import React from 'react';
import CSS from 'csstype';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import SearchBarHome from '../searchBar/SearchBarHome';
import students from '../../images/students.jpg';
import axios from 'axios'
// import { auth } from '../../firebase';
// import { store } from '../../Store/store';
const Home = ({ dispatchInput }) => {
    const [searchInput, setSearchInput] = React.useState('')
    const history = useHistory()

    

    function handleChange(e) {
        
        switch(e.target.name) {
            case 'searchInput':
                setSearchInput(e.target.value)
                break;
            default:
                break;
        }
    }

    const bgImg: CSS.Properties = {
        position: 'fixed',
        minHeight: '100%',
        minWidth: '100%',  
        bottom: '-56px',
        margin: '0px auto',
        zIndex: -1
    };

    const searchCenter: CSS.Properties = {
        position: 'relative',
        width: 'fit-content',
        padding: '250px 0px',
        margin: 'auto'
    }

    const searchBar: CSS.Properties = {
        position: 'relative',
        height: '38px',
        width: '300px',
        top: '2px',
        lineHeight: '100px'
    }
    const containerHome: CSS.Properties = {
    //    '--height': 'calc(100vh - 56px)',
    }
    async function vaYBusca() {
        
        const response: any = await axios.get(`http://localhost:3001/api/clases?busqueda=${searchInput}`)
        dispatchInput(response.data)
        
        history.push('/clases')
    }

    return (
        <div style={containerHome}>
            {/* <SearchBarHome /> */}
            <div style={searchCenter}>
                <input style={searchBar} type='text' name='searchInput' value={searchInput} onChange={handleChange}/>
                <Button variant='primary' onClick={() => vaYBusca()}>Buscar</Button>
            </div>
            <img src={students} alt='students' style={bgImg}/>
        </div>
    )
}

const dispatchFuncToProps = (dispatch) => {
    return {
        dispatchInput: function (payload) {
            dispatch({type: 'SEARCH_INPUT', payload})
        }
    }
}

export default connect(null, dispatchFuncToProps)(Home)
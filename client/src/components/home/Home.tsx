import React from 'react';
import CSS from 'csstype';
import { Button } from 'react-bootstrap';
import SearchBarHome from '../searchBar/SearchBarHome';
import students from '../../images/students.jpg';

export default function Home() {
    const [searchInput, setSearchInput] = React.useState('')

    function handleChange(e) {
        switch(e.target.name) {
            case 'searchInput':
                setSearchInput(e.target.value)
                break;
            default:
                break;
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    const bgImg: CSS.Properties = {
        position: 'fixed',
        minHeight: '100%',
        minWidth: '100%',  
        bottom: '-200px',
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

    return (
        <div>
            <SearchBarHome />
            <div style={searchCenter}>
                <input style={searchBar} type='text' name='searchInput' value={searchInput} onChange={handleChange}/>
                <Button variant='primary'>Buscar</Button>
            </div>
            <img src={students} style={bgImg}/>
        </div>
    )
}
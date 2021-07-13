import {UserProps} from '../../../../interfaces'
import axios from 'axios'

describe ('registra, autentica usuarios y guarda la informacion en un jwt', () => {
    const Pedro: UserProps = {
        lastName: 'Perez',
        mail: 'pedro@gmail.com',
        name: 'Pedro',
        role: 0
    }
    const password = "123456"
    it ('deberia registrar, logear y dar un token al usuario', async () => {
        const register = await axios.post('http://localhost:3001/api/session/register', {...Pedro, password})        
        const login = await axios.post('http://localhost:3001/api/login', {mail: Pedro.mail, password})
        
        return expect(login.data).toHaveProperty('token')
    })
})
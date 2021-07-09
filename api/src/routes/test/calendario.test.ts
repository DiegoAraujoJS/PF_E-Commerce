import axios from 'axios'
import Profesor from '../../models/Profesor'
import {sequelize} from '../../db'
sequelize.addModels([Profesor])
type CalendarioResponse = Horario[]
interface Horario {

    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    },
    disponible: arrayDePares,
    ocupado?: arrayDePares
}
type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]


console.log('entre al file')

test('postea varios horarios correctamente', async () => {
    const Edward = await Profesor.findByPk('edwardburgos@gmail.com')
    console.log(Edward?.puntuacion)
    console.log(Edward?.getDataValue('calendario'))
    
    const newPost = await axios.post('http://localhost:3001/api/calendario/add', {
        disponible: [['12:00:00', '14:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    })

    expect(Array({
        disponible: [['12:00:00', '14:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    })).toEqual({...newPost.data.calendario, email: Edward?.User_mail})
})


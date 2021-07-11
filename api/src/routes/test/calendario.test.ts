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
    ocupado?: arrayDePares | null;
}
type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]


console.log('entre al file')

afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    sequelize.close();

    
  });

describe ('guarda y modifica el calendario del profesor correctamente', () => {
    const horario1:Horario = {
        disponible: [['12:00:00', '14:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }
    const horario2: Horario = {
        disponible: [['18:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }
    const ocupado1 = {
        ocupado: [['12:00:00', '14:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }

    const ocupado2 = {
        ocupado: [['19:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }
    
    it('postea varios horarios correctamente', async () => {
    
        
        await axios.post('http://localhost:3001/api/calendario/add', horario1)
        await axios.post('http://localhost:3001/api/calendario/add', horario2)
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')
    
        return expect(Edward?.calendario).toEqual([{...horario1, disponible: horario1.disponible.concat(horario2.disponible), ocupado: null}])
        
    })

    it ('deberia pisar horarios disponibles con horarios ocupados', async () => {
        
        await axios.put('http://localhost:3001/api/calendario/edit', ocupado1)
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        console.log(Edward?.calendario)
        return expect(Edward?.calendario).toEqual([{...horario1, disponible: horario2.disponible, ocupado: ocupado1.ocupado}])
        

    })

    it ('deberia pisar rangos de horarios: si tiene de disponible [\'18:00:00\', \'20:00:00\'] y le pasan de ocupado [\'19:00:00\', \'20:00:00\'], deberia quedar en disponible [\'18:00:00\', \'19:00:00\']', async () => {
        await axios.put('http://localhost:3001/api/calendario/edit', ocupado2)
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        console.log(Edward?.calendario)
        return expect(Edward?.calendario).toEqual([{email: 'edwardburgos@gmail.com', fecha: {anio: 2021, mes: 8, dia: 12}, disponible: [['18:00:00', '19:00:00']], ocupado: [['12:00:00', '14:00:00'],['19:00:00', '20:00:00']]}])  
        
    })
    
})




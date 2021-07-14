import axios from 'axios'
import Profesor from '../../models/Profesor'
import {sequelize} from '../../db'
import {CalendarioResponse, Disponible, Horario, Ocupado, ProfesorProps} from '../../../../interfaces'

sequelize.addModels([Profesor])


afterAll(() => {
    // Closing the DB connection allows Jest to exit successfully.
    sequelize.close();

    
  });

describe ('guarda y modifica el calendario del profesor correctamente', () => {
    const horario1:Disponible = {
        disponible: [['12:00:00', '14:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }
    const horario2: Disponible = {
        disponible: [['18:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }
    const ocupado1: Ocupado = {
        ocupado: [['12:00:00', '14:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }

    const ocupado2: Ocupado = {
        ocupado: [['19:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 12
        }
    }

    const expectedThirdTest: CalendarioResponse = [{email: 'edwardburgos@gmail.com', fecha: {anio: 2021, mes: 8, dia: 12}, disponible: [['18:00:00', '19:00:00']], ocupado: [['12:00:00', '14:00:00'],['19:00:00', '20:00:00']]}]

    const newAvailable: Disponible = {
        disponible: [['18:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 14
        }
    }
    const newNewAvailable: Disponible = {
        disponible: [['18:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 16
        }
    }
    const newNewTaken: Ocupado = {
        ocupado: [['18:00:00', '20:00:00']],
        email: 'edwardburgos@gmail.com',
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 16
        }
    }
    
    it('postea varios horarios correctamente', async () => {
    
        
        await axios.post('http://localhost:3001/api/calendario/add', horario1)
        await axios.post('http://localhost:3001/api/calendario/add', horario2)
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')
    
        return expect(Edward?.calendario).toEqual([{...horario1, disponible: horario1.disponible.concat(horario2.disponible)}])
        
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
        return expect(Edward?.calendario).toEqual(expectedThirdTest)  
        
    })

    it ('debería agregar un objeto Disponible nuevo al array si se le pasa una nueva fecha', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', newAvailable)
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        return expect (Edward.calendario).toEqual([...expectedThirdTest, newAvailable])
    })

    it ('paso 1) agregas un horario disponible. paso 2) ocupas ese horario. paso 3) lo volves a poner como disponible. Deberia quedar solo el disponible y no los dos', async () => {
        await axios.post('http://localhost:3001/api/calendario/add', newNewAvailable)
        await axios.put('http://localhost:3001/api/calendario/edit', newNewTaken)
        await axios.post('http://localhost:3001/api/calendario/add', newNewAvailable)
        const Edward = await Profesor.findByPk('edwardburgos@gmail.com')

        return expect (Edward.calendario).toEqual([...expectedThirdTest, newAvailable, newNewAvailable])

    })

    
    
})




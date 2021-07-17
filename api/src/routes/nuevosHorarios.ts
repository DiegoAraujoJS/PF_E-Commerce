import editCalendar from "./editCalendar"
import flatInline from "../utils/flatInline"
import flat from '../utils/flat'
import { Horario, Disponible, Ocupado, DisponibleOcupadoTransform } from "../../../interfaces"
import {parseToIntTuples, parseToStringTuples} from "../utils/parseString"
import squashTakenWithAvailable from '../utils/squashTakenWithAvailable'
const nuevosHorarios = (horariosActuales: Horario, queryDisponible?: Disponible, queryOcupado?: Ocupado): Horario => {

    let newHorario: Horario = {
        disponible: null,
        email: horariosActuales.email,
        fecha: {
            anio: horariosActuales.fecha.anio,
            dia: horariosActuales.fecha.dia,
            mes: horariosActuales.fecha.mes
        },
        ocupado: null
    }
    
    if (queryDisponible){
        
        newHorario.disponible = horariosActuales.disponible ? flatInline([...horariosActuales.disponible.map(parseToIntTuples), ...queryDisponible.disponible.map(parseToIntTuples)]).map(parseToStringTuples) : queryDisponible.disponible
        

        if (horariosActuales.ocupado) {
            const available: [number, number][] = newHorario.disponible.map(parseToIntTuples)
            const taken : [number, number][] = horariosActuales.ocupado.map(parseToIntTuples)
            newHorario.ocupado = squashTakenWithAvailable(available, taken).map(parseToStringTuples)
        } else {
            newHorario.ocupado = null
        }

    } else if (queryOcupado) {


        
        newHorario.ocupado = horariosActuales.ocupado ? flatInline([...horariosActuales.ocupado.map(parseToIntTuples), ...queryOcupado.ocupado.map(parseToIntTuples)]).map(parseToStringTuples) : queryOcupado.ocupado
        
        if (horariosActuales.disponible) {
            const available: [number, number][] = horariosActuales.disponible.map(parseToIntTuples)
            const taken: [number, number][] = newHorario.ocupado.map(parseToIntTuples)
            console.log('taken', newHorario.ocupado.map(parseToIntTuples))

            newHorario.disponible = squashTakenWithAvailable(taken, available).map(parseToStringTuples)
        
            
        } else {
            newHorario.disponible = null
        }
    }
    return newHorario
}

const horario1 = JSON.parse(`{
    "email": "edwardburgos@gmail.com",
    "fecha": {
        "anio": 2021,
        "mes": 8,
        "dia": 14
    },
    "disponible": [["12:00:00", "14:00:00"]],
    "ocupado": null
    
  }`)
  const disponible1: Disponible = JSON.parse(`{
    "email": "edwardburgos@gmail.com",
    "fecha": {
        "anio": 2021,
        "mes": 8,
        "dia": 14
    },
    "disponible": [["18:00:00", "20:00:00"]]
    
  }`)
  const ocupado1 = JSON.parse(`{
    "email": "edwardburgos@gmail.com",
    "fecha": {
        "anio": 2021,
        "mes": 8,
        "dia": 14
    },
    "ocupado": [["12:00:00", "14:00:00"]]
    
  }`)
  const ocupado2 = JSON.parse(`{
    "email": "edwardburgos@gmail.com",
    "fecha": {
        "anio": 2021,
        "mes": 8,
        "dia": 14
    },
    "ocupado": [["19:00:00", "20:00:00"]]
    
  }`)
  
const newHorarios1 = nuevosHorarios(horario1, disponible1)
console.log ('1', newHorarios1)
const newHorarios2 = nuevosHorarios(newHorarios1, null, ocupado1)
// const newHorarios2 = nuevosHorarios(newHorarios, ocupado1)
console.log('2', newHorarios2)
const newHorarios3 = nuevosHorarios(newHorarios2, null, ocupado2)
console.log('3', newHorarios3)
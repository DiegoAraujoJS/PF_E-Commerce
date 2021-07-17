import editCalendar from "./editCalendar"
import flatInline from "../utils/flatInline"
import flat from '../utils/flat'
import { Horario, Disponible, Ocupado, DisponibleOcupadoTransform } from "../../../interfaces"
import {parseToIntTuples, parseToStringTuples} from "../utils/parseString"
import squashTakenWithAvailable from '../utils/squashTakenWithAvailable'
const nuevosHorarios = (horariosActuales: Horario, queryDisponible?: Disponible, queryOcupado?: Ocupado): Horario => {

    // const query_1: string = queryDisponible ? queryDisponible.disponible[0][0].substring(0, 2) + '.' + queryDisponible.disponible[0][0].substring(3, 5) : queryOcupado.ocupado[0][0].substring(0, 2) + '.' +  queryOcupado.ocupado[0][0].substring(3, 5)
    // const query_2: string = queryDisponible ? queryDisponible.disponible[0][1].substring(0, 2) + '.' + queryDisponible.disponible[0][1].substring(3, 5) : queryOcupado.ocupado[0][1].substring(0, 2) + '.' + queryOcupado.ocupado[0][1].substring(3, 5) 

    // const timeToNumberQuery: [number, number] = [parseFloat(query_1), parseFloat(query_2)]

    // const timeToNumberActualDisponible: [number, number][] = horariosActuales.disponible.map(h => {
    //     let sumaHorario_1 = h[0].substring(0, 2) + '.' +  h[0].substring(3, 5)
    //     let sumaHorario_2 = h[1].substring(0, 2) + '.' + h[1].substring(3, 5)
    //     return [parseFloat(sumaHorario_1), parseFloat(sumaHorario_2)]
    // })

    // const timeToNumberActualOcupado: [number, number][] = horariosActuales.ocupado.map(h => {
    //     let sumaHorario_1 = h[0].substring(0, 2) + '.' +  h[0].substring(3, 5)
    //     let sumaHorario_2 = h[1].substring(0, 2) + '.' + h[1].substring(3, 5)
    //     return [parseFloat(sumaHorario_1), parseFloat(sumaHorario_2)]
    // })
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
        console.log(horariosActuales.disponible.map(parseToIntTuples))
        newHorario.disponible = horariosActuales.disponible ? flatInline([...horariosActuales.disponible.map(parseToIntTuples), ...queryDisponible.disponible.map(parseToIntTuples)]).map(parseToStringTuples) : queryDisponible.disponible
        console.log(newHorario)

        if (horariosActuales.ocupado) {
            const taken : [number, number][] = horariosActuales.ocupado.map(parseToIntTuples)
            newHorario.ocupado = squashTakenWithAvailable(newHorario.disponible.map(parseToIntTuples), taken).map(parseToStringTuples)
        } else {
            newHorario.ocupado = null
        }

    } else if (queryOcupado) {
        
        newHorario.ocupado = horariosActuales.ocupado ? flatInline([...horariosActuales.ocupado.map(parseToIntTuples), ...queryOcupado.ocupado.map(parseToIntTuples)]).map(parseToStringTuples) : queryOcupado.ocupado
        
        if (horariosActuales.disponible) {
            const available: [number, number][] = horariosActuales.disponible.map(parseToIntTuples)
            console.log('available', available)
            newHorario.disponible = squashTakenWithAvailable(newHorario.ocupado.map(parseToIntTuples), available).map(parseToStringTuples)
            console.log(newHorario.disponible)
        } else {
            newHorario.disponible = null
        }
    }
    return newHorario
}

const horario1: Horario = JSON.parse(`{
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
const newHorarios1 = nuevosHorarios(horario1, disponible1)
console.log ('1', newHorarios1)
const newHorarios = nuevosHorarios(newHorarios1, null, ocupado1)
// const newHorarios2 = nuevosHorarios(newHorarios, ocupado1)
console.log('2', newHorarios)
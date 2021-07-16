import editCalendar from "./editCalendar"
import flatInline from "../utils/flatInline"
import flat from '../utils/flat'
import { Horario, Disponible, Ocupado, DisponibleOcupadoTransform } from "../../../interfaces"
const nuevosHorarios = (horariosActuales: Horario, queryDisponible?: Disponible, queryOcupado?: Ocupado): DisponibleOcupadoTransform => {

    const query_1: string = queryDisponible ? queryDisponible.disponible[0][0].substring(0, 2) + '.' + queryDisponible.disponible[0][0].substring(3, 5) : queryOcupado.ocupado[0][0].substring(0, 2) + '.' +  queryOcupado.ocupado[0][0].substring(3, 5)
    const query_2: string = queryDisponible ? queryDisponible.disponible[0][1].substring(0, 2) + '.' + queryDisponible.disponible[0][1].substring(3, 5) : queryOcupado.ocupado[0][1].substring(0, 2) + '.' + queryOcupado.ocupado[0][1].substring(3, 5) 

    const timeToNumberQuery: [number, number] = [parseFloat(query_1), parseFloat(query_2)]

    const timeToNumberActualDisponible: [number, number][] = horariosActuales.disponible.map(h => {
        let sumaHorario_1 = h[0].substring(0, 2) + '.' +  h[0].substring(3, 5)
        let sumaHorario_2 = h[1].substring(0, 2) + '.' + h[1].substring(3, 5)
        return [parseFloat(sumaHorario_1), parseFloat(sumaHorario_2)]
    })

    const timeToNumberActualOcupado: [number, number][] = horariosActuales.ocupado.map(h => {
        let sumaHorario_1 = h[0].substring(0, 2) + '.' +  h[0].substring(3, 5)
        let sumaHorario_2 = h[1].substring(0, 2) + '.' + h[1].substring(3, 5)
        return [parseFloat(sumaHorario_1), parseFloat(sumaHorario_2)]
    })

    if (queryDisponible){

        const newAvailable = flatInline([...timeToNumberActualDisponible, timeToNumberQuery]) //este va a ser nuevo si le pasan un disponible

                                            // disponible: [[10, 12]]
                                            // ocupado: [[14, 16], [18, 20]]

                                            // disponbie: [[10, 12], [18, 20]<==]
                                            // ocupado: [[14, 16]]

                                            // disponible: [[10, 12]]
                                            // ocupado: [[14, 16], [18, 20]]

                                            // disponbie: [[10, 12], [17, 22]<==]
                                            // ocupado: [[14, 16]]

        // disponible: [[10, 12]]
        // ocupado: [[14, 16], [18, 20]]

        // disponbie: [[10, 12], [19, 22]<==]
        // ocupado: [[14, 16], [18, 19]]

        const oldOcupado = timeToNumberActualOcupado

        let newOcupado = oldOcupado.filter(ocupado => ! newAvailable.find(range => range[0] <= ocupado[0] && range[1] >= ocupado[1]))

        newOcupado = newOcupado.map(ocupado => {
            let min = ocupado[0]
            let max = ocupado[1]
            const superSetsMin = newAvailable.find(range => range[0] <= min && range[1] >= min)
            const superSetsMax = newAvailable.find(range => range[0] <= max && range[1] >= max)
            
            if (superSetsMin){
                return [superSetsMin[1], max]
            } else if (superSetsMax){
                return [min, superSetsMax[0]]
            } else {
                return ocupado
            }
        })

        



    } else if (queryOcupado) {

        const newTaken = flatInline([...timeToNumberActualOcupado, timeToNumberQuery]) // este va a ser el nuevo ocupado si le pasan un ocupado



    }

    let acomodarFechas = eliminarRepetidos?.map((item, index) => {
        if (query && query_1 && query_2) {
            if (item > query_1 && item < query_2) {
                if (Number(ordered[index]) - Number(query_1) < Number(query_2) - Number(ordered[index])) {
                    return query_1
                }
                else {
                    return query_2
                }
            }
            else if (item === query_1 && index % 2 === 0) {
                return query_2
            }
            else if (item === ordered[index - 1]) {
                return null
            }
            else {
                return item
            }
        }
        else {
            return item
        }
    })

    let horariosNuevos = acomodarFechas?.map(h => {
        if (h) {
            if (h.length === 6) {
                let horario = h.substring(0, 2) + ":" + h.substring(2, 4) + ":" + h.substring(4, 6)
                return horario
            }
        }
    })

    let eliminarVacios = horariosNuevos.filter(fecha => fecha)

    let horariosTuplas: Array<(string | undefined)[]> = []

    for (let i = 0; i < horariosNuevos.length; i += 2) {
        horariosTuplas.push([horariosNuevos && horariosNuevos[i], horariosNuevos && horariosNuevos[i + 1]])
    }

    let completarHorario = horariosTuplas.map(e => {
        if (!e[1] && e[0]) {
            if (horariosTuplas && horariosTuplas[horariosTuplas.length - 2][1] && e[0] !== horariosTuplas[horariosTuplas.length - 2][1]) {
                if (e[0].substring(0, 2) + e[0].substring(3, 5) + e[0].substring(6, 8) > query_2) {
                    return [query[1], e[0]]
                }
                else {
                    return [horariosTuplas[horariosTuplas.length - 2][1], e[0]]
                }
            }
            else if (horariosTuplas && horariosTuplas[horariosTuplas.length - 2][1] && e[0] === horariosTuplas[horariosTuplas.length - 2][1]) {
                return [undefined, undefined]
            }
            else {
                return [e[0], e[0]]
            }
        }
        else if (!e[0] && e[1]) {
            if (horariosTuplas && horariosTuplas[horariosTuplas.length - 2][1] && e[1] !== horariosTuplas[horariosTuplas.length - 2][1]) {
                if (e[1].substring(0, 2) + e[1].substring(3, 5) + e[1].substring(6, 8) > query_2) {
                    return [query[1], e[1]]
                }
                else {
                    return [horariosTuplas[horariosTuplas.length - 2][1], e[1]]
                }
            }
            else if (horariosTuplas && horariosTuplas[horariosTuplas.length - 2][1] && e[1] === horariosTuplas[horariosTuplas.length - 2][1]) {
                return [undefined, undefined]
            }
            else {
                return [e[1], e[1]]
            }
        }
        else {
            return e
        }
    })

    let resultadoAdd = completarHorario.filter(fecha => fecha[0] && fecha[1])

    return resultadoAdd
}

export default nuevosHorarios
import editCalendar from "./editCalendar"
import { CalendarioResponse, Horario, ArrayDePares, Fecha } from '../../../interfaces';

const nuevosHorarios = (arrayHorarios: ArrayDePares[]|string[][], query?:ArrayDePares|any) => {

    if (query) {
        var query_1: string = query[0].substring(0, 2) + query[0].substring(3, 5) + query[0].substring(6, 8)
        var query_2: string = query[1].substring(0, 2) + query[1].substring(3, 5) + query[1].substring(6, 8)
        console.log("Query", query)
    }

    let horarioNumero: string[][] = arrayHorarios?.map(h => {
        if (h) {
            if (h[0].length === 8 && h[1].length === 8) {
                let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
                let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
                return [sumaHorario_1, sumaHorario_2]
            }
        }
    })

    let numeros: string[][] = horarioNumero && horarioNumero?.map(elements => elements && elements?.join().split(","))

    let ordenados: string[] = numeros && numeros?.join().split(",").sort()
console.log("ORDENADOS", ordenados)
    
    let acomodarFechas: string[] = ordenados?.map((item, index) => {
        if (query && query_1 && query_2) {
            if (item > query_1 && item < query_2) {
                if (Number(ordenados[index]) - Number(query_1) < Number(query_2) - Number(ordenados[index])) {
                    return query_1
                }
                else {
                    return query_2
                }
            }
            else if (item === query_1 && index % 2 === 0) {
                return query_2
            }
            else if (item === ordenados[index - 1]) {
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
    console.log("Acomodar fechas", acomodarFechas)
    let horariosNuevos: string[] = acomodarFechas?.map(h => {
        if (h) {
            if (h.length === 6) {
                let horario = h.substring(0, 2) + ":" + h.substring(2, 4) + ":" + h.substring(4, 6)
                return horario
            }
        }
    })
    console.log("Horarios nuevos", horariosNuevos)
    let eliminarVacios: string[] = horariosNuevos.filter(fecha => fecha)
    console.log("Horarios eliminados", eliminarVacios)
    let horariosTuplas: Array<(string | undefined)[]> = []
    
    for (let i = 0; i < eliminarVacios.length; i += 2) {
        horariosTuplas.push([horariosNuevos && horariosNuevos[i], horariosNuevos && horariosNuevos[i + 1]])
    }
    console.log("HORARIOS TUPLAS",horariosTuplas)
    let completarHorario: string[][] = horariosTuplas?.map(e => {
        console.log("E", e)
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
    
    console.log("Completar horariod", completarHorario)
    let resultadoAdd : ArrayDePares[]|string[][] = completarHorario?.filter(fecha => fecha[0] && fecha[1])

    return resultadoAdd
}

export default nuevosHorarios
import { CalendarioResponse, Horario, ArrayDePares, Fecha } from '../../../interfaces';
const editCalendar = (arrayHorarios: ArrayDePares[]|string[][], query?: ArrayDePares|any) => {

    let completarHorario: ArrayDePares[]|string[][] = arrayHorarios?.map(( h:string|any ) => {

        if (query) {
            let sumaHorario_1: string = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
            let sumaHorario_2: string = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
            let sumaHorarioOcupado_1: string  = query[0].substring(0, 2) + query[0].substring(3, 5) + query[0].substring(6, 8)
            let sumaHorarioOcupado_2: string = query[1].substring(0, 2) + query[1].substring(3, 5) + query[1].substring(6, 8)


            if (sumaHorario_1 >= sumaHorarioOcupado_1 && sumaHorario_2 <= sumaHorarioOcupado_2) {
                return null
            }
            else if (sumaHorario_2 >= sumaHorarioOcupado_1 && sumaHorario_2 <= sumaHorarioOcupado_2 && sumaHorarioOcupado_1 >= sumaHorario_1) {
                return [h[0], query[0]]
            }
            else if (sumaHorario_1 <= sumaHorarioOcupado_2 && sumaHorario_2 >= sumaHorarioOcupado_2) {
                return [query[1], h[1]]
            }
            else if (sumaHorario_1 >= sumaHorarioOcupado_1 && sumaHorario_2 <= sumaHorarioOcupado_2) {
                return [query[0], h[1]]
            }
            else {
                return h
            }
        }

        else {
            return h
        }
    })

    let resultado: ArrayDePares[]|any[][] = completarHorario?.map(((horarios: ArrayDePares|string[] ) => (horarios)))

    if(resultado){
    let resultadoEdit = resultado?.filter( h => h)

    return resultadoEdit
    }
    else   {
        return resultado
    }

}
export default editCalendar
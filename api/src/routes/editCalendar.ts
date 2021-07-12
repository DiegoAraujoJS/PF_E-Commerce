const editCalendar = (arrayHorarios: Array<string[]>, query) => {
    console.log("editarHorarios  arrayHorarios",arrayHorarios)
    let completarHorario = arrayHorarios.map(h => {

        if (query.ocupado) {
            let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
            let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
            let sumaHorarioOcupado_1 = query.ocupado[0][0].substring(0, 2) + query.ocupado[0][0].substring(3, 5) + query.ocupado[0][0].substring(6, 8)
            let sumaHorarioOcupado_2 = query.ocupado[0][1].substring(0, 2) + query.ocupado[0][1].substring(3, 5) + query.ocupado[0][1].substring(6, 8)


            if (sumaHorario_1 >= sumaHorarioOcupado_1 && sumaHorario_2 <= sumaHorarioOcupado_2) {
                return null
            }
            else if (sumaHorario_2 >= sumaHorarioOcupado_1 && sumaHorario_2 <= sumaHorarioOcupado_2) {
                return [h[0], query.ocupado[0][0]]
            }
            else if (sumaHorario_1 <= sumaHorarioOcupado_2 && sumaHorario_2 >= sumaHorarioOcupado_2) {
                return [query.ocupado[0][1], h[1]]
            }
            else if (sumaHorario_1 >= sumaHorarioOcupado_1 && sumaHorario_2 <= sumaHorarioOcupado_2) {
                return [query.ocupado[0][0], h[1]]
            }
            else {
                return h
            }
        }

        else if (query.disponible) {
            let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
            let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
            let sumaHorarioDisponible_1 = query.disponible[0][0].substring(0, 2) + query.disponible[0][0].substring(3, 5) + query.disponible[0][0].substring(6, 8)
            let sumaHorarioDisponible_2 = query.disponible[0][1].substring(0, 2) + query.disponible[0][1].substring(3, 5) + query.disponible[0][1].substring(6, 8)

            if (sumaHorario_1 >= sumaHorarioDisponible_1 && sumaHorario_2 <= sumaHorarioDisponible_2) {
                return null
            }
            else if (sumaHorario_2 >= sumaHorarioDisponible_1 && sumaHorario_2 <= sumaHorarioDisponible_2 && sumaHorarioDisponible_1 >= sumaHorario_1) {
                return [h[0], query.disponible[0][0]]
            }
            else if (sumaHorario_1 <= sumaHorarioDisponible_2 && sumaHorario_2 >= sumaHorarioDisponible_2) {
                return [query.disponible[0][1], h[1]]
            }
            else if (sumaHorario_1 >= sumaHorarioDisponible_1 && sumaHorario_2 <= sumaHorarioDisponible_2) {
                return [query.disponible[0][0], h[1]]
            }
            else {
                return h
            }
        }

        else {
            return h
        }
    })
    console.log("editarHorarios  completarHorario",completarHorario)
    let resultado = completarHorario.filter(horarios => horarios)
    console.log("editarHorarios resultado",resultado)

    return resultado

}
export default editCalendar
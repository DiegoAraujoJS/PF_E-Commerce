const editCalendar = (arrayHorarios: Array<string[]>, query?:any) => {

    let completarHorario = arrayHorarios.map(h => {

        if (query) {
            let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
            let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
            let sumaHorarioOcupado_1 = query[0].substring(0, 2) + query[0].substring(3, 5) + query[0].substring(6, 8)
            let sumaHorarioOcupado_2 = query[1].substring(0, 2) + query[1].substring(3, 5) + query[1].substring(6, 8)


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

    let resultado = completarHorario.filter(horarios => horarios)

    return resultado

}
export default editCalendar
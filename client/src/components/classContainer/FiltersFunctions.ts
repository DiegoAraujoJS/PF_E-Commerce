import { IClase } from "../../../../interfaces";

export const intersection = (arr1, arr2) => {
    let ids = new Set(arr2.map(({ id }) => id));

    let result = arr1.filter(({ id }) => !ids.has(id));
    return result;
}

export const filterByTime = (array, horario) => {
    let filtrados: IClase[] = array.filter((clase: IClase) => {
        if (clase && clase.date.time && clase.date.time.length === 2) {
            let desde = horario.desde + ":00"
            let hasta = horario.hasta + ":00"
            let time = clase.date.time

            const search_desde = desde.substring(0, 2) + desde.substring(3, 5) + desde.substring(6, 8)
            const search_hasta = hasta.substring(0, 2) + hasta.substring(3, 5) + hasta.substring(6, 8)
            const clase_desde  = time && time[0].substring(0, 2) + time[0].substring(3, 5) + time[0].substring(6, 8)
            const clase_hasta = time && time[1].substring(0, 2) + time[1].substring(3, 5) + time[1].substring(6, 8)

            if (clase_desde >= search_desde && clase_desde < search_hasta && clase_hasta <= search_hasta && clase_hasta > search_desde) return clase
            else return null
        }
        else return null
    })
    return filtrados
};

export const filterByLevel = (array: IClase[], nivel: string) => {
    console.log(typeof array)
    let filtrados: IClase[] = array.filter((clase: IClase) => {
        if (clase && clase.nivel) {
            if (clase.nivel === nivel) return clase
            else return null
        }
        else return null
    })
    return filtrados
};

export const filterByGrade = (array, grado) => {
    let filtrados: IClase[] = array.filter((clase: IClase) => {
        if (clase && clase.grado) {
            if (clase.grado === grado) return clase
            else return null
        }
        else return null
    })

    return filtrados
}

export const filterByScore = (e, array) => {
    let filtrados: IClase[] = array.filter((clase: IClase) => {
        if (clase && clase.profesor.score) {
            if (clase.profesor.score.toString() === e.target.value || (clase.profesor.score >= Number(e.target.value) - 0.50 && clase.profesor.score <= e.target.value)) return clase
            else return null
        }
        else return null
    })
    return filtrados.sort(function (a, b) {
        if (a.profesor.score < b.profesor.score) { return 1; }
        if (a.profesor.score > b.profesor.score) { return -1; }
        return 0;
    })
}


export const filterByCity = (array, city) => {
    let filtrados:  IClase[] = array.filter((clase: IClase) => {
        if (clase && clase.profesor.city) {
            if (clase.profesor.city === city.name) return clase
            else return null
        }
        else return null
    })
    return filtrados
}

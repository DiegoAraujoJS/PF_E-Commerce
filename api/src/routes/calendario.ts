import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
import { isNullishCoalesce } from 'typescript';
const router = Router()


// TodasLasSemanas lo puede mandar el front si el profesor pone ''tengo disponibles los lunes de 14 a 18''
interface TodasLasSemanas {
    email: string,
    dia: {
        nombre: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo',
    },
    disponible: arrayDePares,
}


type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]

// CalendarioResponse es lo que manda el back
type CalendarioResponse = Horario[]

// ejemplo
let queryBack: CalendarioResponse = [
    {
        email: "edwardburgos@gmail.com",
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 3
        },
        disponible: [['12:45:00', '16:29:00']],
        ocupado: [['16:29:00', '16:29:00']]

    },
    {
        email: "edwardburgos@gmail.com",
        fecha: {
            anio: 2021,
            mes: 8,
            dia: 4
        },
        disponible: [['16:29:00', '16:29:00']],
        ocupado: [['16:29:00', '16:29:00']]

    }
]

// Horario es lo que manda el front
interface Horario {

    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    },
    disponible: arrayDePares,
    ocupado?: arrayDePares
}

// router.post('/semanas', async (req: Request, res: Response) => {
//     const query : TodasLasSemanas = req.body

//     try {
//         let profesor = await Profesor.findOne({
//             where: {
//                 User_mail: query.email
//             }
//         })      
//     }
//     catch (error) {
//         res.send(error)
//     }
// })

//------------------------------ FUNCION --------------------------------

var nuevosHorarios = (arrayHorarios: Array<string[]>, query?: any) => {

    if (query) {
        var query_1: string = query[0].substring(0, 2) + query[0].substring(3, 5) + query[0].substring(6, 8)
        var query_2: string = query[1].substring(0, 2) + query[1].substring(3, 5) + query[1].substring(6, 8)
    }

    let horarioNumero = arrayHorarios.map(h => {
        if (h) {
            if (h[0].length === 8 && h[1].length === 8) {
                let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
                let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
                return [sumaHorario_1, sumaHorario_2]
            }
        }
    })

    let numeros = horarioNumero && horarioNumero.map(elements => elements && elements.join().split(","))

    let ordenados = numeros && numeros.join().split(",").sort()

    // let eliminarRepetidos = ordenados?.filter((item, index) => {
    //     return ordenados?.indexOf(item) === index;
    // })

    let acomodarFechas = ordenados?.map((item, index) => {
        if (query && query_1 && query_2) {
            if (item > query_1 && item <= query_2 ) {
                if (Number(ordenados[index]) - Number(query_1) < Number(query_2) - Number(ordenados[index])) {
                    return query_1
                }
                else {
                    return query_2
                }
            }
            else if(item === query_1 && index%2===0){
                return query_2
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

    let resultado = completarHorario.filter(fecha => fecha[0] && fecha[1])

    return resultado
}
//----------------------------------------- TERMINA LA FUNCION -------------------------------------------

router.post('/add', async (req: Request, res: Response) => {
    let query: Horario = req.body
    try {
        let profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
        })

        if (profesor) {

            if (profesor.calendario) {
                let indice = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                let calendario = profesor.calendario[indice]

                if (calendario) {

                    let nuevaFecha = {
                        email: query.email,
                        fecha: query.fecha,
                        disponible: calendario.disponible ? query.disponible ? nuevosHorarios([...calendario.disponible, query.disponible[0]], query.ocupado && query.ocupado[0]) : calendario.disponible : null,
                        ocupado: calendario.ocupado ? query.ocupado ? nuevosHorarios([...calendario.ocupado, query.ocupado[0]], query.disponible[0]) : calendario.ocupado : null,
                    }

                    let nuevoCalendario = profesor.calendario.map((e, i) => i === indice ? nuevaFecha : e)

                    profesor.set({
                        ...profesor,
                        calendario: nuevoCalendario
                    })
                    let calendarioEditado = await profesor.save()

                    res.send(calendarioEditado)

                }
                else {
                    profesor.set({
                        ...profesor,
                        calendario: [
                            ...profesor.calendario,
                            {
                                email: query.email,
                                fecha: query.fecha,
                                disponible: query.disponible ? query.disponible : null,
                                ocupado: query.ocupado ? query.ocupado : null
                            }
                        ]
                    })
                    let calendarioEditado = await profesor.save()
                    return res.send(calendarioEditado)
                }
            }
            else {
                profesor.set({
                    ...profesor,
                    calendario: [
                        {
                            email: query.email,
                            fecha: query.fecha,
                            disponible: query.disponible ? query.disponible : null,
                            ocupado: query.ocupado ? query.ocupado : null,
                        }
                    ]
                })
                let calendarioEditado = await profesor.save()
                return res.send(calendarioEditado)
            }
        }
    }
    catch (error) {
        return res.send(error)
    }
});


router.get('/:usuario', async (req: Request, res: Response) => {
    const { usuario } = req.params

    try {
        if (usuario) {
            const profesor = await Profesor.findOne({
                where: {
                    User_mail: usuario
                }
            })
            if (profesor) {
                if (profesor.calendario.length > 0 && profesor.calendario) {
                    res.send(profesor.calendario)
                }
            }
        }
    }
    catch (error) {
        res.send(error)
    }
});


router.put('/edit', async (req: Request, res: Response) => {
    let query: Horario = req.body
    try {
        let profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
        })

        if (profesor) {
            if (profesor.calendario) {

                let indice = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                let calendario = profesor.calendario[indice]

                if (calendario) {
                    //------------------------------ FUNCION --------------------------------

                    const editarHorarios = (arrayHorarios: Array<string[]>) => {

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

                        let resultado = completarHorario.filter(horarios => horarios)

                        return resultado

                    }
                    //----------------------------------------- TERMINA LA FUNCION -------------------------------------------

                    if (query.disponible) {
                        let calendarioEditado = {
                            email: query.email,
                            fecha: query.fecha,
                            disponible: calendario.disponible ? nuevosHorarios([...calendario.disponible, query.disponible[0]]) : null,
                            ocupado: calendario.ocupado ? editarHorarios(calendario.ocupado) : null,
                        }

                        let nuevoCalendario = profesor.calendario.map((fecha, i) => i === indice ? calendarioEditado : fecha)

                        profesor.set({
                            ...profesor,
                            calendario: nuevoCalendario
                        })
                        let resultado = await profesor.save()
                        res.send(resultado)
                    }
                    else if (query.ocupado) {
                        let calendarioEditado = {
                            email: query.email,
                            fecha: query.fecha,
                            disponible: calendario.disponible ? editarHorarios(calendario.disponible) : null,
                            ocupado: calendario.ocupado ? nuevosHorarios([...calendario.ocupado, query.ocupado[0]]) : null,
                        }

                        let nuevoCalendario = profesor.calendario.map((fecha, i) => i === indice ? calendarioEditado : fecha)

                        profesor.set({
                            ...profesor,
                            calendario: nuevoCalendario
                        })
                        let resultado = await profesor.save()
                        res.send(resultado)
                    }
                }
            }
        }
    }

    catch (error) {
        res.send(error)
    }
});

export default router
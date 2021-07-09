import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
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
                    if (calendario.disponible && calendario.ocupado) {
                        let ocupadoEditado = calendario.ocupado.map(h => {
                            if (query.ocupado) {
                                let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
                                let sumaHorarioDisponible_1 = query.ocupado[0][0].substring(0, 2) + query.ocupado[0][0].substring(3, 5) + query.ocupado[0][0].substring(6, 8)
    
                                let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
                                let sumaHorarioDisponible_2 = query.ocupado[0][1].substring(0, 2) + query.ocupado[0][1].substring(3, 5) + query.ocupado[0][1].substring(6, 8)

                                //"15:45:00"
                                if (sumaHorario_2 >= sumaHorarioDisponible_1) {
                                    return [h[0], query.ocupado[0][0]]
                                }
                                if (sumaHorario_1 <= sumaHorarioDisponible_2) {
                                    return [query.ocupado[0][1], h[1]]
                                }
                                else {
                                    return h
                                }
                            }
                            else {
                                return h
                            }
                        })
                        let disponibleEditado = calendario.disponible.map(h => {
                            if (query.disponible) {
                                let sumaHorario_2 = h[1].substring(0, 2) + h[1].substring(3, 5) + h[1].substring(6, 8)
                                let sumaHorarioOcupado_1 = query.disponible[0][0].substring(0, 2) + query.disponible[0][0].substring(3, 5) + query.disponible[0][0].substring(6, 8)

                                let sumaHorario_1 = h[0].substring(0, 2) + h[0].substring(3, 5) + h[0].substring(6, 8)
                                let sumaHorarioOcupado_2 = query.disponible[0][1].substring(0, 2) + query.disponible[0][1].substring(3, 5) + query.disponible[0][1].substring(6, 8)

                                console.log("sumaHorario_1", sumaHorario_1)
                                if (sumaHorario_2 >= sumaHorarioOcupado_1) {
                                    return [h[0], query.disponible[0][0]]
                                }
                                if (sumaHorario_1 <= sumaHorarioOcupado_2) {
                                    return [query.disponible[0][1], h[1]]
                                }
                                else {
                                    return h
                                }
                            }
                            else {
                                return h
                            }
                        })
                        console.log("disponibleEditado", disponibleEditado)
                        console.log("ocupadoEditado", ocupadoEditado)

                        profesor.set({
                            ...profesor,
                            calendario: [
                                {
                                    fecha: query.fecha,
                                    disponible: [...disponibleEditado, query.disponible[0]],
                                    ocupado: [...ocupadoEditado, query.ocupado ? query.ocupado[0] : null],
                                }
                            ]
                        })
                        let calendarioEditado = await profesor.save()
                        res.send(calendarioEditado)
                    }
                }
                else {
                    profesor.set({
                        ...profesor,
                        calendario: [
                            ...profesor.calendario,
                            {
                                fecha: query.fecha,
                                disponible: query.disponible,
                                ocupado: query.ocupado,
                            }
                        ]
                    })
                    let calendarioEditado = await profesor.save()
                    res.send(calendarioEditado)
                }
            }
            else {
                profesor.set({
                    ...profesor,
                    calendario: [
                        {
                            fecha: query.fecha,
                            disponible: query.disponible ? query.disponible : null,
                            ocupado: query.ocupado,
                        }
                    ]
                })
                let calendarioEditado = await profesor.save()
                res.send(calendarioEditado)
            }
        }
    }
    catch (error) {
        res.send(error)
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
                    if (calendario.disponible && calendario.ocupado) {
                        let ocupadoEditado = calendario.ocupado.map(h => {
                            if (query.disponible) {
                                //10 - 7
                                if (h[1].substring(0, 2) > query.disponible[0][0].substring(0, 2)) {
                                    return [h[0], query.disponible[0][0]]
                                }
                                //15 - 17
                                if (h[0].substring(0, 2) < query.disponible[0][1].substring(0, 2)) {
                                    return [query.disponible[0][1], h[1]]
                                }
                                else {
                                    return h
                                }
                            }
                            else {
                                return h
                            }
                        })
                        let disponibleEditado = calendario.disponible.map(h => {
                            if (query.ocupado) {
                                //15 - 16
                                if (h[1].substring(0, 2) > query.ocupado[0][0].substring(0, 2)) {
                                    return [h[0], query.ocupado[0][0]]
                                }
                                //5 - 7
                                if (h[0].substring(0, 2) < query.ocupado[0][1].substring(0, 2)) {
                                    return [query.ocupado[0][1], h[1]]
                                }
                                else {
                                    return h
                                }
                            }
                            else {
                                return h
                            }
                        })

                        let calendarioEditado = {
                            fecha: query.fecha,
                            disponible: [...disponibleEditado, query.disponible],
                            ocupado: [...ocupadoEditado, query.ocupado ? query.ocupado[0] : null],
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
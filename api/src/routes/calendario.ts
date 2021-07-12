import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
import { isNullishCoalesce } from 'typescript';
import { CalendarioResponse, Horario, ArrayDePares } from '../../../interfaces';
import nuevosHorarios from './nuevosHorarios';
import editCalendar from './editCalendar';
const router = Router()
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

                    if (query.disponible) {
                        let calendarioEditado = {
                            email: query.email,
                            fecha: query.fecha,
                            disponible: calendario.disponible ? nuevosHorarios([...calendario.disponible, query.disponible[0]]) : nuevosHorarios(query.disponible),
                            ocupado: calendario.ocupado ? editCalendar(calendario.ocupado, query) : null,
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
                            disponible: calendario.disponible ? editCalendar(calendario.disponible, query) : null ,
                            ocupado: calendario.ocupado ? nuevosHorarios([...calendario.ocupado, query.ocupado[0]]) : nuevosHorarios(query.ocupado)  ,
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



// // TodasLasSemanas lo puede mandar el front si el profesor pone ''tengo disponibles los lunes de 14 a 18''
// interface TodasLasSemanas {
//     email: string,
//     dia: {
//         nombre: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo',
//     },
//     disponible: arrayDePares,
// }

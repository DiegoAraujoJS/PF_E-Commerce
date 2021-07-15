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

    const query_disponible_1: string = query.disponible[0][0].substring(0, 2) + query.disponible[0][0].substring(3, 5) + query.disponible[0][0].substring(6, 8)
    const query_disponible_2: string = query.disponible[0][1].substring(0, 2) + query.disponible[0][1].substring(3, 5) + query.disponible[0][1].substring(6, 8)
    const query_ocupado_1: string = query.ocupado && query.ocupado[0][0].substring(0, 2) + query.ocupado[0][0].substring(3, 5) + query.ocupado[0][0].substring(6, 8)
    const query_ocupado_2: string = query.ocupado && query.ocupado[0][1].substring(0, 2) + query.ocupado[0][1].substring(3, 5) + query.ocupado[0][1].substring(6, 8)

    if(query.disponible && query_disponible_1 < "0" && query_disponible_1 > "240000"  || query_disponible_2 < "0" && query_disponible_2 > "240000" || query_disponible_2 < query_disponible_1) return res.send("El horario disponible es incorrecto")
    if(query.ocupado && query_ocupado_1 < "0" && query_ocupado_1 > "240000"  || query_disponible_2 < "0" && query_ocupado_2 > "240000" || query_ocupado_2 < query_disponible_1) return res.send("El horario ocupado es incorrecto")
    if(query.disponible && query.ocupado && query_ocupado_1 >= query_disponible_1 && query_ocupado_1 <=  query_disponible_2 || query_disponible_1 >= query_disponible_1 && query_disponible_1 <= query_ocupado_2) return res.send("Los horarios disponibles y ocupados entran en conflicto entre si")

    try {
        if ( query.disponible && query.disponible[0][0].substring(0,2) < "00" || query.disponible[0][1].substring(0,2) > "24") return res.send("El horario disponible es incorrecto")

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
                        disponible: calendario.disponible ? query.disponible ? nuevosHorarios([...calendario.disponible, query.disponible[0]], query.ocupado && query.ocupado[0] ) : calendario.disponible : null,
                        ocupado: calendario.ocupado ? query.ocupado ? nuevosHorarios([...calendario.ocupado, query.ocupado[0]], query.disponible[0] ) : calendario.ocupado : null,
                    }
         
                    let nuevoDisponible = query.ocupado ? editCalendar(nuevaFecha.disponible, query.ocupado[0]) : nuevaFecha.disponible;
                   
                    let nuevoOcupado =  query.disponible ? editCalendar(nuevaFecha.ocupado, query.disponible[0]) : nuevaFecha.ocupado;
                      
                    let resultado = {
                        email: query.email,
                        fecha: query.fecha,
                        disponible: nuevoDisponible,
                        ocupado: nuevoOcupado,
                    }

                    let nuevoCalendario = profesor.calendario.map((e, i) => i === indice ? resultado : e)

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
                if (profesor.calendario) {
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
                            ocupado: calendario.ocupado ? editCalendar(calendario.ocupado, query.disponible[0]) : null,
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
                            disponible: calendario.disponible ? editCalendar(calendario.disponible, query.ocupado[0]) : null ,
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

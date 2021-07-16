import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
import { isNullishCoalesce } from 'typescript';
import { CalendarioResponse, Horario, ArrayDePares, Role } from '../../../interfaces';
import nuevosHorarios from './nuevosHorarios';
import editCalendar from './editCalendar';
import validateToken from '../utils/validateToken';
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

interface MiddlewareRequest extends Request {
    data: {mail: string, role: number};
}

router.post('/add', validateToken, async (req: MiddlewareRequest, res: Response) => {
    let query: Horario = req.body
    console.log("Query original", query)

    if (req.data.role !== 2 && req.body.email != req.data.mail) {
        return res.status(400).send('You are not authorized.')
    }

    const query_disponible_1: string = query.disponible[0][0].substring(0, 2) + query.disponible[0][0].substring(3, 5) + query.disponible[0][0].substring(6, 8)
    const query_disponible_2: string = query.disponible[0][1].substring(0, 2) + query.disponible[0][1].substring(3, 5) + query.disponible[0][1].substring(6, 8)
    const query_ocupado_1: string = query.ocupado && query.ocupado[0][0].substring(0, 2) + query.ocupado[0][0].substring(3, 5) + query.ocupado[0][0].substring(6, 8)
    const query_ocupado_2: string = query.ocupado && query.ocupado[0][1].substring(0, 2) + query.ocupado[0][1].substring(3, 5) + query.ocupado[0][1].substring(6, 8)

    if(query.disponible && query_disponible_1 < "0" && query_disponible_1 > "240000"  || query_disponible_2 < "0" && query_disponible_2 > "240000" || query_disponible_2 < query_disponible_1) return res.send("El horario disponible es incorrecto")
    if(query.ocupado && query_ocupado_1 < "0" && query_ocupado_1 > "240000"  || query_disponible_2 < "0" && query_ocupado_2 > "240000" || query_ocupado_2 < query_disponible_1) return res.send("El horario ocupado es incorrecto")
    if(query.disponible && query.ocupado && query_ocupado_1 >= query_disponible_1 && query_ocupado_1 <=  query_disponible_2 || query_disponible_1 >= query_disponible_1 && query_disponible_1 <= query_ocupado_2) return res.send("Los horarios disponibles y ocupados entran en conflicto entre si")
console.log("Punto 1")
    try {
        if ( query.disponible && query.disponible[0][0].substring(0,2) < "00" || query.disponible[0][1].substring(0,2) > "24") return res.send("El horario disponible es incorrecto")
        console.log("Punto 2")
        let profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
           
        })

        if (profesor) {
            console.log("Punto 3")
            if (profesor.calendario) {
                console.log("Profesor", profesor.calendario)
                console.log("Query", query)
                console.log("Punto 3.55")
                let indice = profesor.calendario.findIndex(element => element.fecha.anio == query.fecha.anio && element.fecha.mes == query.fecha.mes && element.fecha.dia == query.fecha.dia)
                console.log("indi", indice)
                let calendario = profesor.calendario[indice]
                console.log("Calendario", calendario)
                if (calendario) {
                    console.log("Punto 4.5")
                    let nuevaFecha = {
                        disponible: calendario.disponible ? query.disponible ? nuevosHorarios([...calendario.disponible, query.disponible[0]], query.ocupado && query.ocupado[0] ) : calendario.disponible : null,
                        ocupado: calendario.ocupado ? query.ocupado ? nuevosHorarios([...calendario.ocupado, query.ocupado[0]], query.disponible[0] ) : calendario.ocupado : null,
                    }
                    console.log(nuevaFecha)
                    console.log("Punto 5.5")
         
                    let nuevoDisponible = query.ocupado ? editCalendar(nuevaFecha.disponible, query.ocupado[0]) : nuevaFecha.disponible;
                    console.log(nuevaFecha.ocupado, query.disponible[0])
                    console.log(query.disponible)
                    console.log("Punto 6.5")
                    
                    let nuevoOcupado =  query.disponible && nuevaFecha.ocupado ? editCalendar(nuevaFecha.ocupado, query.disponible[0]) : nuevaFecha.ocupado;
                    console.log("Punto 7.5")
                    let resultado = {
                        email: query.email,
                        fecha: query.fecha,
                        disponible: nuevoDisponible,
                        ocupado: nuevoOcupado,
                    }
                    console.log("Punto 8.5")
                    let nuevoCalendario = profesor.calendario.map((e, i) => i === indice ? resultado : e)
                    profesor.set({
                        ...profesor,
                        calendario: nuevoCalendario
                    })
                    let calendarioEditado = await profesor.save()
                    console.log("Punto 4")
                    res.send(calendarioEditado)

                }
                else {
                    console.log("Punto 5")
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
                console.log("Punto 6")
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
        console.log("Punto 7")
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


router.put('/edit', validateToken, async (req: MiddlewareRequest, res: Response) => {
    let query: Horario = req.body

    if (req.data.role !== 2 && req.body.email != req.data.mail) {
             return res.status(400).send('You are not authorized.')
    }

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

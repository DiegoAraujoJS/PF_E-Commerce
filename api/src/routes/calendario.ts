import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
import { isNullishCoalesce } from 'typescript';
import { CalendarioResponse, Horario, ArrayDePares, Role, Disponible, Ocupado } from '../../../interfaces';
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
    let query: Disponible = req.body

    if (req.data.role !== 2 && req.body.email != req.data.mail) {
        return res.status(400).send('You are not authorized.')
    }

    const query_disponible_1: string = query.disponible[0][0].substring(0, 2) + query.disponible[0][0].substring(3, 5) + query.disponible[0][0].substring(6, 8)
    const query_disponible_2: string = query.disponible[0][1].substring(0, 2) + query.disponible[0][1].substring(3, 5) + query.disponible[0][1].substring(6, 8)

    if(query.disponible && query_disponible_1 < "0" && query_disponible_1 > "240000"  || query_disponible_2 < "0" && query_disponible_2 > "240000" || query_disponible_2 < query_disponible_1) return res.send("El horario disponible es incorrecto")


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
                const indice = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                const calendario = profesor.calendario[indice]

                if (calendario) {

                    const resultado: Horario = nuevosHorarios(calendario, query)

                    const nuevoCalendario = profesor.calendario.map((e, i) => i === indice ? resultado : e)

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
                                ocupado: null
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
                            ocupado: null,
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
    let query: Ocupado = req.body

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
                    
                    if (query.ocupado) {
                        const calendarioEditado: Horario = nuevosHorarios(calendario, null, query)

                        const nuevoCalendario = profesor.calendario.map((fecha, i) => i === indice ? calendarioEditado : fecha)

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

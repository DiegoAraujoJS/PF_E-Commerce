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
//                 usuario: query.email
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
                usuario: query.email
            }
        })

        if (profesor) {
            if (profesor.calendario) {
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
                    usuario: usuario
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


// router.put('/edit', async (req: Request, res: Response) => {
//     let query: Horario = req.body
//     try {
//         let profesor = await Profesor.findOne({
//             where: {
//                 usuario: query.email
//             }
//         })

//         if (profesor) {
//             if (profesor.calendario) {
//                 // profesor.set({
//                 //     ...profesor,
//                 //     calendario: [
//                 //         ...profesor.calendario,
//                 //         {
//                 //             fecha: query.fecha,
//                 //             disponible: query.disponible,
//                 //             ocupado: query.ocupado,
//                 //         }
//                 //     ]
//                 // })
//                 // let calendarioEditado = await profesor.save()
//                 let fechas = profesor.calendario.find(element => {
//                     element.fecha.anio === query.fecha.anio &&
//                     element.fecha.mes === query.fecha.mes &&
//                     element.fecha.dia === query.fecha.dia
//                 })


//                 res.send(fechas)
//             }
//             else {
//                 profesor.set({
//                     ...profesor,
//                     calendario: [
//                         {
//                             fecha: query.fecha,
//                             disponible: query.disponible ? query.disponible : null,
//                             ocupado: query.ocupado,
//                         }
//                     ]
//                 })
//                 let calendarioEditado = await profesor.save()
//                 res.send(calendarioEditado)
//             }
//         }
//     }
//     catch (error) {
//         res.send(error)
//     }
// });

export default router
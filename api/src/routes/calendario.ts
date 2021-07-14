import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
import { isNullishCoalesce } from 'typescript';
import { CalendarioResponse, Horario, ArrayDePares, Fecha } from '../../../interfaces';
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
        let profesor: Profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
        })
      
        if (profesor) {
            if (profesor.calendario) {
                let indice :number = profesor.calendario?.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)
              
                let calendario:Horario = profesor.calendario[indice]
    
                if (calendario) {

                    let nuevaFecha : Fecha = {
                        email: query.email,
                        fecha: query.fecha,
                        disponible: calendario.disponible ? query.disponible ? nuevosHorarios([...calendario.disponible, query.disponible[0]]) : calendario.disponible : query.disponible,
                    }

                    let nuevoOcupado: ArrayDePares[] | string[][] = query.disponible && query.disponible[0] ? editCalendar(calendario.ocupado, query.disponible[0]) : calendario.ocupado;
                    
                    let resultadoAdd: Fecha = {
                        email: query.email,
                        fecha: query.fecha,
                        disponible: nuevaFecha.disponible,
                        ocupado: nuevoOcupado && nuevoOcupado.length > 0 ? nuevoOcupado : nuevaFecha.ocupado,
                    }           
    
                    let nuevoCalendario: Fecha[] = profesor.calendario?.map((e, i) => i === indice ? resultadoAdd : e)
               
                    profesor.set({
                        ...profesor,
                        calendario: nuevoCalendario
                    })
                    let calendarioEditado: Profesor = await profesor.save()

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
                            }
                        ]
                    })
                    let calendarioEditado : Profesor= await profesor.save()
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
                        }
                    ]
                })
                let calendarioEditado: Profesor = await profesor.save()
                return res.send(calendarioEditado)
            }
        }
    }
    catch (error) {
        console.log(error)
        return res.send("Ops! hubo un error")
    }
});


router.put('/edit', async (req: Request, res: Response) => {
    let query: Horario = req.body
    
    try {
        let profesor: Profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
        })

        if (profesor) {            
            if (profesor.calendario) {
                let indice:number = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                let calendario: Horario = profesor.calendario[indice]

                if (calendario) {
                        let nuevaFecha: Fecha = {
                            email: query.email,
                            fecha: query.fecha,                        
                            ocupado: calendario.ocupado ? query.ocupado ? nuevosHorarios([...calendario.ocupado, query.ocupado[0]]) : calendario.ocupado : query.ocupado
                        }
                        let nuevoDisponible: ArrayDePares[] | string[][] = query.ocupado && query.ocupado[0] ? editCalendar(calendario.disponible, query.ocupado[0]) : calendario.disponible ;

                        let resultadoEdit: Fecha = {
                            email: query.email,
                            fecha: query.fecha,                     
                            ocupado: nuevaFecha.ocupado,
                            disponible: nuevoDisponible && nuevoDisponible.length > 0 ? nuevoDisponible : calendario.disponible
                        }    
                       
                        let nuevoCalendario = profesor.calendario.map((fecha, i) => i === indice ? resultadoEdit : fecha)
                        

                        profesor.set({
                            ...profesor,
                            calendario: nuevoCalendario
                        })
                        let resultado = await profesor.save()
                        res.send(resultado)
                    
                }
                else {
                    profesor.set({
                        ...profesor,
                        calendario: [
                            ...profesor.calendario,
                            {
                                email: query.email,
                                fecha: query.fecha,
                                ocupado: query.ocupado                              
                            }
                        ]
                    })
                    let calendarioEditado : Profesor= await profesor.save()
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
                            ocupado: query.ocupado ? query.ocupado : null,
                        }
                    ]
                })
                let calendarioEditado: Profesor = await profesor.save()
                return res.send(calendarioEditado)
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



export default router



// // TodasLasSemanas lo puede mandar el front si el profesor pone ''tengo disponibles los lunes de 14 a 18''
// interface TodasLasSemanas {
//     email: string,
//     dia: {
//         nombre: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo',
//     },
//     disponible: arrayDePares,
// }

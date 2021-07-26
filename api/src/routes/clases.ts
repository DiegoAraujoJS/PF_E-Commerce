import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import Puntuacion from '../models/Puntuacion'
import { Op } from 'sequelize'
import { IUser, Time } from '../../../interfaces'
import User from '../models/Usuario'
import ClaseToIClase from '../utils/transformations/ClaseToIClase'
import BuildClaseToIClase from '../utils/transformations/BuildClaseToIClase'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
    const { busqueda } = req.query

    try {
        let clases: any[] = []
        let profesores: any[] = []
        if (busqueda) {
            let palabrasSeparadas = (busqueda as string).split(" ");
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'grado')
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'año')
            palabrasSeparadas = palabrasSeparadas.filter(x => x !== 'anio')

            for (let x of palabrasSeparadas) {
                try {
                    const c = await Clase.findAll({
                        include: [{ model: Profesor }, {model: User}],
                        where: {
                            [Op.or]: [{
                                materia: {
                                    [Op.iLike]: `%${x.normalize("NFD").replace(/\p{Diacritic}/gu, "")}%`.replace("\'", '')
                                }
                            },
                            {
                                nivel: {
                                    [Op.iLike]: `%${x}%`.replace("\'", '')
                                }
                            },
                            {
                                grado: {
                                    [Op.iLike]: `%${x}%`.replace("\'", '')
                                }
                            },
                            ]
                        }
                    })
                    clases.push(...c)
                    const p = await User.findAll({
                        include: [{model: Profesor, required: true}],
                        where: {
                            city: {
                                [Op.iLike]: `%${x}%`.replace("\'", '')
                            }
                        }
                    })
                    
                    profesores.push(...p)
                }

                catch (err) {
                    console.log(err)
                }
            }
        }

        if (clases.length > 0 && profesores.length > 0) {
            const clasesResult = clases.flat().filter(c => profesores.map(p => p.User_mail).flat().includes(c.Profesor_mail)) 

            return res.send(clasesResult.map((clase: Clase) => ClaseToIClase(clase, profesores.find(p => p.User_mail===clase.Profesor_mail))))
        }
        else if (clases.length > 0) {
            return res.send(clases.map((clase: Clase) => ClaseToIClase(clase)))
        }
        else {
            const allClasses = await Clase.findAll({include: [{model: Profesor}, {model: User}]})
            const allClassesWithIClaseInterface = await Promise.all(allClasses.map(async (cl) => await BuildClaseToIClase(cl)))
            return res.send(allClassesWithIClaseInterface)
        }

    } catch (err) {
        res.send(err)
    }
})



router.get('/all/student/:mail', async (req: Request, res: Response) => {
    const clases = await Clase.findAll({
         include: [{
             model: Profesor,
             required: true
            },{model: User, required: false}],
            
         where: {
            [Op.or]: [
                { User_mail: req.params.mail },
                { Profesor_mail: req.params.mail }
              ]
         }
         })
    const usersOfProfessors = await Promise.all(clases.map(cl => User.findByPk(cl.Profesor_mail)))

    return res.send(clases.map((cl, i) => ClaseToIClase(cl, usersOfProfessors[i])))
})

router.get('/all/profesor/:mail', async (req: Request, res: Response) => {
    const clases = await Clase.findAll({
         include: [{
             model: Profesor,
             required: true
            }],
         
         where: {
            Profesor_mail: req.params.mail
         }
         })
    return res.send(clases)    
})



router.get('/all', async (req: Request, res: Response) => {
    try {
        const clases = await Clase.findAll({ include: [Profesor] })
        res.send(clases)
    }
    catch (error) {
        res.status(404).send("Ops! hubo un error")
    }
})


router.post('/add', async (req: Request, res: Response) => {
    const clase = req.body

    try {
        const crearClase = await Clase.create({
            ...clase,
            materia: req.body.materia.normalize("NFD").replace(/\p{Diacritic}/gu, "")
        })
        res.send(crearClase)
    }
    catch (error) {
        res.status(404).send(new Error('Mail no valido'))
    }
})


router.put('/edit', async (req: Request, res: Response) => {
    const { id, descripcion, materia, nivel, grado, puntuacion, precio } = req.body
    const claseEditada = {
        descripcion,
        materia,
        nivel,
        grado,
        puntuacion,
        precio
    }
    try {
        const clase: any = await Clase.findByPk(id);

        await clase.set(claseEditada);
        const claseCambiada = await clase.save();
        res.send(claseCambiada)
    }
    catch (error) {
        res.send(error)
    }
})


router.post('/delete', async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        await Clase.destroy({
            where: { id: id }
        }).then(e => res.send(`${e}`)).catch(err => res.send(err))
    }

    catch (error) {
        res.send(error)
    }
})

router.get('/:id', async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const clases = await Clase.findOne({ where: {id: id} })
        res.send(clases)
    }
    catch (error) {
        res.status(404).send("Ops! hubo un error")
    }
})

router.get('/student/:mail', async (req: Request, res: Response) => {
    try {
        const mail = req.params.mail
        const clases = await Clase.findAll({where: {
            User_mail: mail
        }, include: [{model: User}, {model: Profesor}]
        })
        const payload = await Promise.all(clases.map(async (cl) => await BuildClaseToIClase(cl)))
        return res.send(payload)
    }
    catch(err) {
        return res.status(400).send(err)
    }
})



export default router


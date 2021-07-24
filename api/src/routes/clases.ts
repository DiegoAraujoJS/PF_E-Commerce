import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import Puntuacion from '../models/Puntuacion'
import { Op } from 'sequelize'
import { Time } from '../../../interfaces'
import User from '../models/Usuario'
const router = Router()


router.get('/', async (req: Request, res: Response) => {
    const { busqueda } = req.query
    if (!busqueda) return res.status(400).send('Debes ingresar un input como \'busqueda\'')

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
                        include: [{ model: Profesor }],
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
                    const p = await Profesor.findAll({
                        include: [{ model: Clase }],
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
            var clasesResult = [];

            for (var i = 0; i < clases.flat().length; i++) {
                for (var j = 0; j < profesores.flat().length; j++) {
                    if (clases.flat()[i].Profesor_mail === profesores.flat()[j].User_mail) {
                        clasesResult.push(clases[i])
                    }
                }
            }

            let hash = {};
            let result = clasesResult.filter(o => hash[o.id] ? false : hash[o.id] = true)          

            return res.send(result)
        }
        else if (clases.length > 0) {
            let hash = {};
            let result = clases.filter(o => hash[o.id] ? false : hash[o.id] = true)    
            return res.send(result)
        }
        else {
            let resultClases = profesores.map(e => {
                return e.clases.map(c => {
                    return c = {
                        ...c.dataValues, profesor: {
                            score: e.score,
                            User_mail: e.User_mail,
                            name: e.name,
                            lastName: e.lasName,
                            city: e.city,
                            foto: e.foto,
                            description: e.description
                        }
                    }
                })

            })
            let clases = resultClases.flat()
            let hash = {};
            let result = clases.filter(o => hash[o.id] ? false : hash[o.id] = true)    
            return res.send(result)
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
            }],
         
         where: {
            User_mail: req.params.mail
         }
         })
    return res.send(clases)
    const response = clases.map(function (clase){
        const claseTransform = {
            ...clase,
        }
        return claseTransform
    })
    
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
    const response = clases.map(function (clase){
        const claseTransform = {
            ...clase,
        }
        return claseTransform
    })    
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



export default router


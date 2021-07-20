import Router, { Request, Response } from 'express'
import { ClasePorComprar, IClase } from '../../../interfaces';
import User from '../models/Usuario';

import { Time, Class, Profesor } from '../../../interfaces'
import Clase from '../models/Clase';


const router = Router()

router.get('/', async (req: Request, res:Response) => {
    const allStudentClasses = await Clase.findAll({
        include: {
            model: User,
            required: true
        }
    })
    return res.send(allStudentClasses)
})

router.post('/add', async (req: Request, res: Response) => {
    const publication: IClase = req.body

    try {
        const usuario = await User.findByPk(publication.User_mail)

        const crearClase = await Clase.create({
            ...publication,        
            materia: req.body.materia.normalize("NFD").replace(/\p{Diacritic}/gu, ""),
            city: usuario.city
        })
        res.send(crearClase)
    }
    catch (error) {
        res.status(404).send(new Error('Mail no valido'))
    }
})


export default router
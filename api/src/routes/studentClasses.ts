import Router, { Request, Response } from 'express'
import { ClasePorComprar } from '../../../interfaces';
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

export default router
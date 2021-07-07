import {Request, Response, Router} from 'express'
import Reclamo from '../models/Reclamo'
import User from '../models/Usuario'

const router = Router()

router.get('/', async (req:Request, res:Response) => {
    const reclamos = await Reclamo.findAll({
        include: [User]
    })
    
    res.send(reclamos)
})

export default router
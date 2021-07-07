import {Request, Response, Router} from 'express'
import Reclamo from '../models/Reclamo'
import User from '../models/Usuario'

const router = Router()

router.get('/', async (req:Request, res:Response) => {

    const reclamos = await Reclamo.findAll()
    
    let thisRet: object[] = []
    for (const reclamo of reclamos) {
        thisRet = [...thisRet, {reclamo: reclamo, admin: await User.findByPk(reclamo.Admin_email), denunciante: await User.findByPk(reclamo.Denunciante_email), denunciado:await User.findByPk(reclamo.Denunciado_email)}]
    }
    
    return res.send(thisRet)
})

export default router
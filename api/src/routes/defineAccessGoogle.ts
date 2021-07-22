import {JwtPayload, verify} from 'jsonwebtoken'
import {Router, Request, Response} from 'express'
import config from '../lib/config'
import validateToken from '../utils/validateToken'
import User from '../models/Usuario'
import { Console } from 'console'
const router = Router()

router.post('/', async (req: any , res: Response) => {
    console.log(req.body)
    const usuario = {
        mail: req.body.email,
        completedName: req.body.displayName,
        image: req.body.photoURL,
        role: 0
    }
    return res.send(usuario)
})

export default router
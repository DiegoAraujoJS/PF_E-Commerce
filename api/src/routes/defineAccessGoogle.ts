import { JwtPayload, verify } from 'jsonwebtoken'
import { Router, Request, Response } from 'express'
import config from '../lib/config'
import validateToken from '../utils/validateToken'
import User from '../models/Usuario'
import { Console } from 'console'
import axios from 'axios'
const router = Router()

router.post('/', async (req: any, res: Response) => {
    const usuarioRegistrado = await User.findOne({
        where: {
            mail: req.body.email
        }
    })
    if (usuarioRegistrado) {
        const login = await axios.post(`http://localhost:3001/api/login`, {
            mail: req.body.email,
            password: 'google'
        }, { withCredentials: true }) 
    }
    console.log(usuarioRegistrado)
    console.log(req.body)
    const usuario = {
        mail: req.body.email,
        completedName: req.body.displayName,
        image: req.body.photoURL,
        role: 0
    }
    // const registro = await axios.post('http://localhost:3001/api/session/register', userWithPassword, { withCredentials: true })

    // router.post('/register', async (req:Request, res:Response) => {
    //     const newUser: UserProps = {
    //         lastName: req.body.lastName,
    //         mail: req.body.mail,
    //         name: req.body.name,
    //         role: req.body.role,
    //         city: req.body.city,
    //     }
    //     if (newUser.lastName && newUser.name && newUser.mail && req.body.password){

    //         console.log(req.body.password)

    //         const [user, created] = await User.findOrCreate({
    //             where: {
    //                 mail: req.body.mail
    //             },
    //             defaults: {...newUser, password: hashPassword(req.body.password)}
    //         })

    //         if (!created) return res.status(400).send({type:ErrorType.ALREADY_EXISTS})
    //         return res.send(user)
    //     } else {
    //         return res.status(400).send({type: ErrorType.INCOMPLETE_INPUTS})
    //     }
    //     }
    // )


    // User.create()
    return res.send(usuario)
})

export default router
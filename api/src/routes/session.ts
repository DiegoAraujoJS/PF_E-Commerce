import { Router, Request, Response } from "express";
import User from "../models/Usuario";
import {UserProps, Role} from '../../../interfaces'
const router = Router()

type Users = UserProps[]

enum ErrorType {INCOMPLETE_INPUTS, ALREADY_EXISTS}

router.post('/register', async (req:Request, res:Response) => {
    const newUser: UserProps = {
        lastName: req.body.lastName,
        mail: req.body.mail,
        name: req.body.name,
        role: req.body.role
    }
    if (newUser.lastName && newUser.name && newUser.mail){

        const [user, created] = await User.findOrCreate({
            where: {
                mail: req.body.mail
            },
            defaults: {...newUser, password: req.body.password}
        })
    
        if (!created) return res.status(400).send({type:ErrorType.ALREADY_EXISTS})
        return res.send(user)
    } else {
        return res.status(400).send({type: ErrorType.INCOMPLETE_INPUTS})
    }
    }
)

router.post('/login', async (req:Request, res:Response) => {
    const user = await User.findByPk(req.body.mail)
    
    if (user?.password === req.body.password) {
        return res.status(200).send(user)
    } else {
        return res.status(400).send('usuario o contaseña incorrectos')
    }
})

router.get('/:user', async (req:Request, res:Response) => {
    console.log(req.params)
    const user: UserProps | null = await User.findByPk(req.params.user)
    if (user === undefined) {
        return res.send(undefined)
    }
    const rol=user?.role.toString()
    console.log(rol)
    return res.send(rol)
})


export default router
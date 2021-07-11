import { Router, Request, Response } from "express";
import User from "../models/Usuario";
import {UserProps, Role} from '../../../interfaces'
const router = Router()

type Users = UserProps[]

router.post('/register', async (req:Request, res:Response) => {
    const newUser: UserProps = {
        lastName: req.body.lastName,
        mail: req.body.mail,
        name: req.body.name,
        role: req.body.role
    }
    const [user, created] = await User.findOrCreate({
        where: {
            mail: req.body.mail
        },
        defaults: {...newUser, password: req.body.password}
    })

    if (!created) return res.status(400).send('the user already exists')
    return res.send(user)
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
    const user: UserProps | null = await User.findByPk(req.body.mail)
    if (user === undefined) {
        return res.send(undefined)
    }
    return res.send(user?.role)
})


export default router
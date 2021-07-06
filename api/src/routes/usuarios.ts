import {Request, Response, Router} from 'express'

import Usuario from './../models/Usuario'
const router = Router ()

function validateEmail(email: string) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

router.get('/', async (req: Request, res: Response) => {
    // const users = await User.findAll()
    const usuarios = await Usuario.findAll()
    res.send(usuarios)
})


router.post('/', async (req:Request, res:Response) => {
    const {email, nombre, apellido} = req.body
    if (email && nombre && apellido && validateEmail(email)) {
        try{
            const createdUser = await Usuario.create({
                ...req.body
            })
            res.send(createdUser)
        }
        catch (error) {
            res.send(error)
        }
    }
})


export default router;
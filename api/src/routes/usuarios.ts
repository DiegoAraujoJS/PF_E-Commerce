import { create } from 'domain';
import { Request, Response, Router } from 'express'
import { Op } from 'sequelize';
import { Role, UserProps } from '../../../interfaces';
import Usuario from './../models/Usuario'
const router = Router()

// Validar email
function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Devolver usuarios
router.get('/', async (req: Request, res: Response) => {
    try {
        const usuarios = await Usuario.findAll()
        res.send(usuarios)
    } catch (error) {
        res.send(error);
    }
})

router.get('/admin', async (req: Request, res: Response) => {
    try {
        const admins = await Usuario.findAll({
            where: {
            role:  Role.ADMIN  
            }
        })
        console.log(admins)
        res.send(admins)
    }
    catch (error) {
        console.log(error)
    }
})

router.get('/:mail', async (req: Request, res: Response) => {
    const { mail } = req.params
    console.log(mail)
    try {
        const usuario = await Usuario.findByPk(mail)
        res.send(usuario)
    }
    catch (error) {
        console.log(error)
    }
})



export default router;

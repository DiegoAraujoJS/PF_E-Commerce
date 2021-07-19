import { create } from 'domain';
import { Request, Response, Router } from 'express'
import { UserProps } from '../../../interfaces';
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
        const usuarios = await Usuario.findAll({
            attributes: ['mail', 'name', 'lastName']
        })
        res.send(usuarios)
    } catch (error) {
        res.send(error);
    }
})


export default router;

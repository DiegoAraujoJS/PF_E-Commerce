import { create } from 'domain';
import { Request, Response, Router } from 'express'
import Usuario from './../models/Usuario'
const router = Router()

interface UsarioInterface {
    mail: string
    nombre: string
    apellido: string
}

// Validar email
function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Devolver usuarios
router.get('/', async (req: Request, res: Response) => {
    const usuarios = await Usuario.findAll({
        attributes: ['mail', 'nombre', 'apellido']
    })
    res.send(usuarios)
})

// Registrar usuarios
router.post('/', async (req: Request, res: Response) => {
    try {
        const { mail, nombre, apellido } = req.body
        if (mail && nombre && apellido && validateEmail(mail)) {
            let existe = await Usuario.findByPk(mail)
            if (existe) return res.send(`El usuario ${mail} ya está registrado`)
            const createdUser = await Usuario.create(req.body);
            let usuario: UsarioInterface = {
                mail: createdUser.mail,
                nombre: createdUser.nombre,
                apellido: createdUser.apellido
            }
            return res.send(usuario)
        }
    }
    catch (error) {
        res.send(error)
    }
})
export default router;
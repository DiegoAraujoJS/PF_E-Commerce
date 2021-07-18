import Router, { Request, Response } from 'express'
import { ClasePorComprar } from '../../../interfaces';
import User from '../models/Usuario';

const router = Router()

router.post('/:user', async function (req: Request, res: Response) {
    const { user } = req.params
    const clase: ClasePorComprar = req.body
    try {
        const usuario = await User.findByPk(user)
        if (usuario.carrito) {
            const existe = usuario.carrito.some(e => e.id === clase.id)
            if (!existe) {
                usuario.set({
                    ...usuario,
                    carrito: usuario.carrito[0] ? [...usuario.carrito, clase] : [clase]
                })
                const result = await usuario.save()
                res.send(result)
            }
            else {
                res.send("Esa clase ya esta en tu lista")
            }
        } else {
            usuario.set({
                ...usuario,
                carrito: [clase]
            })
            const result = await usuario.save()
            res.send(result)
        }
    }
    catch (error) {
        console.log(error)
    }
})

export default router
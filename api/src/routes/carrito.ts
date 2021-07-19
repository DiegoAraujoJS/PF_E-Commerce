import Router, { Request, Response } from 'express'
import { ClasePorComprar  } from '../../../interfaces';
import User from '../models/Usuario';

import {Time, Class, Profesor} from '../../../interfaces'

const router = Router()

router.post('/:user', async function (req: Request, res: Response) {
    const { user } = req.params
    const clase: Class = req.body
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


router.get('/all/:user', async function (req: Request, res: Response) {
    const { user } = req.params
    try {
        const usuario = await User.findByPk(user)
        if (usuario) {
            res.send(usuario.carrito)
        }
        else {
            res.send("Su lista de clases esta vacia")
        }
    }
    catch (error) {
        console.log(error)
    }
})


router.get('/:user/:id', async function (req: Request, res: Response) {
    const { user, id } = req.params
    try {
        const usuario = await User.findByPk(user)
        if (usuario.carrito) {
            const clase: Class = usuario.carrito.find(e => e.id.toString() === id)
            if (clase) {
                res.send(clase)
            }
            else {
                res.send("Esa clase ya esta en tu lista")
            }
        }
    }
    catch (error) {
        console.log(error)
    }
})


export default router
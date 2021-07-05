import {Request, Response, Router} from 'express'
import Usuario from './../models/Usuario'
const router = Router ()

router.get('/', async (req: Request, res: Response) => {
    // const users = await User.findAll()
    const formatoProfesor = {
        nombre: 'Rodrigo',
        apellido: 'Callardo', 
        foto: 'https:///',
        descripcion: 'hace cuatro años que..',
        ciudad: 'Buenos Aires'
    }
    const clase = {
        nombre: 'Clase de matemática quinto año',
        puntuacion: 4.3,
        grado: 'quinto año',
        nivel: 'secundaria',
        materia: 'matematica', 
        descripcion: 'en esta clase veremos...'
    }
    
    res.send([clase,formatoProfesor])
})


router.post('/', async (req:Request, res:Response) => {
    const userInfo = req.body
    try{
        const createdUser = await Usuario.create(userInfo)
        res.send(createdUser)
    }
    catch (error) {
        res.send(error)
    }
})


export default router;
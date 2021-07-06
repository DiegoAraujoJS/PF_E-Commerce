import {Request, Response, Router} from 'express'
import User from './../models/User'
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
        materia: 'matematica'
    }
    
    res.send([clase,formatoProfesor])
})
router.post('/', async (req:Request, res:Response) => {
    const userInfo = req.body
    try{
        const createdUser = await User.create(userInfo)
        res.send(createdUser)
    }
    catch (error) {
        res.send(error)
    }
})


export default router;
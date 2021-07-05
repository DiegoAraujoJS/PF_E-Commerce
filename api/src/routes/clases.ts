import {Request, Response, Router} from 'express'
import Clase from './../models/Clase'
const router = Router ()


router.get('/', async (req: Request, res: Response) => {
    const clases = await Clase.findAll()
    res.send(clases)
})

router.post('/add', async (req:Request, res:Response) => {
    const clase = req.body
    try{
        const crearClase = await Clase.create(clase)        
        res.send(crearClase)
    }
    catch (error) {
        res.send(error)
    }
})


export default router;
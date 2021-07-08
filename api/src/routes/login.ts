import {Request, Response, Router} from 'express'
import Usuario from './../models/Usuario'
const router = Router ()

router.get('/true', async (req: Request, res: Response) => {
    // const users = await User.findAll()
    const response = {
        rejected: true
    }
    res.send(response)
})
router.get('/false', async (req: Request, res: Response) => {
    const users = await Usuario.findAll()
    const response = {
        rejected: false
    }
    res.send(response)
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
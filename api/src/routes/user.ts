import {Request, Response, Router} from 'express'
import User from './../models/User'
const router = Router ()

router.get('/', async (req: Request, res: Response) => {
    const users = await User.findAll()
    res.send(users)
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
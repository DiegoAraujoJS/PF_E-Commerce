import {JwtPayload, verify} from 'jsonwebtoken'
import {Router, Request, Response} from 'express'
import config from '../lib/config'
const router = Router()

interface MiddlewareRequest extends Request {
    data: JwtPayload | undefined;
}

router.post('/', validateToken, (req: any , res: Response) => {
    return res.send(req.data)
})


function validateToken(req: MiddlewareRequest, res: Response, next: () => void){
    const token = req.headers['authorization']
    if (!token) return res.status(400).send('incorrect token')
    verify(token, config.secret, (err, data) => {
        if (err) return res.status(400).send('incorrect token')
        
        req.data = data
        next()
    })
}

export default router
import {verify} from 'jsonwebtoken'
import {Router, Request, Response} from 'express'

const router = Router()

interface MiddlewareRequest extends Request {
    data: object;
    session: {token:string}
}

router.post('/', validateToken, (req: any , res: Response) => {
    
    return res.send(req.data)
})


function validateToken(req: MiddlewareRequest, res: Response, next){
    const token = req.headers['authorization'].slice(1, req.headers['authorization'].length - 1)
    verify(token, process.env.SECRET, (err, data) => {
        if (err) return res.status(400).send('incorrect token')
        req.data = data
        next()
    })
}

export default router
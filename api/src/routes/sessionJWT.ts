import { Router, Request, Response } from "express"
import {JwtHeader, sign, verify} from 'jsonwebtoken'
import { Jwt } from "jsonwebtoken"
const router = Router()


router.get('/', (req: Request, res:Response) => {
    return res.send('web tokens')

})

router.get('/private/:mail', validateToken, (req, res:Response) => {

    const {mail} = req.params
    

    return res.send({
        user: req['user'],
        payload:{
            name: 'Mauro',
            lastName: 'Leonel',
            mail: "mauroleonel@gmail.com", 
            role: 1
        }
    })
})

router.post('/auth', (req:Request, res:Response) => {
    const {username, password} = req.body;

    const user = {username: username}

    const accessToken = generateAccessToken(user);

    res.header('authorization', accessToken).json({
        message: 'user authenticated', 
        token: accessToken
    })
})

function generateAccessToken(user: object) {
    console.log(process.env.SECRET)
    return sign(user, process.env.SECRET, {expiresIn: '5m'})
}

// que token tiene el client?

function validateToken(req, res:Response, next): any {

    const accessToken = req.headers['authorization'] || req.query.accessToken.toString()

    if (!accessToken) return res.send('access denied') 
    console.log(process.env.SECRET)
    verify(accessToken, process.env.SECRET, (err, user) => {
        if (err) {
            return res.send('access denied token incorrect')
        }
        req.user = user 
        next()
    })
} 

export default router



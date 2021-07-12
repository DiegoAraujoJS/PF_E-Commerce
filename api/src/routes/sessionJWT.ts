import { Router, Request, Response } from "express"
import {JwtHeader, sign, verify} from 'jsonwebtoken'
import { Jwt } from "jsonwebtoken"
import { CalendarioResponse } from "../../../interfaces"
import Alumno from "../models/Alumno"
import User from "../models/Usuario"
import session from 'express-session'
var LocalStorage = require('node-localstorage').LocalStorage;
let localStorage = new LocalStorage('./scratch');
 
 
 localStorage.setItem('myFirstKey', 'myFirstValue');
const router = Router()


router.get('/', (req: Request, res:Response) => {
    return res.send('web tokens')
})

router.get('/auth', validateToken, (req: any, res:Response) => {

    console.log(req.user)

    return res.send({
        user: req.user
        
    })
})

router.post('/login', (req:Request, res:Response) => {
    const {mail, password} = req.body;

    const user = {mail: mail}

    const accessToken = generateAccessToken(user);

    res.header('authorization', accessToken).json({
        message: 'user authenticated', 
        token: accessToken
    })
})

function generateAccessToken(user: object) {
    console.log(process.env.SECRET)
    return sign(user, process.env.SECRET)
}

// que token tiene el client?

function validateToken(req, res:Response, next): any {

    const accessToken = req.headers['authorization'] || req.query.accessToken

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

router.get('/logout', (req: any, res: Response) => {
    console.log(localStorage)
    if (localStorage.getItem('user') ) {
        localStorage.setItem('user', null) 
        return res.send('Succesfully logged out.')
    } else {
        return res.status(400).send('You are not logged in!')
    }
})


export default router
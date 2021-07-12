import { Router, Request, Response } from "express"
import {JwtHeader, sign, verify} from 'jsonwebtoken'
import { Jwt } from "jsonwebtoken"
import { CalendarioResponse } from "../../../interfaces"
import Alumno from "../models/Alumno"
import Profesor from "../models/Profesor"
const router = Router()

const data: CalendarioResponse = [{
    disponible: [['12:00:00', '14:00:00']],
    email: 'diegoaraujo@gmail.com',
    fecha: {
        anio: 2021,
        dia: 8, 
        mes: 7
    }
 }]

router.post('/calendar/:mail', async (req:Request, res:Response) => {

    const user = {mail: req.params.mail}

    const token = generateAccessToken(user)

    return res.header('authorization', token).json({
        message: 'user authenticated',
        token: token
    })
    
})

function generateAccessToken(user) {
    return sign (user, process.env.SECRET)
}

router.get('/calendar/:mail', authenticateToken, async (req:Request, res:Response) => {
    const user = await Profesor.findByPk(req.params.mail)
    const calendar: CalendarioResponse = user.calendario

    return res.send('llegaa')
})

function authenticateToken(req: Request, res: Response, next) {
    const token = req.headers['authorization']
    if (!token) return res.status(401).send('access denied')

    verify(token, process.env.SECRET, (err, user) => {
        if (err) return res.status(403).send('incorrect token')
        next ();
    })

}






































export default router

// router.get('/', (req: Request, res:Response) => {
//     return res.send('web tokens')

// })

// router.get('/private/:mail', validateToken, (req, res:Response) => {

//     const {mail} = req.params
    

//     return res.send({
//         user: req['user'],
//         payload:{
//             name: 'Mauro',
//             lastName: 'Leonel',
//             mail: "mauroleonel@gmail.com", 
//             role: 1
//         }
//     })
// })

// router.post('/auth', (req:Request, res:Response) => {
//     const {username, password} = req.body;

//     const user = {username: username}

//     const accessToken = generateAccessToken(user);

//     res.header('authorization', accessToken).json({
//         message: 'user authenticated', 
//         token: accessToken
//     })
// })

// function generateAccessToken(user: object) {
//     console.log(process.env.SECRET)
//     return sign(user, process.env.SECRET, {expiresIn: '5m'})
// }

// // que token tiene el client?

// function validateToken(req, res:Response, next): any {

//     const accessToken = req.headers['authorization'] || req.query.accessToken.toString()

//     if (!accessToken) return res.send('access denied') 
//     console.log(process.env.SECRET)
//     verify(accessToken, process.env.SECRET, (err, user) => {
//         if (err) {
//             return res.send('access denied token incorrect')
//         }
//         req.user = user 
//         next()
//     })
// } 




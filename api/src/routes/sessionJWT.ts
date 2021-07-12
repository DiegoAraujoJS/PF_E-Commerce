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

// router.post('/login', (req:any, res) => {

//     //find user in the ddbb
//     const email = req.body.mail;
//     const password = req.body.password;

//     const user = {email, password}

//     //login, set user and empty cart in session
//     req.session.user = user;
//     req.session.cart = {total: 0, items: []}

//     console.log(req.session)

//     return res.status(200).send(user);
// })
// router.post('/register', (req:any, res) => {
//     // if (req.session.user) return res.status(403).send('already logged in');

//     //check duplicate email
//     const email = req.body.email;
//     const password = req.body.password;
    

//     //generate
//     const user = {email, password}

//     //add new user to the ddb

//     //auto-login, set user and empty cart in session
//     req.session.user = user;
//     req.session.cart = {total: 0, items: []}

//     return res.status(200).send(user);
// })

// router.post('/logout', (req:any, res) => {
//     console.log(req.session)
//     if (!req.session.user) return res.status(403).send('not logged in');
//     req.session.user = null;
//     return res.status(200).send('successfully logged out');
// })





// router.post('/login', async (req: Request | any, res:Response) => {
//     //authentication
//     try {
//         const userDB = await User.findByPk(req.body.mail)
//         const user = {mail: req.body.mail, role: userDB.role}

//         const token = generateAccessToken(user)

//         console.log(token)

//         return res.header('authorization', token).json({
//             message: 'user authenticated',
//             token: token
//         })
//     } catch (err) {
//         return res.status(400).send('Probably user not found.')
//     }
// })

// function generateAccessToken(user) {
//     return sign (user, process.env.SECRET)
// }

// router.post('/auth', authenticateToken, async (req: any, res:Response) => {
//     const userData = {mail: req.session.user, role: req.session.role}
//     // que informacion necesita para navegar en la aplicacion?
//     // que rol tiene. Cual es su mail. 

//     return res.send(userData)
// })

// function authenticateToken(req: any, res: Response, next) {
//     const token = req.headers['authorization']
//     console.log(token)
//     if (!token) return res.status(401).send('Access denied')

//     verify(token, process.env.SECRET, (err, user) => {
//         if (err) return res.status(403).send('Incorrect token.')
//         req.session.user = user
//         console.log(req.session)
//         next();
//     })
// }

// router.get('/logout', (req: any, res: Response) => {
//     console.log(req.session.user)
//     if (req.session.user) {
//         req.session.user = null;
//         return res.send('Succesfully logged out.')
//     } else {
//         return res.status(400).send('You are not logged in!')
//     }
// })






router.get('/', (req: Request, res:Response) => {
    return res.send('web tokens')

})

router.get('/auth', validateToken, (req, res:Response) => {

    return res.send({
        user: req.headers['user'],
        payload:{
            name: 'Mauro',
            lastName: 'Leonel',
            mail: "mauroleonel@gmail.com", 
            role: 1
        }
    })
})


router.post('/login', (req:Request, res:Response) => {
    const {mail, password} = req.body;

    const user = {username: mail}

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
        localStorage.setItem('user', user) 
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
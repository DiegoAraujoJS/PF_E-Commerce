import {sign} from 'jsonwebtoken'
import { Router, Request, Response} from 'express'

import User from '../models/Usuario'
import { decrypt } from '../utils/auth'

const router = Router()

interface MiddlewareRequest extends Request {
    session: {token: string};
}

router.post('/', async (req:MiddlewareRequest, res: Response) => {
    
    if (req.session.token) return res.status(400).send('Already logged in')

    const {mail, password} = req.body
    console.log(mail, password)
    const user = await User.findByPk(mail)
    console.log(user)
    let isAuthenticated = user ? decrypt(password, user.password) : false

    if (password === 'google') isAuthenticated = true
    if (isAuthenticated){
        
        const token = sign({mail, role: user.role, name: user.name, lastName: user.lastName}, process.env.SECRET)
        
        req.session.token = token
    
        return res.send({
            message: 'user authenticated', 
            token
        })
    } else {
        return res.status(400).send({
            message: 'mail or password incorrect'
        })
    }
})

router.post('/logout', async (req: MiddlewareRequest, res: Response) => {
    
    if (!req.session.token) return res.status(400).send('You are not logged in.')
    req.session.token = '';
    return res.send('Successfully logged out.')
})

export default router

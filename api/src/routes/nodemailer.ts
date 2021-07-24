import nodemailer from 'nodemailer'
import {Router, Request, Response} from 'express'
import config from '../lib/config'
const router = Router()

router.post('/', async (req:Request, res:Response) => {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.gmail_user,
            pass: config.gmail_password
        }
    })

    let mailOptions = {
        from: config.gmail_user,
        to: '',
        subject: 'nodemailer testing',
        text: 'works'
    }
    
    const mail = await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('error', err)
        } else {
            console.log('sent', data)
        }
    })
    return res.send(mail)

})

export default router
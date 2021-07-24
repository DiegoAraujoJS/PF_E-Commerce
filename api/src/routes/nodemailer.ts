import nodemailer from 'nodemailer'
import {Router, Request, Response} from 'express'
import config from '../lib/config'
const router = Router()

router.post('/', async (req:Request, res:Response) => {

     //let {name, email, subject, curso} = req.body
  let name = 'Ariel';
  let email = 'arielrt20@gmail.com';
  let subject = 'Eliminacion';
  let curso = 'Matematicas avanzadas'
  

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.gmail_user,
            pass: config.gmail_password
        }
    })

    let mailOptions = {
        from: config.gmail_user,
        to: `${email}`,
        subject: `${subject}`,
        text: `Hola, ${name}:

        Como seguramente sepas, las medidas tomadas para frenar la pandemia del coronavirus (COVID-19) nos obligan a limitar el contacto socia. Por consiguiente, hemos tomado la difícil decisión de cancelar el curso . 
        
        Si has comprado el curso para ${curso}, procederemos a reembolsarte el importe de esta. Si tienes alguna duda o pregunta, ponte en contacto con nosotros.
        
        Gracias por mostrar interés en ${curso} y por tu comprensión en estos difíciles momentos.`
    
    }
    
    const mail = await transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
            console.log('error', err)
            res.status(500).send(err.message)
        } else {
            console.log('sent', data)
            res.status(200).json(req.body)
        }
    })
    return res.send(mail)

})

export default router
import { Request, Response, Router } from 'express'
import nodemailer from 'nodemailer';

const router = Router();

router.post('/', async (req:Request, res:Response) => {

  //let {name, email, subject, curso} = req.body
  let name = 'Ariel';
  let email = 'arielrt20@gmail.com';
  let subject = 'Eliminacion';
  let curso = 'Matematicas avanzadas'
  
  

  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    post: 465,
    secure: true,
    auth: {
      user: "experimentomails@gmail.com",
      pass: "memsaosgfiwlkipr"
    }
  });

  const mailOptions = {
    from: "U clases",
    to: `${email}`,
    subject: `${subject}`,
    text: `Hola, ${name}:

    Como seguramente sepas, las medidas tomadas para frenar la pandemia del coronavirus (COVID-19) nos obligan a limitar el contacto socia. Por consiguiente, hemos tomado la difícil decisión de cancelar el curso . 
    
    Si has comprado el curso para ${curso}, procederemos a reembolsarte el importe de esta. Si tienes alguna duda o pregunta, ponte en contacto con nosotros.
    
    Gracias por mostrar interés en ${curso} y por tu comprensión en estos difíciles momentos.`
  }
    
  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      res.status(500).send(error.message)
    } else {
      res.status(200).json(req.body)
    }
    })
  })

export default router
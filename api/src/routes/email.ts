import { Request, Response, Router } from 'express'
import nodemailer from 'nodemailer';

const router = Router();

router.post('/', async (req:Request, res:Response) => {

  let {name, email, subject} = req.body
  
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
    to: "arielrt20@gmail.com",
    subject: "Aviso",
    text: `Hola, [nombre]:

    Como seguramente sepas, las medidas tomadas para frenar la pandemia del coronavirus (COVID-19) nos obligan a limitar el contacto socia. Por consiguiente, hemos tomado la difícil decisión de cancelar el curso . 
    
    Si has comprado el curso para [insertar nombre del curso], procederemos a reembolsarte el importe de esta. Si tienes alguna duda o pregunta, ponte en contacto con nosotros.
    
    Gracias por mostrar interés en [inserta el nombre del curso] y por tu comprensión en estos difíciles momentos.`
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
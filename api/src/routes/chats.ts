import { Request, Response, Router } from 'express'
import { Op } from 'sequelize'
import Chat from '../models/Chat'

const router = Router()


// /api/chats/?user1=diegoaraujo@gmail.com&user2=benjaSpickler@gmail.com
router.get('/', async (req:Request, res:Response) => {
    res.send([
        {
          
          uid: "diegoaraujo@gmail.com",
          photoURL: "http://...",
          text: "hola soy un mensaje",
          createdAt: new Date()
        },
        {
            uid: "benjaminspickler@gmail.com",
            photoURL: "http://...",
            text: "hola soy una respuesta",
            createdAt: new Date()
          }
      ])
})

export default router;


// codigo viejo de braian

// router.post('/add', async (req: Request, res: Response) => {
//     // {
//     //     "user_a": "braian",
//     //     "user_b": "edward",
//     //     "mensajes": [{"a": "a"},{"b":"b"},{"a":"c},{"b":"d"}]
//     // }

//     const { user_a, user_b, mensajes } = req.body
//     let chat = await Chat.findOne({
//         where: {
//             [Op.or]: [{
//                 user_a: user_a,
//                 user_b: user_b 
//             },
//             { 
//                 user_a: user_b,
//                 user_b: user_a,        
//             }]
//         }
//     })

//     if(chat){
//         chat.set({
//             mensajes: [...chat.mensajes, mensajes[0]]
//         })
//         const chatEditado = await chat.save()
//         res.send(chatEditado)
//     }
//     else{
//         const nuevoChat = await Chat.create(req.body)
//         res.send(nuevoChat)
//     }

// })



// router.get('/:user_a/:user_b', async (req: Request, res: Response) => {
//     const { user_a, user_b } = req.params

//     const chat = await Chat.findAll({
//         where: {
//             [Op.or]: [{
//                 user_a: user_a,
//                 user_b: user_b 
//             },
//             { 
//                 user_a: user_b,
//                 user_b: user_a,        
//             }]
//         }
//     })
//     res.send(chat)
// })

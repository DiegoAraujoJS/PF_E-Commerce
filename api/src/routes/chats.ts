import { Request, Response, Router } from 'express'
import { Op } from 'sequelize'
import Chat from '../models/Chat'

const router = Router()


router.post('/add', async (req: Request, res: Response) => {
    // {
    //     "user_a": "braian",
    //     "user_b": "edward",
    //     "mensajes": [{"braian": "a"},{"edward":"b"},{"braian":"c},{"edward":"d"}]
    // }

    const { user_a, user_b, mensajes } = req.body
    let chat = await Chat.findOne({
        where: {
            [Op.or]: [{
                user_a: user_a,
                user_b: user_b 
            },
            { 
                user_a: user_b,
                user_b: user_a,        
            }]
        }
    })

    if(chat){
        chat.set({
            mensajes: [...chat.mensajes, mensajes[0]]
        })
        const chatEditado = await chat.save()
        res.send(chatEditado)
    }
    else{
        const nuevoChat = await Chat.create(req.body)
        res.send(nuevoChat)
    }

})



router.get('/:user_a/:user_b', async (req: Request, res: Response) => {
    const { user_a, user_b } = req.params

    const chat = await Chat.findAll({
        where: {
            [Op.or]: [{
                user_a: user_a,
                user_b: user_b 
            },
            { 
                user_a: user_b,
                user_b: user_a,        
            }]
        }
    })
    res.send(chat)
})



export default router;
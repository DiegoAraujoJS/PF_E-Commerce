import { Router, Request, Response } from "express";

const router = Router()
interface User{username: string, password: string, role: string}
type Users = User[]

let users: Users = []

router.post('/register', async (req:Request, res:Response) => {
    const {username, password, role} = req.body;
    if (users.find ((user: any) => user.username === username )) {
        return res.status(400).send('el usuario ya existe')
    } else {
        console.log('register')
        users.push(
            {
                username: username,
                password: password,
                role: role,
            }
        )
        return res.send(users[users.length - 1])
    }
})

router.post('/login', async (req:Request, res:Response) => {
    const {username, password} = req.body;
    const user = users.find ((user: any) => (user.username === username && user.password === password))
    if (user) {
        return res.status(200).send(user)
    } else {
        return res.status(400).send('usuario o contaseña incorrectos')
    }
})

router.get('/:user', async (req:Request, res:Response) => {
    const user: User | undefined = users.find(x => x.username === req.params.user)

    if (user === undefined) {
        return res.send(undefined)
    }
    return res.send(user?.role)
})

export default router
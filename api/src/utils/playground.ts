import { Router, Request, Response } from "express";
import mail from "./actions/mailer";
const router = Router ()

router.post('/mail', async (req:Request, res:Response) => {
    const sendMail = mail('diegolaraujo96@gmail.com', 'testing', 'it works :D')
})

export default router

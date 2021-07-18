import { Router, Request, Response } from "express";
import market from "../MarketFlow";
import Stripe from 'stripe';
const router = Router();

router.post('/publish', async (req:Request, res:Response) => {
    if (!req.headers.authorization) return res.status(400).send('you have to put a property \"token\" in the request body')
    const publish = await market.publish(req.body, req.headers.authorization)
    return res.send(publish)

})
export default router
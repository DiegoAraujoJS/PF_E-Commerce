import { Request, Response, Router } from 'express'
import nuevosHorarios from '../utils/nuevosHorarios';
const router = Router();

router.post('/', (req: Request, res: Response) => {
    const nuevos = nuevosHorarios(req.body.actuales, req.body.nuevos)
    return res.send(nuevos)
})

export default router
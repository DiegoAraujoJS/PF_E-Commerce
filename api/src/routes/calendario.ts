import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor'
import { CalendarioResponse, Horario, Disponible, Ocupado } from '../../../interfaces';
import nuevosHorarios from '../utils/calendarFunctions/nuevosHorarios';
import validateToken from '../utils/validateToken';
import setNewCalendar from '../utils/calendarFunctions/setNewCalendar';
const router = Router()

interface MiddlewareRequest extends Request {
    data: {mail: string, role: number};
}

router.post('/add', validateToken, async (req: MiddlewareRequest, res: Response) => {
    let query: Disponible = req.body

    if (req.data.role !== 2 && req.body.email != req.data.mail) {
        return res.status(400).send('You are not authorized.')
    }
    try {
        const newCalendar = await setNewCalendar(query)
        return res.send(newCalendar)
    } catch(err) {
        res.status(400).send(err)
    }
});


router.get('/:usuario', async (req: Request, res: Response) => {
    const { usuario } = req.params

    try {
        if (usuario) {
            const profesor = await Profesor.findOne({
                where: {
                    User_mail: usuario
                }
            })
            if (profesor) {
                if (profesor.calendario) {
                    res.send(profesor.calendario)
                }
            }
        }
    }
    catch (error) {
        res.send(error)
    }
});


router.put('/edit', validateToken, async (req: MiddlewareRequest, res: Response) => {
    let query: Ocupado = req.body

    if (req.data.role !== 2 && req.body.email != req.data.mail) {
             return res.status(400).send('You are not authorized.')
    }

    try {
        let profesor = await Profesor.findOne({
            where: {
                User_mail: query.email
            }
        })

        if (profesor) {
            if (profesor.calendario) {

                let indice = profesor.calendario.findIndex(element => element.fecha.anio === query.fecha.anio && element.fecha.mes === query.fecha.mes && element.fecha.dia === query.fecha.dia)

                let calendario = profesor.calendario[indice]

                if (calendario) {
                    
                    if (query.ocupado) {
                        const calendarioEditado: Horario = nuevosHorarios(calendario, null, query)

                        const nuevoCalendario = profesor.calendario.map((fecha, i) => i === indice ? calendarioEditado : fecha)

                        profesor.set({
                            ...profesor,
                            calendario: nuevoCalendario
                        })
                        let resultado = await profesor.save()
                        res.send(resultado)
                    }
                }
            }
        }
    }

    catch (error) {
        res.send(error)
    }
});

router.put('/delete', validateToken, async (req:MiddlewareRequest, res:Response) => {
    if (req.data.role !== 2 && req.body.email != req.data.mail) {
        return res.status(400).send('You are not authorized.')
    }

    if (!req.body.email) return res.status(400).send('You have to send a valid email')

    try {
        const professor = await Profesor.findByPk(req.body.email)
        const calendar = professor.calendario
        const thisDate = calendar.find(c => c.fecha.anio === req.body.fecha.anio && c.fecha.mes === req.body.fecha.mes && c.fecha.dia === req.body.fecha.dia)
        let newDate: Horario = {email: professor.User_mail, fecha: thisDate.fecha, disponible: thisDate.disponible, ocupado: thisDate.ocupado}

        if (req.body.disponible) {
            let newAvaliable = thisDate.disponible.filter(tuple => {console.log(tuple[0] === req.body.disponible[0][0], tuple[1] === req.body.disponible[0][1]);return !(tuple[0] === req.body.disponible[0][0] && tuple[1] === req.body.disponible[0][1])})
            if (newAvaliable.length === 0) newAvaliable = null
            newDate.disponible = newAvaliable
            const calendarWithoutOldDate = calendar.filter(c => c !== thisDate)
            const newCalendar = [...calendarWithoutOldDate, newDate]
            professor.set({
                ...professor, 
                calendario: newCalendar
            })
            const result = await professor.save()
            return res.send(result)
        } else if (req.body.ocupado) {
            let newAvaliable = thisDate.ocupado.filter(tuple => {return !(tuple[0] === req.body.ocupado[0][0] && tuple[1] === req.body.ocupado[0][1])})
            if (newAvaliable.length === 0) newAvaliable = null
            newDate.ocupado = newAvaliable
            const calendarWithoutOldDate = calendar.filter(c => c !== thisDate)
            const newCalendar = [...calendarWithoutOldDate, newDate]
            professor.set({
                ...professor, 
                calendario: newCalendar
            })
            const result = await professor.save()
            return res.send(result)
        }
    } catch (err) {
        return res.status(400).send(err)
    }
})
export default router

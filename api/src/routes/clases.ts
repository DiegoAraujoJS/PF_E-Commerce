import {Request, Response, Router} from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario'
const router = Router ()

router.get('/:materia/:ciudad', async (req: Request, res: Response) => {
    const { materia, ciudad } = req.params

    const clasesFiltradas = await Clase.findAll({ where: { materia: materia } })

    const profesorFiltrados = await User.findAll({
        include: [{
            model: Profesor,
            required: true,
            attributes: ['ciudad', 'foto', 'descripcion'],
            where: { ciudad: ciudad }
        }],
        attributes: ['email', 'nombre', 'apellido']
    })

    var result = [];
    for (var i = 0; i < clasesFiltradas.length; i++) {
        for (var j = 0; j < profesorFiltrados.length; j++) {

            if (clasesFiltradas[i].profesor === profesorFiltrados[j].email) {
                result.push(clasesFiltradas[i])
            }
        }
    }
    res.send(result)

})

router.post('/puntuar', async (req: Request, res:Response) => {
    const {id, puntuacion} = req.body;
    try {
        const clase = await Clase.findOne({where: { id }})
        if (clase) {
            clase.update({ puntuacion })
            const claseActualizada = await Clase.findOne({where: { id }})
            res.send()
        } else {
            return res.send(`No se encontró ninguna clase con el id ${id}`)
        }
    } catch {

    }
})

router.post('/', async (req: Request, res: Response) => {
    const clase = req.body
    try {
        const crearClase = await Clase.create(clase)
        res.send(crearClase)
    }
    catch (error) {
        res.send(error)
    }
})



router.put('/edit', async (req: Request, res: Response) => {
    const { id, descripcion, materia, nivel, grado, puntuacion } = req.body
    const claseEditada = {
        descripcion,
        materia,
        nivel,
        grado,
        puntuacion,
    }
    try {
        const clase: any = await Clase.findByPk(id);

        await clase.set(claseEditada);
        await clase.save();
        const claseCambiada = await Clase.findByPk(id);
        res.send(claseCambiada)
    }
    catch (error) {
        res.send(error)
    }
})


router.post('/delete', async (req: Request, res: Response) => {
    const { id } = req.body
    try {
        await Clase.destroy({
            where: { id: id }
        }).then(e => res.send(e)).catch(err => res.send(err))
    }
    catch (error) {
        res.send(error)
    }
})


export default router;


import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import User from '../models/Usuario';
import { Op, where } from 'sequelize'
const router = Router()


//http://localhost:3001/api/clases?busqueda=Buenos%20aires%20matematica%20segundo%20grado
router.get('/', async (req: Request, res: Response) => {
    const { busqueda } = req.query
    try {
        if (busqueda) {
            let palabrasSeparadas = (busqueda as string).split(" ");

            let resultado = palabrasSeparadas.map(async (element) => {
                return await Clase.findAll({
                    where: {
                        [Op.or]: [{
                            materia: {
                                [Op.like]: `%${element}%`
                            }
                        },
                        {
                            nivel: {
                                [Op.like]: `%${element}%`
                            }
                        }
                        ]
                    }
                })
            });

            Promise.all(resultado)
                .then(response => {
                    var arrayClases: any[] = []
                    response.forEach(async (element) => {
                        console.log("element", element)
                        if (element.length) {
                            arrayClases.push(element)
                        }
                    })
                    const clasesSolicitadas = arrayClases[0]

                    let profesores = palabrasSeparadas.map(async (element) => {

                        return await User.findAll({
                            include: [{
                                model: Profesor,
                                required: true,
                                attributes: ['ciudad', 'foto', 'descripcion'],
                                where: {
                                    ciudad: {
                                        [Op.like]: `%${element}%`

                                    }
                                },
                            }],
                            attributes: ['email', 'nombre', 'apellido'],
                        })
                    })

                    Promise.all(profesores)
                        .then(response => {
                            var arrayProfesores: any[] = []
                            response.forEach(async (element) => {
                                if (element.length) {
                                    arrayProfesores.push(element)
                                }
                            })
                            const profesoresSolicitados = arrayProfesores[0]

                            var result = [];
                            for (var i = 0; i < clasesSolicitadas.length; i++) {
                                for (var j = 0; j < profesoresSolicitados.length; j++) {
                                    if (clasesSolicitadas[i].Profesor_mail === profesoresSolicitados[j].email) {
                                        result.push(clasesSolicitadas[i])
                                    }
                                }
                            }
                            res.send(result)
                        })
                })
        }
    }
    catch (error) {
        res.send(error)
    }
});


router.get('/:materia/:ciudad', async (req: Request, res: Response) => {
    const { materia, ciudad } = req.params
    try {
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

                if (clasesFiltradas[i].Profesor_mail === profesorFiltrados[j].email) {
                    result.push(clasesFiltradas[i])
                }
            }
        }
        res.send(result)
    }
    catch (error) {
        res.send(error)
    }
})


router.post('/add', async (req: Request, res: Response) => {
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
        }).then(e => res.send(`${e}`)).catch(err => res.send(err))
    }
    catch (error) {
        res.send(error)
    }
})


export default router;
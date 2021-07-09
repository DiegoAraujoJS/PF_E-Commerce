import {Request, Response, Router} from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import Puntuacion from '../models/Puntuacion'
import { Op } from 'sequelize'
const router = Router ()


router.get('/', async (req: Request, res: Response) => {
    const { busqueda } = req.query
    if (!busqueda) return res.status(400).send('Debes ingresar un input como \'busqueda\'')
    try {
        if (busqueda) {
            let palabrasSeparadas = (busqueda as string).split(" ");
            palabrasSeparadas = palabrasSeparadas.filter(x => x!=='grado')
            palabrasSeparadas = palabrasSeparadas.filter(x => x!=='año')
            palabrasSeparadas = palabrasSeparadas.filter(x => x!=='anio')

            
            let clases: any[] = []
            for (let x of palabrasSeparadas){
                const c = await Clase.findAll({
                    include: [Profesor],
                    where: {
                        [Op.or]: [{
                            materia: {
                                [Op.like]: `%${x}%`.replace("\'", '')
                            }
                        },
                        {
                            nivel: {
                                [Op.like]: `%${x}%`.replace("\'", '')
                            }
                        },
                        {
                            grado: {
                                [Op.like]: `%${x}%`.replace("\'", '')
                            }
                        },
                        {
                            ciudad: {
                                [Op.like]: `%${x}%`.replace("\'", '')
                            }
                        }
                        
                        ]
                    }
                })
                
                clases.push(...c)
            }
            res.status(200).send(clases)
        }
    }
    catch (error) {
        res.send(error)
    }
});

router.get('/todas', async (req: Request, res: Response) => {
    const clases= await Clase.findAll({
        include: [Profesor]
    })
    return res.send(clases)
})
///////////
//////////


// Puntua una clase
router.post('/puntuar', async (req: Request, res: Response) => {
    const { id, alumno, puntuacion, comentario } = req.body;
    try {
        const clase = await Clase.findOne({
            where: { id },
            include: [{
                model: Puntuacion,
                attributes: ['puntuacion']
            }]
        })
        if (clase) {
            await Puntuacion.create({
                usuario: alumno,
                clase: id,
                puntuacion,
                comentario
            });

            const claseActualizada = await Clase.findOne({
                where: { id },
                include: [{
                    model: Puntuacion
                }]
            });
            res.send(claseActualizada)
        } else {
            return res.send(`No se encontró ninguna clase con el id ${id}`)
        }
    } catch {

    }
})


// propiedades notNull de Clase: 

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
    const {id} = req.body
    try {
        
        const clase: any = await Clase.findByPk(id);
        console.log(clase)
        await clase.set(clase.descripcion = req.body.descripcion);
        await clase.save();
        const claseCambiada = await Clase.findByPk(id);
        res.send(claseCambiada)
    }
    catch (error) {
        res.send(error)
    }
})

router.post('/delete', async (req: Request, res: Response) => {
    const {id} = req.body
    try {
        await Clase.destroy({
            where: { id: id }
        }).then(e => res.send(`${e}`)).catch(err => res.send(err))
    }

    catch (error) {
        res.send(error)
    }
})

//////////
/////////



export default router;
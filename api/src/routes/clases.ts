import { Request, Response, Router } from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
import Puntuacion from '../models/Puntuacion'
import { Op } from 'sequelize'
const router = Router()


router.get('/:materia/:ciudad', async (req: Request, res: Response) => {
    //console.log(req.params)
    const { materia, ciudad } = req.params

    const clases = await Clase.findAll()
    let clasesFiltradas = clases.filter(clase => {
        return clase.materia === materia
    })
    //console.log('clases', clases)
    //console.log('clases filtradas ', clasesFiltradas)

    const profesores = await Profesor.findAll()
    let profesorFiltrados = profesores.filter(profesor => { return profesor.ciudad === ciudad })

    var result = [];
    for (var i = 0; i < clasesFiltradas.length; i++) {
        for (var j = 0; j < profesorFiltrados.length; j++) {
            //console.log('clases filtradas ', clasesFiltradas[i], 'profesores filtrados ', profesorFiltrados[j])
            if (clasesFiltradas[i].Profesor_mail === profesorFiltrados[j].nombre) {
                result.push(clasesFiltradas[i])
            }
        }
    }
    res.send(result)
})

router.get('/', async (req: Request, res: Response) => {
    const clases = await Clase.findAll({
        include: [Profesor]
    })
    return res.send(clases)
})
///////////
//////////


// Puntuar una clase
router.post('/puntuar', async (req: Request, res: Response) => {
    try {
    const { id, alumno, puntuacion, comentario } = req.body;
        const clase = await Clase.findOne({
            where: { id },
            include: [{
                model: Puntuacion,
                attributes: ['puntuacion']
            }]
        })
        if (clase) {
            const profesor = clase.Profesor_mail;
            if (clase.puntuaciones.length) {
                const puntuacionAlumnoClase = await Puntuacion.findOne({
                    where: {
                        [Op.and]: {
                            clase: id,
                            usuario: alumno
                        }
                    }
                })
                if (puntuacionAlumnoClase) {
                    return res.send(`${alumno} ya comentó esta clase si desea actualice su puntuacion`)
                }
            }
            await Puntuacion.create({
                usuario: alumno,
                clase: id,
                puntuacion,
                comentario
            });
            const puntuaciones = await Puntuacion.findAll({
                where: {clase: id},
                attributes: ['puntuacion']
            })
            console.log(puntuaciones)
            let puntuacionClase = parseFloat((puntuaciones.map(elemento => elemento.puntuacion).reduce(function(a, b){ return a + b; })/puntuaciones.length).toFixed(2))
            let claseActualizada = await Clase.findOne({
                where: { id },
                include: [{
                    model: Puntuacion,
                    required: true,
                    attributes: ['usuario', 'puntuacion', 'comentario']
                }]
            })
            if (claseActualizada) {
                claseActualizada = await claseActualizada.update({ puntuacion: puntuacionClase })
            }
            let clasesProfesor = await Clase.findAll({
                where: {Profesor_mail: profesor},
                attributes: ['puntuacion']
            })
            console.log(clasesProfesor)
            let puntuacionProfesor = parseFloat((clasesProfesor.map(elemento => elemento.puntuacion).reduce(function(a, b){ return a + b; })/clasesProfesor.length).toFixed(2))
            console.log(clasesProfesor.map(elemento => elemento.puntuacion))
            let profesorPorActualizar = await Profesor.findOne({ where: { User_mail: profesor }});
            if (profesorPorActualizar) {
                profesorPorActualizar = await profesorPorActualizar.update({ puntuacion: puntuacionProfesor })
            }
            return res.send(claseActualizada)
        }
        return res.send(`No se encontró ninguna clase con el id ${id}`)
    } catch (error) {
        return res.send(error);
    }
})

// Actualizar la puntuacion de una clase
router.put('/puntuar', async (req: Request, res: Response) => {
    try {
    const { id, alumno, puntuacion, comentario } = req.body;
        const clase = await Clase.findOne({
            where: { id },
            include: [{
                model: Puntuacion,
                attributes: ['puntuacion']
            }]
        })
        if (clase) {
            const profesor = clase.Profesor_mail;
            if (clase.puntuaciones.length) {
                const puntuacionAlumnoClase = await Puntuacion.findOne({
                    where: {
                        [Op.and]: {
                            clase: id,
                            usuario: alumno
                        }
                    }
                })
                if (puntuacionAlumnoClase) {
                    await puntuacionAlumnoClase.update({
                        puntuacion,
                        comentario
                    })
                } else {
                    return res.send(`${alumno} aún no ha comentado esta clase si desea cree una nueva puntuacion`)
                } 
            }
            const puntuaciones = await Puntuacion.findAll({
                where: {clase: id},
                attributes: ['puntuacion']
            })
            console.log(puntuaciones)
            let puntuacionClase = parseFloat((puntuaciones.map(elemento => elemento.puntuacion).reduce(function(a, b){ return a + b; })/puntuaciones.length).toFixed(2))
            let claseActualizada = await Clase.findOne({
                where: { id },
                include: [{
                    model: Puntuacion,
                    required: true,
                    attributes: ['usuario', 'puntuacion', 'comentario']
                }]
            })
            if (claseActualizada) {
                claseActualizada = await claseActualizada.update({ puntuacion: puntuacionClase })
            }
            let clasesProfesor = await Clase.findAll({
                where: {Profesor_mail: profesor},
                attributes: ['puntuacion']
            })
            console.log(clasesProfesor)
            let puntuacionProfesor = parseFloat((clasesProfesor.map(elemento => elemento.puntuacion).reduce(function(a, b){ return a + b; })/clasesProfesor.length).toFixed(2))
            console.log(clasesProfesor.map(elemento => elemento.puntuacion))
            let profesorPorActualizar = await Profesor.findOne({ where: { User_mail: profesor }});
            if (profesorPorActualizar) {
                profesorPorActualizar = await profesorPorActualizar.update({ puntuacion: puntuacionProfesor })
            }
            return res.send(claseActualizada)
        }
        return res.send(`No se encontró ninguna clase con el id ${id}`)
    } catch (error) {
        return res.send(error);
    }
})

// router.put('/puntuar', async (req: Request, res: Response) => {
//     try {
//         const { id, alumno, puntuacion, comentario } = req.body;
//         const clase = await Clase.findOne({
//             where: { id },
//             include: [{
//                 model: Puntuacion,
//                 attributes: ['usuario', 'puntuacion', 'comentario'],
//             }]
//         })
//         if (clase) {
//             if (clase.puntuaciones.length) {
//                 const puntuacionAlumnoClase = clase.puntuaciones.filter(elemento => elemento.usuario === alumno);
//                 if (puntuacionAlumnoClase.length) {
//                     const puntuacionAlumno = await Puntuacion.findOne({
//                         where: {
//                             [Op.and]: [
//                                 { usuario: alumno },
//                                 { clase: id }
//                             ]
//                         }
//                     })
//                     if (puntuacionAlumno) {
//                         await puntuacionAlumno.update({
//                             puntuacion,
//                             comentario
//                         })
//                     }
//                 }
//             } else {
//                 await Puntuacion.create({
//                     usuario: alumno,
//                     clase: id,
//                     puntuacion,
//                     comentario
//                 });
//             }

//             const claseActualizada = await Puntuacion.findOne({
//                 where: {
//                     [Op.and]: [
//                         { usuario: alumno },
//                         { clase: id }
//                     ]
//                 }, attributes: ['puntuacion', 'comentario']
//             })

//             res.send(claseActualizada)
//         } else {
//             return res.send(`No se encontró ninguna clase con el id ${id}`)
//         }
//     } catch (error) {
//         return res.send(error)
//     }
// })




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
    const { id } = req.body
    try {

        const clase: any = await Clase.findByPk(id);
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

//////////
/////////



export default router;
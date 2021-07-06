import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor';
import User from '../models/Usuario';
import { Op } from 'sequelize'
import { createFor } from 'typescript';
const router = Router()

let profesores = [
    {
        id: 1,
        nombre: 'Uno Rodrigo',
        apellido: 'Callardo',
        foto: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        descripcion: 'Enseño inglés',
        ciudad: 'Buenos Aires'
    },
    {
        id: 2,
        nombre: 'Dos Rodrigo',
        apellido: 'Callardo',
        foto: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        descripcion: 'Enseño inglés',
        ciudad: 'Buenos Aires'
    },
    {
        id: 3,
        nombre: 'Tres Rodrigo',
        apellido: 'Callardo',
        foto: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        descripcion: 'Enseño inglés',
        ciudad: 'Buenos Aires'
    },
    {
        id: 4,
        nombre: 'Cuatro Rodrigo',
        apellido: 'Callardo',
        foto: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        descripcion: 'Enseño inglés',
        ciudad: 'Buenos Aires'
    },
    {
        id: 5,
        nombre: 'Cinco Rodrigo',
        apellido: 'Callardo',
        foto: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80',
        descripcion: 'Enseño inglés',
        ciudad: 'Buenos Aires'
    },
]

router.get('/', async (req: Request, res: Response) => { // profesore?name=rod
    let terminoBusqueda = req.query.name;
    let profesores = [];
    if (terminoBusqueda) { // Siendo más extrictos sería > if (terminoBusqueda && typeof terminoBusqueda === 'string')
        terminoBusqueda = terminoBusqueda.toString()
        profesores = await User.findAll({
            include: [{
                model: Profesor,
                required: true,
                attributes: ['ciudad', 'foto', 'descripcion']
            }],
            where: {
                [Op.or]: [
                    {
                        nombre:
                            { [Op.iLike]: `%${terminoBusqueda}%` }
                    },
                    {
                        apellido:
                            { [Op.iLike]: `%${terminoBusqueda}%` }
                    },
                ]
            },
            attributes: ['email', 'nombre', 'apellido']
        })
        if (profesores.length) return res.send(profesores);
        return res.send(`No se encontraron coincidencias con ${terminoBusqueda.toString()}`)
    }
    profesores = await User.findAll({
        include: [{
            model: Profesor,
            required: true,
            attributes: ['ciudad', 'foto', 'descripcion']
        }],
        attributes: ['email', 'nombre', 'apellido']
    })
    return res.send(profesores)
})

router.post('/', async (req: Request, res: Response) => {
    const { email, ciudad, foto, descripcion } = req.body;
    if (email) {
        let usuario = await User.findOne({
            include: [{
                model: Profesor
            }],
            where: {
                email: email.toString()
            },
            attributes: ['email', 'nombre', 'apellido']
        });
        if (usuario) {
            if (!usuario.profesor) {
                await Profesor.create({
                    usuario: email,
                    ciudad,
                    foto,
                    descripcion
                })
            } else {
                return res.send('Este profesor ya existe así que debería actualizarlo');
            }
        } else {
            return res.send('No existe una cuenta con ese correo')
        }
        usuario = await User.findOne({
            include: [{
                model: Profesor
            }],
            where: {
                email: email.toString()
            },
            attributes: ['email', 'nombre', 'apellido']
        });
        return res.send(usuario);
    }
    return res.send('Indique un correo');
})

router.put('/', async (req: Request, res: Response) => {
    const { email, ciudad, foto, descripcion } = req.body;
    if (email) {
        let usuario = await User.findOne({
            include: [{
                model: Profesor
            }],
            where: {
                email: email.toString()
            },
            attributes: ['email', 'nombre', 'apellido']
        });
        if (usuario) {
            if (usuario.profesor) {
                await usuario.profesor.update(
                    {
                        ciudad,
                        foto,
                        descripcion
                    }
                )
            } else {
                return res.send('Este profesor no existe así que debería crearlo')
            }
        } else {
            return res.send('No existe una cuenta con ese correo')
        }
        usuario = await User.findOne({
            include: [{
                model: Profesor
            }],
            where: {
                email: email.toString()
            },
            attributes: ['email', 'nombre', 'apellido']
        });
        return res.send(usuario);
    }
    return res.send('Indique un correo');
})

router.get('/:id', async (req: Request, res: Response) => {
    const idProfesor = parseInt(req.params.id);
    const profesorSolicitado = profesores.filter(profesor => profesor.id === idProfesor)
    if (profesorSolicitado.length) return res.send(profesorSolicitado)
    res.send(`No se encontró un profesor con el id ${idProfesor}`)
})

/* ESTE DEBE SER UN GET POR CORREO */

router.put('/:id', async (req: Request, res: Response) => {
    const idProfesor = parseInt(req.params.id);
    let profesorEncontrado = profesores.filter(profesor => profesor.id === idProfesor);
    if (profesorEncontrado.length) {
        let profesorModificado: any;
        profesores = profesores.map(profesor => {
            if (profesor.id === idProfesor) {
                profesorModificado = { ...profesor, ...req.body }
                return profesorModificado;
            };
            return profesor
        })
        return res.send(`El profesor ${profesorModificado.nombre} ${profesorModificado.apellido} fue modificado exitosamente`)
    }
    return res.send(`Imposible modificar pues no hay ningún profesor con el id ${idProfesor}`)
})

router.delete('/:id', async (req: Request, res: Response) => {
    const idProfesor = parseInt(req.params.id);
    let nuevoArray = profesores.filter(profesor => profesor.id !== idProfesor)
    if (nuevoArray.length === profesores.length - 1) {
        profesores = nuevoArray;
        return res.send(`El profesor de id ${idProfesor} se borró exitosamente`)
    }
    return res.send(`Imposible eliminar pues no hay ningún profesor con el id ${idProfesor}`)
});

export default router;




/*
router.get('/', async (req: Request, res: Response) => { // profesore?name=rod
    let terminoBusqueda: any;
    terminoBusqueda = req.query.name!.toString();


    if (terminoBusqueda) { // Siendo más extrictos sería > if (terminoBusqueda && typeof terminoBusqueda === 'string')
        let profesores = await Profesor.findAll({where: {
            [Op.or]: [
                {
                    nombre: {
                        [Op.like]: `%${terminoBusqueda}%`
                    }
                },
                {
                    apellido: {
                        [Op.like]: `%${terminoBusqueda}%`
                    }
                }
            ]
        }})


        if (profesores.length) return res.send(profesores);
        return res.send(`No se encontraron coincidencias con ${terminoBusqueda}`)
    }
})
*/
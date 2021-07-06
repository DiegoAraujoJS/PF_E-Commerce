// MIS CAMBIOS > Generé un CRUD completo para los profesores

// Agregué esto a routes/index.js
// import profesores from './profesores'
// router.use('/profesores', profesores)

// Creé este archivo profesores.ts
import {Request, Response, Router} from 'express'
import Profesor from '../models/Profesor';
import {Op} from 'sequelize'

const router = Router ()

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
    let terminoBusqueda = req.query.name.toString();


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


router.post('/', async (req:Request, res:Response) => {
    const {nombre, apellido, descripcion, ciudad} = req.body;
    if (nombre && apellido && descripcion && ciudad) {
        const profesor = {...req.body, id: profesores.length + 1, foto: 'https://images.unsplash.com/photo-1548449112-96a38a643324?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80'}
        profesores.push(profesor);
        return res.send(`El profesor ${profesores[profesores.length - 1].nombre} ${profesores[profesores.length - 1].apellido} se creó exitosamente`);
    }
    return res.send('Datos imcompletos para el registro');
})

router.get('/:id', async (req:Request, res:Response) => {
    const idProfesor = parseInt(req.params.id);
    const profesorSolicitado = profesores.filter(profesor => profesor.id === idProfesor)
    if (profesorSolicitado.length) return res.send(profesorSolicitado)
    res.send(`No se encontró un profesor con el id ${ idProfesor}`)
})

router.put('/:id', async (req:Request, res:Response) => {
    const idProfesor = parseInt(req.params.id);
    let profesorEncontrado = profesores.filter(profesor => profesor.id === idProfesor);
    if (profesorEncontrado.length) {
        let profesorModificado;
        profesores = profesores.map(profesor => {
            if (profesor.id === idProfesor) {
                profesorModificado = {...profesor, ...req.body}
                return profesorModificado;
            };
            return profesor
        })
        return res.send(`El profesor ${profesorModificado.nombre} ${profesorModificado.apellido} fue modificado exitosamente`)
    }
    return res.send(`Imposible modificar pues no hay ningún profesor con el id ${idProfesor}`)
})

router.delete('/:id', async (req:Request, res:Response) => {
    const idProfesor = parseInt(req.params.id);
    let nuevoArray = profesores.filter(profesor => profesor.id !== idProfesor)
    if (nuevoArray.length === profesores.length - 1) {
        profesores = nuevoArray;
        return res.send(`El profesor de id ${idProfesor} se borró exitosamente`)
    }
    return res.send(`Imposible eliminar pues no hay ningún profesor con el id ${idProfesor}`)
});

export default router;
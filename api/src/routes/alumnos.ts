import { Request, Response, Router } from 'express'
import Alumno from '../models/Alumno';
import User from '../models/Usuario';
import { Op } from 'sequelize'
import Clase from '../models/Clase';
const router = Router();

interface AlumnoInterface {
    mail: string
    nombre: string
    apellido: string
    foto: string
    ciudad: string
    descripcion: string
}

// Devolver todos los alumnos / alumnos con lo indicado ya sea en un su nombre o apellido
router.get('/', async (req: Request, res: Response) => {
    try {
        let terminoBusqueda = req.query.nombre;
        let alumnos = [];
        if (terminoBusqueda) {
            terminoBusqueda = terminoBusqueda.toString()
            alumnos = await User.findAll({
                include: [{
                    model: Alumno,
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
                attributes: ['mail', 'nombre', 'apellido']
            })
            if (alumnos.length) {
                let alumnosDevolver = alumnos.map(e => {
                    let nuevoAlumno: AlumnoInterface = {
                        mail: e.mail,
                        nombre: e.nombre,
                        apellido: e.apellido,
                        foto: e.alumno.foto,
                        ciudad: e.alumno.ciudad,
                        descripcion: e.alumno.descripcion
                    }
                    return nuevoAlumno;
                })
                return res.send(alumnosDevolver)
            }
            return res.send(`No se encontraron coincidencias con ${terminoBusqueda}`)
        }
        alumnos = await User.findAll({
            include: [{
                model: Alumno,
                required: true,
                attributes: ['ciudad', 'foto', 'descripcion']
            }],
            attributes: ['mail', 'nombre', 'apellido']
        })
        if (alumnos.length) {
            let alumnosDevolver = alumnos.map(e => {
                let nuevoAlumno: AlumnoInterface = {
                    mail: e.mail,
                    nombre: e.nombre,
                    apellido: e.apellido,
                    foto: e.alumno.foto,
                    ciudad: e.alumno.ciudad,
                    descripcion: e.alumno.descripcion
                }
                return nuevoAlumno;
            })
            return res.send(alumnosDevolver)
        }
        return res.send(`No se encontraron alumnos`)
    } catch (error) {
        res.send(error)
    }
})

// Devolver alumno por mail
router.get('/:mail', async (req: Request, res: Response) => {
    try {
        const mail = req.params.mail;
        const usuario = await User.findOne({
            include: [{
                model: Alumno,
                attributes: ['ciudad', 'foto', 'descripcion']
            }],
            where: {
                mail: mail.toString()
            },
            attributes: ['mail', 'nombre', 'apellido']
        });
        if (usuario) {
            if (usuario.alumno) {
                let obj: AlumnoInterface = {
                    mail: usuario.mail,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    foto: usuario.alumno.foto,
                    ciudad: usuario.alumno.ciudad,
                    descripcion: usuario.alumno.descripcion,
                }
                return res.send([obj])
            } else {
                return res.send(`No existe ningún alumno asociado la cuenta del correo ${mail}`)
            }
        } else {
            return res.send(`No existe ninguna cuenta con el correo ${mail}`)
        }
    } catch (error) {
        return res.send(error);
    }
})

// Guardar un alumno
router.post('/', async (req: Request, res: Response) => {
    try {
        let mail = req.body.User_usuario;
        mail = mail.toString();
        if (mail) {
            let usuario = await User.findOne({
                include: [{
                    model: Alumno
                }],
                where: {
                    mail: mail.toString()
                }
            });
            if (usuario) {
                if (!usuario.alumno) {
                    await Alumno.create(req.body)
                    usuario = await User.findOne({
                        include: [{
                            model: Alumno,
                            required: true,
                            attributes: ['foto', 'ciudad', 'descripcion']
                        }],
                        where: {
                            mail: mail.toString()
                        },
                        attributes: ['mail', 'nombre', 'apellido']
                    });
                    if (usuario) {
                        let alumnoPorDevolver: AlumnoInterface = {
                            mail: usuario.mail,
                            nombre: usuario.nombre,
                            apellido: usuario.apellido,
                            ciudad: usuario.alumno.ciudad,
                            foto: usuario.alumno.foto,
                            descripcion: usuario.alumno.descripcion
                        }
                        return res.send(alumnoPorDevolver);
                    }
                }
                return res.send(`Ya existe un alumno asociado a la cuenta ${mail} así que debería actualizarlo`);
            }
            return res.send(`No existe una cuenta con el correo ${mail}`)
        }
        return res.send('Indique un correo');
    } catch (error) {
        return res.send(error)
    }
})

// Actualizar un alumno
router.put('/', async (req: Request, res: Response) => {
    try {
        const { ciudad, foto, descripcion } = req.body;
        let mail = req.body.User_usuario;
        mail = mail.toString();
        if (mail) {
            let usuario = await User.findOne({
                include: [{
                    model: Alumno
                }],
                where: {
                    mail: mail.toString()
                }
            });
            if (usuario) {
                if (usuario.alumno) {
                    await usuario.alumno.update({ ciudad, foto, descripcion })
                    usuario = await User.findOne({
                        include: [{
                            model: Alumno,
                            required: true,
                            attributes: ['foto', 'ciudad', 'descripcion']
                        }],
                        where: {
                            mail: mail.toString()
                        },
                        attributes: ['mail', 'nombre', 'apellido']
                    });
                    if (usuario) {
                        let alumnoPorDevolver: AlumnoInterface = {
                            mail: usuario.mail,
                            nombre: usuario.nombre,
                            apellido: usuario.apellido,
                            ciudad: usuario.alumno.ciudad,
                            foto: usuario.alumno.foto,
                            descripcion: usuario.alumno.descripcion
                        }
                        return res.send(alumnoPorDevolver);
                    }
                }
                return res.send(`No existe un alumno asociado a la cuenta ${mail} así que primero debe crearlo`);
            }
            return res.send(`No existe una cuenta con el correo ${mail}`)
        }
        return res.send('Indique un correo');
    } catch (error) {
        return res.send(error)
    }
})

// Eliminar alumno por mail    
router.delete('/:mail', async (req: Request, res: Response) => {
    try {
        let mail = req.params.mail;
        mail = mail.toString();
        if (mail) {
            let usuario = await User.findOne({
                include: [{
                    model: Alumno
                }],
                where: {
                    mail
                }
            });
            if (usuario) {
                if (usuario.alumno) {
                    await Alumno.destroy({
                        where: {
                            User_usuario: mail
                        }
                    });
                    return res.send(`El alumno asociado a la cuenta ${mail} fue eliminado exitosamente`)
                }
                return res.send(`No existe ningún alumno asociado la cuenta del correo ${mail}`)
            }
            return res.send(`No existe ninguna cuenta con el correo ${mail}`)
        }
        return res.send(`Indique un correo`)
    } catch (error) {
        return res.send(error)
    }
})

export default router;
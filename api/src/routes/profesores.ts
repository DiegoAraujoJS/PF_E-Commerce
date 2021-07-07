import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor';
import User from '../models/Usuario';
import { Op } from 'sequelize'
import Clase from '../models/Clase';
const router = Router();

router.get('/', async (req: Request, res: Response) => { // profesore?name=rod
    let terminoBusqueda = req.query.nombre;
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
    if (profesores.length) return res.send(profesores)
    return res.send(`No se encontraron profesores`)
})
interface Prof {
    apellido: string
    ciudad: string
    descripcion: string
    foto: string
    id: number
    nombre: string
}
router.get('/:email', async (req: Request, res: Response) => {
    const email = req.params.email;
    const usuario: User | null = await User.findOne({
        include: [{
            model: Profesor,
            attributes: ['ciudad', 'foto', 'descripcion']
        }],
        where: {
            email: email.toString()
        },
        attributes: ['email', 'nombre', 'apellido']
    });
    if (usuario) {
        if (usuario.profesor) {
            console.log(usuario)
            return res.send([
                {
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    ciudad: usuario.profesor.ciudad,
                    foto: usuario.profesor.foto,
                    descripcion: usuario.profesor.descripcion

                }
            ])
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${email}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${email}`)
    }
})

router.get('/:email/clases', async (req: Request, res: Response) => {
    const email = req.params.email;
    const usuario = await User.findOne({
        include: [{
            model: Profesor
        }],
        where: {
            email: email.toString()
        },
    });
    if (usuario) {
        if (usuario.profesor) {
            const clases = await Clase.findAll({
              where: {
                profesor: email.toString()
            },
            attributes: ['id', 'nombre', 'puntuacion', 'grado', 'nivel', 'materia', 'descripcion']
            });
            if (clases.length) {
                res.send(clases)
            } else {
                res.send(`El profesor ${usuario.nombre} ${usuario.apellido} aún no tiene clases registradas`)
            }
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${email}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${email}`)
    }
})

router.post('/', async (req: Request, res: Response) => {
    const email = req.body.usuario;
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
                await Profesor.create(req.body)
            } else {
                return res.send(`Ya existe un profesor asociado a la cuenta ${email} así que debería actualizarlo`);
            }
        } else {
            return res.send(`No existe una cuenta con el correo ${email}`)
        }
        usuario = await User.findOne({
            include: [{
                model: Profesor,
                required: true,
                attributes: ['ciudad', 'foto', 'descripcion']
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
    const { ciudad, foto, descripcion } = req.body;
    const email = req.body.usuario;
    if (email) {
        let usuario: any = await User.findOne({
            include: [{
                model: Profesor,
            }],
            where: {
                email: email.toString()
            },
            attributes: ['email', 'nombre', 'apellido']
        });
        if (usuario) {
            if (usuario.profesor) {
                await usuario.profesor.update({ciudad, foto, descripcion})
            } else {
                return res.send(`No existe un profesor asociado a la cuenta ${email} así que primero debe crearlo`)
            }
        } else {
            return res.send(`No existe una cuenta con el correo ${email}`)
        }
        usuario = await User.findOne({
            include: [{
                model: Profesor,
                required: true,
                attributes: ['ciudad', 'foto', 'descripcion']
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

router.delete('/:email', async (req: Request, res: Response) => {
    const email = req.params.email;
    const usuario = await User.findOne({
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
            await Profesor.destroy({
                where: {
                    usuario: email.toString()
                }
            });
            return res.send(`El profesor asociado a la cuenta ${email} fue eliminado exitosamente`)
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${email}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${email}`)
    }
});

export default router;
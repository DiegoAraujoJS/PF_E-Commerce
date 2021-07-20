import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor';
import User from '../models/Usuario';
import { Op } from 'sequelize'
import Clase from '../models/Clase';
import { ProfesorProps } from '../../../interfaces';
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
                attributes: ['city', 'foto', 'description']
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
        if (profesores.length) return res.send(profesores);
        return res.send(`No se encontraron coincidencias con ${terminoBusqueda.toString()}`)
    }
    profesores = await User.findAll({
        include: [{
            model: Profesor,
            required: true,
            attributes: ['city', 'foto', 'description']
        }],
        attributes: ['mail', 'nombre', 'apellido']
    })
    if (profesores.length) return res.send(profesores)
    return res.send(`No se encontraron profesores`)
})

router.get('/:mail', async (req: Request, res: Response) => {
    console.log("INTENTANDO ENTRAR A MAIL")
    const mail = req.params.mail;
    const usuario: User | null = await User.findOne({
        include: [{
            model: Profesor,
            attributes: ['city', 'foto', 'description']
        }],
        where: {
            mail: mail.toString()
        },
        attributes: ['mail', 'name', 'lastName']
    });
    if (usuario) {
        if (usuario.profesor) {
            
            let obj: ProfesorProps = {
                    User_mail: usuario.mail,
                    name: usuario.name,
                    lastName: usuario.lastName,
                    city: usuario.profesor.city,
                    foto: usuario.profesor.foto,
                    description: usuario.profesor.description,
                    score: usuario.profesor.score
            }
            return res.send(
                obj
            )
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${mail}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${mail}`)
    }
})

router.get('/:mail/clases', async (req: Request, res: Response) => {
    const mail = req.params.mail;
    const usuario = await User.findOne({
        include: [{
            model: Profesor
        }],
        where: {
            mail: mail.toString()
        },
    });
    if (usuario) {
        if (usuario.profesor) {
            const clases = await Clase.findAll({
              where: {
                profesor: mail.toString()
            },
            attributes: ['id', 'nombre', 'puntuacion', 'grado', 'nivel', 'materia', 'descripcion']
            });
            if (clases.length) {
                res.send(clases)
            } else {
                res.send(`El profesor ${usuario.name} ${usuario.lastName} aún no tiene clases registradas`)
            }
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${mail}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${mail}`)
    }
})

router.post('/', async (req: Request, res: Response) => {
    const mail = req.body.usuario;
    if (mail) {
        let usuario = await User.findOne({
            include: [{
                model: Profesor
            }],
            where: {
                mail: mail.toString()
            },
            attributes: ['mail', 'nombre', 'apellido']
        });
        if (usuario) {
            if (!usuario.profesor) {
                await Profesor.create(req.body)
            } else {
                return res.send(`Ya existe un profesor asociado a la cuenta ${mail} así que debería actualizarlo`);
            }
        } else {
            return res.send(`No existe una cuenta con el correo ${mail}`)
        }
        usuario = await User.findOne({
            include: [{
                model: Profesor,
                required: true,
                attributes: ['city', 'foto', 'description']
            }],
            where: {
                mail: mail.toString()
            },
            attributes: ['mail', 'nombre', 'apellido']
        });
        return res.send(usuario);
    }
    return res.send('Indique un correo');
})

router.patch('/', async (req: Request, res: Response) => {
    const { ciudad, foto, description,education } = req.body;
    const mail = req.body.usuario;
    console.log("ACA ESTA EL BODYT XDDDDD",req.body)
    if (mail) {
        let usuario: any = await User.findOne({
            include: [{
                model: Profesor,
            }],
            where: {
                mail: mail.toString()
            },
            attributes: ['mail', 'name', 'lastName']
        });
        if (usuario) {
            if (usuario.profesor) {
                await usuario.profesor.update({city:ciudad, foto:foto, description:description,title:education},{
                    where:{
                        User_mail:mail
                    }
                })
            } else {
                return res.send(`No existe un profesor asociado a la cuenta ${mail} así que primero debe crearlo`)
            }
        } else {
            return res.send(`No existe una cuenta con el correo ${mail}`)
        }
        usuario = await User.findOne({
            include: [{
                model: Profesor,
                required: true,
                attributes: ['city', 'foto', 'description']
            }],
            where: {
                mail: mail.toString()
            },
            attributes: ['mail', 'name', 'lastName']
        });
        return res.send(usuario);
    }
    return res.send('Indique un correo');
})

router.delete('/:mail', async (req: Request, res: Response) => {
    const mail = req.params.mail;
    const usuario = await User.findOne({
        include: [{
            model: Profesor
        }],
        where: {
            mail: mail.toString()
        },
        attributes: ['mail', 'nombre', 'apellido']
    });
    if (usuario) {
        if (usuario.profesor) {
            await Profesor.destroy({
                where: {
                    usuario: mail.toString()
                }
            });
            return res.send(`El profesor asociado a la cuenta ${mail} fue eliminado exitosamente`)
        } else {
            return res.send(`No existe ningún profesor asociado la cuenta del correo ${mail}`)
        }
    } else {
        return res.send(`No existe ninguna cuenta con el correo ${mail}`)
    }
});

export default router;
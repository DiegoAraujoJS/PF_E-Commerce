import { Request, Response, Router } from 'express'
import Profesor from '../models/Profesor';
import User from '../models/Usuario';
import { Op } from 'sequelize'
import Clase from '../models/Clase';
const router = Router();

type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]

// Horario es lo que manda el front
interface Horario{

    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    },
    disponible: arrayDePares,
    ocupado?: arrayDePares
}
// CalendarioResponse es lo que manda el back
type CalendarioResponse = Horario[]


// TodasLasSemanas lo puede mandar el front si el profesor pone ''tengo disponibles los lunes de 14 a 18''
interface TodasLasSemanas {
    dia: {
        nombre: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo',
    },
    disponible: arrayDePares,
}

// ejemplo
let ejemploProfe: CalendarioResponse = [
    {
        email: "edwardburgos@gmail.com",
        fecha: {
            anio: 2021,
            mes:7,
            dia: 7
        },
        disponible: [['11:45:00', '12:30:00']],
        ocupado:[['16:30:00', '19:29:00']]

    },
    {
        email: "edwardburgos@gmail.com",
        fecha: {
            anio: 2021,
            mes:11,
            dia: 12
        },
        disponible: [['12:29:00', '16:29:00']],
        ocupado:[['16:29:00', '19:29:00']]
    
        },
        {
            email: "edwardburgoseqw@gmail.com",
            fecha: {
                anio: 2021,
                mes:12,
                dia: 3
            },
            disponible: [['12:45:00', '16:30:00']],
            ocupado:[['18:30:00', '19:30:00']]
    
        },
        {
            email: "edwardburgosewq@gmail.com",
            fecha: {
                anio: 2021,
                mes:11,
                dia: 16
            },
            disponible: [['16:29:00', '16:29:00']],
            ocupado:[['16:29:00', '16:29:00']]
        
            }
]

router.get('/calendar/:id',(req: Request, res: Response) => {
    const id = req.params.id;
    var results = ejemploProfe.filter(e => e.email === id);
    console.log("Ruta calendario")
    return res.send(results)
    //"edwardburgos@gmail.com"
   
})
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
            attributes: ['mail', 'nombre', 'apellido']
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
        attributes: ['mail', 'nombre', 'apellido']
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
    nombre: string;
    mail: string;
}
router.get('/:mail', async (req: Request, res: Response) => {
    const mail = req.params.mail;
    const usuario: User | null = await User.findOne({
        include: [{
            model: Profesor,
            attributes: ['ciudad', 'foto', 'descripcion']
        }],
        where: {
            mail: mail.toString()
        },
        attributes: ['mail', 'nombre', 'apellido']
    });
    if (usuario) {
        if (usuario.profesor) {
            
            let obj: Prof = {
                    mail: usuario.mail,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    ciudad: usuario.profesor.ciudad,
                    foto: usuario.profesor.foto,
                    descripcion: usuario.profesor.descripcion,
                    id: usuario.id

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
                res.send(`El profesor ${usuario.nombre} ${usuario.apellido} aún no tiene clases registradas`)
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
                attributes: ['ciudad', 'foto', 'descripcion']
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

router.put('/', async (req: Request, res: Response) => {
    const { ciudad, foto, descripcion } = req.body;
    const mail = req.body.usuario;
    if (mail) {
        let usuario: any = await User.findOne({
            include: [{
                model: Profesor,
            }],
            where: {
                mail: mail.toString()
            },
            attributes: ['mail', 'nombre', 'apellido']
        });
        if (usuario) {
            if (usuario.profesor) {
                await usuario.profesor.update({ciudad, foto, descripcion})
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
                attributes: ['ciudad', 'foto', 'descripcion']
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
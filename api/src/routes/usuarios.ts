import { create } from 'domain';
import { Request, Response, Router } from 'express'
import User from './../models/Usuario'
import { Op } from 'sequelize'
import { isUser } from '../utils/isInterface';
import { hashPassword } from '../utils/auth';
const router = Router()
enum ErrorType { INCOMPLETE_INPUTS, ALREADY_EXISTS }
// Validar email
function validateEmail(email: string) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

// Devolver usuarios
router.get('/', async (req: Request, res: Response) => {
    try {
        const usuarios = await User.findAll()
        res.send(usuarios)
    } catch (error) {
        res.send(error);
    }
})



router.get('/all', async (req: Request, res: Response) => {
    try {
        let terminoBusqueda = req.query.nombre;
        let alumnos: User[] = [];
        if (terminoBusqueda) {
            terminoBusqueda = terminoBusqueda.toString()
            const query = 
            alumnos = await User.findAll({
                where: {
                    [Op.or]: [
                      {
                        name: {
                          [Op.iLike]: `%${req.query.nombre}%`
                        }
                      },
                      {
                        lastName: {
                          [Op.iLike]: `%${req.query.nombre}%`
                        }
                      },
                      {
                        User_mail: {
                          [Op.iLike]: `%${req.query.nombre}%`
                        }
                      }
                    ]
                  }
            })
            if (alumnos.length) {
                
                return res.send(alumnos)
            }
            return res.send(`No se encontraron coincidencias con ${terminoBusqueda}`)
        }
        alumnos = await User.findAll()
        if (alumnos.length) {
            
            return res.send(alumnos)
        }
        return res.send(`No se encontraron alumnos`)
    } catch (error) {
        res.send(error)
    }
})

// Devolver alumno por mail
router.get('/:mail', async (req: Request, res: Response) => {
    if (!validateEmail( req.params.mail)) return res.send('Send a valid mail');
    try {
        const mail = req.params.mail;
        const usuario = await User.findByPk(mail)
        if (usuario) {
                return res.send(usuario)
            } else {
                return res.send(`No existe ningún alumno asociado la cuenta del correo ${mail}`)
            }
        }
     catch (error) {
        return res.send(error);
    }
})

// Guardar un alumno
router.post('/', async (req: Request, res: Response) => {
    if (!isUser(req.body)) return res.status(401).send('request body does not respect interface IUser')
    if (!validateEmail( req.body.User_mail)) return res.status(402).send('Send a valid mail');
    if (!req.body.password) return res.status(403).send('You must send a password property within the body')
    try {
        const findUser = await User.findByPk(req.body.User_mail)
        if (findUser) res.send(`Ya existe un alumno asociado a la cuenta ${req.body.User_mail} así que debería actualizarlo`);             
        const user = await User.create({...req.body, password: hashPassword(req.body.password)})
        return res.send(user)
        
    } catch (error) {
        return res.send(error)
    }
})

// Actualizar un alumno
router.put('/', async (req: Request, res: Response) => {
    if (!isUser(req.body)) return res.status(400).send('request body does not respect interface IUser')
    if (!validateEmail( req.body.User_mail)) return res.send('Send a valid mail');
    try {
        const usuario = await User.findByPk(req.body.User_mail)
        if (! usuario) return res.send(`No existe un alumno asociado a la cuenta ${req.body.User_mail} así que primero debe crearlo`);
        const update = await usuario.update(req.body)
        return res.send(update); 
    } catch (error) {
        return res.send(error)
    }
})

// Eliminar alumno por mail    
router.delete('/:mail', async (req: Request, res: Response) => {
    if (!validateEmail( req.params.mail)) return res.send('Send a valid mail');
    try {
        const user = await User.findByPk(req.params.mail)
        if (!user) return res.send(`No existe ningún alumno asociado la cuenta del correo ${req.params.mail}`)
        await User.destroy({
            where: {
                User_mail: req.params.mail
            }
        });
        return res.send(`El alumno asociado a la cuenta ${req.params.mail} fue eliminado exitosamente`)
        
    } catch (error) {
        return res.send(error)
    }
})

export default router;


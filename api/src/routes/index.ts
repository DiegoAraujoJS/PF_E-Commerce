import {Router} from 'express'
import login from './login'
import usuarios from './usuarios'
import clases from './clases'
import profesores from './profesores'
import reclamos from './reclamos'
import chats from './chats'

import alumnos from './alumnos'
import calendario from './calendario'
import chats from './chats'

const router = Router()
router.use('/login', login)
router.use('/usuarios', usuarios)
router.use('/clases', clases)
router.use('/profesores', profesores)
router.use('/reclamos', reclamos)
router.use('/chats', chats)
router.use('/alumnos', alumnos)

export default router
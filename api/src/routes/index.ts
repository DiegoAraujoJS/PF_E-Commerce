import {Router} from 'express'
import login from './login'
import usuarios from './usuarios'
import clases from './clases'
import profesores from './profesores'
import reclamos from './reclamos'
const router = Router()
router.use('/login', login)
router.use('/usuarios', usuarios)
router.use('/clases', clases)
router.use('/profesores', profesores)
router.use('/reclamos', reclamos)

export default router
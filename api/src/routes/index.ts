import {Router} from 'express'
import login from './login'
import usuarios from './usuarios'
import clases from './clases'

const router = Router()
router.use('/login', login)
router.use('/usuarios', usuarios)
router.use('/clases', clases)

export default router
import {Router} from 'express'
import login from './login'
import verify from './verify'
import usuarios from './usuarios'
import clases from './clases'
import profesores from './profesores'
import reclamos from './reclamos'
import sessions from './session'
import alumnos from './alumnos'
import calendario from './calendario'
import allCountries from './allCountries'
import market from './market'
import carrito from './carrito'
import defineAccessGoogle from './defineAccessGoogle'
const router = Router()

router.use('/verify', verify)
router.use('/defineAccessGoogle', defineAccessGoogle)
router.use('/login', login)
router.use('/usuarios', usuarios)
router.use('/clases', clases)
router.use('/profesores', profesores)
router.use('/reclamos', reclamos)
router.use('/alumnos', alumnos)
router.use('/calendario', calendario)
router.use('/session', sessions)
router.use('/allCountries', allCountries)
router.use('/market', market)
router.use('/carrito', carrito)

export default router
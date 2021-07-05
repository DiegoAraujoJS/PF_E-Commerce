import {Router} from 'express'
import UserRoutes from './user'
import loginInfo from './login'
const router = Router()
router.use('/clases', UserRoutes)
router.use('/login', loginInfo)
export default router
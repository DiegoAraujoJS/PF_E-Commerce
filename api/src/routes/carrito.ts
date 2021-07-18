import Router from 'express'
import User from '../models/Usuario';

const router = Router()

router.get('./', function(){
    const compra = User.findByPk()
})

export default router
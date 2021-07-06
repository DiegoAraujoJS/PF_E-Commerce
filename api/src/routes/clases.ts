import {Request, Response, Router} from 'express'
import Clase from './../models/Clase'
import Profesor from '../models/Profesor'
const router = Router ()


router.get('/:materia/:ciudad', async (req: Request, res: Response) => {
    console.log(req.params)
    const {materia , ciudad} = req.params

    const clases = await Clase.findAll()
    let clasesFiltradas = clases.filter(clase => {
        return clase.materia === materia
    })
    console.log('clases', clases)
    console.log('clases filtradas ', clasesFiltradas)

    const profesores = await Profesor.findAll()
    let profesorFiltrados = profesores.filter(profesor => {return profesor.ciudad === ciudad})

    var result = [];
    for(var i=0; i < clasesFiltradas.length; i++){
         for(var j=0; j < profesorFiltrados.length; j++){
             console.log('clases filtradas ', clasesFiltradas[i], 'profesores filtrados ', profesorFiltrados[j])
             result.push('EJEMPLO') // Esto reemplazaó al comentario inferior
            /*if(clasesFiltradas[i].Profesor_mail === profesorFiltrados[j].nombre){ 
                result.push(clasesFiltradas[i])
            }*/
        }
    }
    res.send(result)
})

///////////
//////////

// propiedades notNull de Clase: 

router.post('/add', async (req: Request, res: Response) => {
    const clase = req.body
    try {
        const crearClase = await Clase.create(clase)
        res.send(crearClase)
    }
    catch (error) {
        res.send(error)
    }
})

router.put('/edit', async (req: Request, res: Response) => {
    const {id} = req.body
    try {
        
        const clase: any = await Clase.findByPk(id);
        console.log(clase)
        await clase.set(clase.descripcion = req.body.descripcion);
        await clase.save();
        const claseCambiada = await Clase.findByPk(id);
        res.send(claseCambiada)
    }
    catch (error) {
        res.send(error)
    }
})

router.post('/delete', async (req: Request, res: Response) => {
    const {id} = req.body
    try {
        await Clase.destroy({
            where: { id: id }
        }).then(e => res.send(`${e}`)).catch(err => res.send(err))
    }
    catch (error) {
        res.send(error)
    }
})

//////////
/////////



export default router;
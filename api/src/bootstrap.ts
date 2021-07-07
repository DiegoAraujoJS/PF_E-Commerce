import Clase from "./models/Clase"

import Profesor from "./models/Profesor"
import Rango from "./models/Rango"
import rango_profesor from "./models/rango_profesor"
import Reclamo from "./models/Reclamo"
import User from "./models/Usuario"




interface Usuario {
    nombre: string;
    email: string;
    apellido: string;
}
interface Prof {
    user: string;
}


const bootstrap = async () => {
    
    await User.create ( {
        nombre: `Juan`,
        apellido: 'perez',
        ciudad: 'Buenos Aires', 
        email: "juanperez1@gmail.com"
        })

    await User.create ( {
        nombre: `maria`,
        apellido: 'roman',
        ciudad: 'Buenos Aires',
        email: "juanperez2@gmail.com"
        })
    await User.create( {
        nombre: 'marcela',
        apellido: 'camargo',
        ciudad: 'rio negro',
        email: "juanperez3@gmail.com"
    })
    await User.create( {
        nombre: 'marcela',
        apellido: 'camargo',
        ciudad: 'rio negro',
        email: "juanperez4@gmail.com"
    })
    
    await Rango.create({
        inicio: 16,
        fin:18,
        dia: 'domingo'
    })
    await Profesor.create({
        email: "juanperez1@gmail.com",
        nombre: 'juan',
        apellido: 'perez',
        ciudad: 'Buenos Aires',
        foto: 'https://th.bing.com/th/id/R.bbd6b9be334faeaa4b22a4871ff0bbb5?rik=1B0Q9Fwrxax08Q&riu=http%3a%2f%2fcolegiosamigonianos.org%2fimages%2f20190520_DavidCampos.jpg&ehk=fA5%2f2V7qKpSxz3L5jxhk%2bfHpINRasEu2D3IbOSXAY3k%3d&risl=&pid=ImgRaw',
        descripcion: 'el mas capo'

    })
    await Profesor.create({
        email: "juanperez2@gmail.com",
        foto: 'https://www.lavanguardia.com/r/GODO/LV/p5/WebSite/2018/09/20/Recortada/img_mgonzaleza_20180920-103853_imagenes_lv_terceros_captura_de_pantalla_2018-09-20_a_las_100516-kLYF-U451929210924oeE-992x558@LaVanguardia-Web.png',
        nombre: 'mario',
        apellido: 'perralesi',
        ciudad: 'Buenos Aires',
        descripcion: 'el mas pulenta'

    })
    await Profesor.create({
        email: "juanperez3@gmail.com",
        nombre: 'juan',
        apellido: 'perez',
        ciudad: 'Buenos Aires',
        foto: 'https://img.ecartelera.com/noticias/33100/33196-m.jpg',
        descripcion: 'bueno con los niños'

    })
    await Profesor.create({
        email: "juanperez4@gmail.com",
        foto: 'https://lasnoticias.do/wordpress/wp-content/uploads/2020/08/img-20200829-wa04692046846957.jpg',
        nombre: 'juana',
        apellido: 'perez',
        ciudad: 'Buenos Aires',
        descripcion: 'El que mejor enseña'
    })

    await rango_profesor.create({
        email:"juanperez1@gmail.com",
        Rango_id: 1
    })

    await rango_profesor.create({
        email:"juanperez2@gmail.com",
        Rango_id: 1
    })
    

    await Clase.create({
        nombre: 'clases de matematica para chicos de quinto año',
        descripcion: 'en esta clase veremos derivadas con limites',
        puntuacion: 10,
        grado: 'quinto año',
        nivel: 'Secundaria',
        esPresencial: true,
        materia: 'matematica',
        Profesor_mail: "juanperez1@gmail.com"
    })
    await Clase.create({
        nombre: 'clases de ingenieria para personas en la carrera de ingenieria',
        descripcion: 'en esta clase veremos derivadas con limites',
        puntuacion: 7,
        grado: 'cuarto año',
        nivel: 'Terciario',
        esPresencial: false,
        materia: 'ingeniería',
        Profesor_mail: "juanperez2@gmail.com"
    })
    await Clase.create({
        nombre: 'clases de lengua para chicos de primaria',
        descripcion: 'veremos como se usan las tildes',
        puntuacion: 5,
        grado: 'sexto grado',
        nivel: 'primario',
        esPresencial: true,
        materia: 'lengua',
        Profesor_mail: "juanperez3@gmail.com"
    })
    await Clase.create({
        nombre: 'clases de quimica para estudiantes que quieran hacer ingreso a una universidad.',
        descripcion: 'en esta clase veremos la tabla periodióca y su uso correcto. Soy paciente y espero que cada uno avanze a su tiempo, asi que no tengas miedo en anotarte',
        puntuacion: 10,
        grado: 'primer año',
        nivel: 'Universitario',
        esPresencial: true,
        materia: 'Quimica',
        Profesor_mail: "juanperez4@gmail.com"
    })
    await Reclamo.create({
        Denunciante_email: "juanperez1@gmail.com",
        Denunciado_email: "juanperez2@gmail.com",
        Admin_email: "juanperez3@gmail.com"
        
    })


}
export default bootstrap
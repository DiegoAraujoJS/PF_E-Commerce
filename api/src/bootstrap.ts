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
    
    await User.create({
        nombre: `Diego`,
        apellido: 'Araujo',
        email: "diegoaraujo@gmail.com"
    })

    await User.create({
        nombre: `Braian`,
        apellido: 'Silva',
        email: "braiansilva@gmail.com"
    })

    await User.create({
        nombre: 'Edward',
        apellido: 'Burgos',
        email: "edwardburgos@gmail.com"
    })

    await User.create({
        nombre: 'Javier',
        apellido: 'Carro',
        email: "javiercarro@gmail.com"
    })

    await Profesor.create({
        usuario: "diegoaraujo@gmail.com",
        ciudad: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    await Profesor.create({
        usuario: "braiansilva@gmail.com",
        ciudad: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    await Profesor.create({
        usuario: "edwardburgos@gmail.com",
        ciudad: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    // Parte II

    await Rango.create({
        inicio: 16,
        fin: 18,
        dia: 'domingo'
    })

    await rango_profesor.create({
        email: "diegoaraujo@gmail.com",
        Rango_id: 1
    })

    await rango_profesor.create({
        email: "braiansilva@gmail.com",
        Rango_id: 1
    })
    await rango_profesor.create({
        email: "edwardburgos@gmail.com",
        Rango_id: 1
    })

    await Clase.create({
        nombre: 'Sumas y Restas',
        profesor: "edwardburgos@gmail.com",
        descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
        materia: 'Matemática',
        grado: "Primer grado",
        nivel: 'Primario'
    })
    await Clase.create({
        nombre: 'Aprende a comunicar',
        profesor: "edwardburgos@gmail.com",
        descripción: 'Aprende a comunicarte asertivamente con tu entorno',
        materia: 'Comunicación',
        grado: "Cuarto grado",
        nivel: 'Terciario'
    })

    await Clase.create({
        nombre: 'Inglés para jóvenes',
        profesor: "edwardburgos@gmail.com",
        descripción: 'En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés',
        materia: 'Inglés',
        grado: "Sexto grado",
        nivel: 'Secundario'
    })

    await Clase.create({
        materia: 'matematica',
        profesor: "diegoaraujo@gmail.com",
        grado: "primer grado"
    })
    await Clase.create({
        materia: 'matematica',
        profesor: "braiansilva@gmail.com",
        grado: "primer grado"
    })
    await Reclamo.create({
        Denunciante_email: "edwardburgos@gmail.com",
        Denunciado_email: "braiansilva@gmail.com",
        Admin_email: "juanperez3@gmail.com"
        
    })


}
export default bootstrap
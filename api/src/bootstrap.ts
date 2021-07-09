import Alumno from "./models/Alumno"
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
        mail: "diegoaraujo@gmail.com"
    })

    await User.create({
        nombre: `Braian`,
        apellido: 'Silva',
        mail: "braiansilva@gmail.com"
    })

    await User.create({
        nombre: 'Edward',
        apellido: 'Burgos',
        mail: "edwardburgos@gmail.com"
    })

    await User.create({
        nombre: 'Javier',
        apellido: 'Carro',
        mail: "javiercarro@gmail.com"
    })
    await User.create({
        nombre: 'Mauro',
        apellido: 'Leonel',
        mail: "mauroleonel@gmail.com"
    })

    

    await Profesor.create({
        nombre: `Diego`,
        apellido: 'Araujo',
        User_mail: "diegoaraujo@gmail.com",
        ciudad: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    await Profesor.create({
        nombre: `Braian`,
        apellido: 'Silva',
        User_mail: "braiansilva@gmail.com",
        ciudad: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    await Profesor.create({
        nombre: 'Edward',
        apellido: 'Burgos',
        User_mail: "edwardburgos@gmail.com",
        ciudad: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })
    await Profesor.create({
        nombre: 'Mauro',
        apellido: 'Leonel',
        User_mail: "mauroleonel@gmail.com",
        ciudad: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })
    await Profesor.create({
        nombre: 'Javier',
        apellido: 'Carro',
        User_mail: "javiercarro@gmail.com",
        ciudad: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    // Parte II

    await Alumno.create({
        User_usuario: "mauroleonel@gmail.com",
        ciudad: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Alumno"
    })

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
        Profesor_mail: "edwardburgos@gmail.com",
        descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
        materia: 'Matemática',
        grado: "Primer grado",
        nivel: 'Primario'
    })
    await Clase.create({
        nombre: 'Aprende a comunicar',
        Profesor_mail: "edwardburgos@gmail.com",
        descripción: 'Aprende a comunicarte asertivamente con tu entorno',
        materia: 'Comunicación',
        grado: "Cuarto grado",
        nivel: 'Terciario'
    })

    await Clase.create({
        nombre: 'Inglés para jóvenes',
        Profesor_mail: "edwardburgos@gmail.com",
        descripción: 'En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés',
        materia: 'Inglés',
        grado: "Sexto grado",
        nivel: 'Secundario'
    })

    await Clase.create({
        materia: 'matematica',
        Profesor_mail: "diegoaraujo@gmail.com",
        grado: "primer grado"
    })
    await Clase.create({
        materia: 'matematica',
        Profesor_mail: "braiansilva@gmail.com",
        grado: "primer grado"
    })
    await Reclamo.create({
        Denunciante_email: "edwardburgos@gmail.com",
        Denunciado_email: "braiansilva@gmail.com",
        Admin_email: "juanperez3@gmail.com"
        
    })


    


}
export default bootstrap
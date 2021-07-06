import Clase from "./models/Clase"
import Profesor from "./models/Profesor"
import Rango from "./models/Rango"
import rango_profesor from "./models/rango_profesor"
import User from "./models/Usuario"

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
        ciudad: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        descripcion: "Profesor apasionado por enseñar"
    })

    // Parte II

    await Rango.create({
        inicio: 16,
        fin: 18,
        dia: 'domingo'
    })

    // await rango_profesor.create({
    //     email: "diegoaraujo@gmail.com",
    //     Rango_id: 1
    // })

    // await rango_profesor.create({
    //     email: "braiansilva@gmail.com",
    //     Rango_id: 1
    // })
    // await rango_profesor.create({
    //     email: "edwardburgos@gmail.com",
    //     Rango_id: 1
    // })

    // await Clase.create({
    //     materia: 'matematica',
    //     Profesor_mail: "edwardburgos@gmail.com",
    //     grado: "primer grado"
    // })
    // await Clase.create({
    //     materia: 'lengua',
    //     Profesor_mail: "javiercarro@gmail.com",
    //     grado: "primer grado"
    // })
    // await Clase.create({
    //     materia: 'ingles',
    //     Profesor_mail: "diegoaraujo@gmail.com",
    //     grado: "primer grado"
    // })
    // await Clase.create({
    //     materia: 'lengua',
    //     Profesor_mail: "braiansilva@gmail.com",
    //     grado: "primer grado"
    // })

}

export default bootstrap;

// clases.filter(clase.materia === materia && clase.profesor.ciudad === ciudad)

// @Column
// nombre!: string;

// @ForeignKey(() => Provincia)
// @Column 
// provincia_id!: number;

// @Column
// puntuacion!: number;

// @Column
// grado!: string;

// @Column
// nivel!: string;

// @Column
// materia!: string;

// @Column
// descripcion!: string;

// @Column
// profesor!: string
// provincia_id: 1,
// puntuacion: 3,
// grado: 'primer año',
// nivel: 'Secundaria',
// materia: 'matematica',
// descripcion: 'en esta clase veremos derivadas con limites',
// profesor: {
//     nombre: 'Rodrigo' + i,
//     apellido: "Ayala" + i,
//     email: `RodrigoAyala${i}@gmail.com`,
//     foto: 'https://pbs.twimg.com/profile_images/1347614168531283971/B3WveAU6_400x400.jpg',
//     descripcion: 'soy el mas grande papa',
//     ciudad: 'Buenos Aires'

// await Clase.create( {
    //     materia: 'lengua',
    //     profesor: 'maria',
    //     grado: "primer grado"
    // })
    // await Clase.create({
    //     materia: 'lengua',
    //     profesor: 'marcela',
    //     grado: "primer grado"
    // })



// const profesores = indices.map(i => {
//         return {
//           nombre: 'Rodrigo' + i,
//           apellido: "Ayala" + i,
//           email: `RodrigoAyala${i}@gmail.com`,
//           foto: 'https://pbs.twimg.com/profile_images/1347614168531283971/B3WveAU6_400x400.jpg',
//           descripcion: 'soy el mas grande papa',
//           ciudad: 'Buenos Aires'
//         }
//         }
//     )


// interface Usuario {
//     nombre: string;
//     email: string;
//     apellido: string;
// }
// interface Prof {
//     user: string;
// }

// import Clase from './Clase'
// import Profesor from './Profesor'
// import Usuario from './Usuario'
// import Provincia from './Provincia'
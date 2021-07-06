// import Clase from './Clase'
// import Profesor from './Profesor'
// import Usuario from './Usuario'
// import Provincia from './Provincia'
import Clase from "./models/Clase"

import Profesor from "./models/Profesor"
import Rango from "./models/Rango"
import rango_profesor from "./models/rango_profesor"

import User from "./models/Usuario"



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
interface Usuario {
    nombre: string;
    email: string;
    apellido: string;
}
interface Prof {
    user: string;
}


const bootstrap = async () => {
    
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
    await User.create ( {
        nombre: `Juan`,
        apellido: 'perez',
        ciudad: 'Buenos Aires', 
        email: "juanperez@gmail.com"
        })

    await User.create ( {
        nombre: `maria`,
        apellido: 'roman',
        ciudad: 'Buenos Aires',
        email: "juanperedz@gmail.com"
        })
    await User.create( {
        nombre: 'marcela',
        apellido: 'camargo',
        ciudad: 'rio negro',
        email: "juanpaerez@gmail.com"
    })
    
    await Rango.create({
        inicio: 16,
        fin:18,
        dia: 'domingo'
    })
    await Profesor.create({
        email: "juanpaerez@gmail.com",

    })
    await Profesor.create({
        email: "juanperedz@gmail.com",

    })

    await rango_profesor.create({
        email:"juanpaerez@gmail.com",
        Rango_id: 1
    })

    await rango_profesor.create({
        email:"juanperedz@gmail.com",
        Rango_id: 1
    })
    

    
    

    await Clase.create( {
        materia: 'matematica',
        Profesor_mail: "juanpaerez@gmail.com",
        grado: "primer grado"
        })

}



// clases.filter(clase.materia === materia && clase.profesor.ciudad === ciudad)


export default bootstrap
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
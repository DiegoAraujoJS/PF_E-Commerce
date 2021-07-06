// import Clase from './Clase'
// import Profesor from './Profesor'
// import Usuario from './Usuario'
// import Provincia from './Provincia'
import Clase from "./models/Clase"
import Profesor from "./models/Profesor"
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

const bootstrap = async () => {
    await Clase.create( {
        materia: 'matematica',
        profesor: 'Juan',
        grado: "primer grado"
    })
        await Clase.create( {
            materia: 'lengua',
            profesor: 'maria',
            grado: "primer grado"
        })
        await Clase.create({
            materia: 'lengua',
            profesor: 'marcela',
            grado: "primer grado"
        })
    
    
        await Profesor.create ( {
            nombre: `Juan`,
            apellido: 'perez',
            ciudad: 'Buenos Aires'
            })
    
        await Profesor.create ( {
            nombre: `maria`,
            apellido: 'roman',
            ciudad: 'Buenos Aires'
            })
        await Profesor.create( {
            nombre: 'marcela',
            apellido: 'camargo',
            ciudad: 'rio negro'
        })
        console.log((await Clase.findAll()).map(obj => [obj.materia, obj.profesor]))
        console.log((await Profesor.findAll()).map(profe => [profe.nombre, profe.ciudad]))        
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
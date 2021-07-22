import { ProfesorProps, UserProps } from "../../interfaces"
import Alumno from "./models/Alumno"
import Clase from "./models/Clase"
import axios from "axios"
import Profesor from "./models/Profesor"

import Reclamo from "./models/Reclamo"
import User from "./models/Usuario"
import { Role } from "../../interfaces"

const bootstrap = async () => {

    const d: UserProps = {
        name: `Diego`,
        lastName: 'Araujo',
        mail: "diegoaraujo@gmail.com",
        role: Role.ADMIN ,
        city: "Buenos Aires"
    }
    const Diego = {...d, password:"123456"}

    const b: UserProps = {
        name: `Braian`,
        lastName: 'Silva',
        mail: "braiansilva@gmail.com",
        role: Role.ADMIN,
        city: "Buenos Aires"
    }
    const Braian = {...b, password:"123456"}

    const e: UserProps = {
        name: 'Edward',
        lastName: 'Burgos',
        mail: "edwardburgos@gmail.com",
        role: Role.USER,
        city: "Cordoba"
    }
    const Edward = {...e, password:"123456"}

    const j: UserProps = {
        name: 'Javier',
        lastName: 'Carro',
        mail: "javiercarro@gmail.com",
        role: Role.USER,
        city: "Lima"
    }
    const Javi = {...j, password:"123456"}

    const m: UserProps = {
        name: 'Mauro',
        lastName: 'Leonel',
        mail: "mauroleonel@gmail.com", 
        role: Role.PROFESSOR,
        city: "Lima"
    }
    const Mauro = {...m, password:"123456"}


    

    const DiegoProfe: ProfesorProps = {
        name: `Diego`,
        lastName: 'Araujo',
        User_mail: "diegoaraujo@gmail.com",
        city: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        
        
    }

    const BraianProfe: ProfesorProps = {
        name: `Braian`,
        lastName: 'Silva',
        User_mail: "braiansilva@gmail.com",
        city: "Buenos Aires",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        
    }

    const EdwardProfe: ProfesorProps = {
        name: 'Edward',
        lastName: 'Burgos',
        User_mail: "edwardburgos@gmail.com",
        
        city: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar"
    }
    const MauroProfe: ProfesorProps = {
        name: 'Mauro',
        lastName: 'Leonel',
        User_mail: "mauroleonel@gmail.com",
        city: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        
    }
    const JaviProfe: ProfesorProps = {
        name: 'Javier',
        lastName: 'Carro',
        User_mail: "javiercarro@gmail.com",
        city: "Lima",
        foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
        description: "Profesor apasionado por enseñar",
        
    }

    for (const x of [Diego, Braian, Edward, Mauro, Javi]) {
        await axios.post(`http://localhost:3001/api/session/register`, x)
    }
    for (const x of [DiegoProfe, BraianProfe, EdwardProfe, MauroProfe, JaviProfe]){
        await Profesor.create(x)
    }

    // Parte II

    // await Alumno.create({
    //     User_usuario: "mauroleonel@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno"
    // })

    

    // await Alumno.create({
    //     User_usuario: "usuario1@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno 1"
    // })

    

    // await Alumno.create({
    //     User_usuario: "usuario2@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno 2"
    // })

    // await User.create({
    //     nombre: 'Usuario 3 Nombre',
    //     apellido: 'Usuario 3 Apellido',
    //     mail: "usuario3@gmail.com"
    // })

    // await Alumno.create({
    //     User_usuario: "usuario3@gmail.com",
    //     ciudad: "Lima",
    //     foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
    //     descripcion: "Alumno 3"
    // })


    // await Rango.create({
    //     inicio: 16,
    //     fin: 18,
    //     dia: 'domingo'
    // })

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
    //     nombre: 'Sumas y Restas',
    //     Profesor_mail: "edwardburgos@gmail.com",
    //     descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
    //     materia: 'Matematica',
    //     esPresencial: 'Virtual',
    //     grado: "Primer grado",
    //     nivel: 'Primario',
    //     puntuacion: 5,
    //     date:  {year: 2021, month: 8, day: 7, time: ['08:00:00','12:00:00']},
    //     precio: "$2000"
    // })
    // await Clase.create({
    //     nombre: 'Aprende a comunicar',
    //     Profesor_mail: "edwardburgos@gmail.com",
    //     descripcion: 'Aprende a comunicarte asertivamente con tu entorno',
    //     materia: 'Comunicacion',
    //     esPresencial: 'Virtual',
    
    //     grado: "Cuarto grado",
    //     nivel: 'Terciario',
    //     puntuacion: 3,
    //     date:  {year: 2021, month: 8, day: 7, time:  ['20:00:00','24:00:00']},
    //     precio: "$2000"
    // })

    await Clase.create({
        nombre: 'Historia',
        Profesor_mail: "braiansilva@gmail.com",
        User_mail: 'edwardburgos@gmail.com',
        descripcion: 'En esta clase te enseñaré todo lo que necesitas de Historia',
        materia: 'Historia',
        esPresencial: 'Virtual',
        status: 'complete',
        grado: "Sexto grado",
        nivel: 'Secundario',
        puntuacion: 4.20,
        date:  {year: 2021, month: 8, day: 7, time:  ['12:00:00','17:00:00']},
        precio: "$2000"
    })    

    await Clase.create({
        nombre: 'Filosofia',
        Profesor_mail: "diegoaraujo@gmail.com",
        User_mail: 'edwardburgos@gmail.com',
        descripcion: 'En esta clase te enseñaré todo lo que necesitas de Filosofia',
        materia: 'Filosofia',
        esPresencial: 'Presencial',
        status: 'pending',
        grado: "Sexto grado",
        nivel: 'Terciario',
        puntuacion: 4,
        date:  {year: 2021, month: 8, day: 7, time:  ['08:00:00','10:00:00']},
        precio: "$2000",
    })


    await Clase.create({
        nombre: 'Inglés para jóvenes',
        Profesor_mail: "edwardburgos@gmail.com",
        descripcion: 'En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés',
        materia: 'Ingles',
        esPresencial: 'Presencial',
        status: 'pending',
        grado: "Sexto grado",
        nivel: 'Secundario',
        puntuacion: 1,
        date:  {year: 2021, month: 8, day: 7, time:  ['15:00:00','19:00:00']},
        precio: "$2000"
    })
    
    

    // await Clase.create({
    //     nombre: 'Sumas y Restas',
    //     User_mail: "edwardburgos@gmail.com",
    //     descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
    //     materia: 'Matematica',
    //     status: 'pending',
    //     esPresencial: 'Virtual',
    //     grado: "Primer grado",
    //     nivel: 'Primario',
    //     puntuacion: 5,
    //     date:  {year: 2021, month: 8, day: 7, time: ['08:00:00','12:00:00']},
    //     precio: "$2000"
    // })

    // await Clase.create({
    //     nombre: 'Sumas y Restas',
    //     User_mail: 'braiansilva@gmail.com',
    //     descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
    //     materia: 'Matematica',
    //     status: 'pending',
    //     esPresencial: 'Virtual',
    //     grado: "Primer grado",
    //     nivel: 'Primario',
    //     puntuacion: 5,
    //     date:  {year: 2021, month: 8, day: 7, time: ['08:00:00','12:00:00']},
    //     precio: "$2000"
    // })


}
export default bootstrap

// await User.create({
//     nombre: 'Usuario 1 Nombre',
//     apellido: 'Usuario 1 Apellido',
//     mail: "usuario1@gmail.com"
// })
// await User.create({
//     nombre: 'Usuario 2 Nombre',
//     apellido: 'Usuario 2 Apellido',
//     mail: "usuario2@gmail.com"
// })
import { IProfesor, IUser } from "../../interfaces"
import Clase from "./models/Clase"
import axios from "axios"
import Profesor from "./models/Profesor"
import Reclamo from "./models/Reclamo";
import User from "./models/Usuario";
import { Role } from "../../interfaces";

const bootstrap = async () => {
    try {
        //////////////////////
        // Agregar Usuarios //
        //////////////////////

        const d: IUser = {
            name: `Diego`,
            lastName: 'Araujo',
            User_mail: "diegoaraujo@gmail.com",
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Diego = {...d, password:"123456"}
    
        const b: IUser = {
            name: `Braian`,
            lastName: 'Silva',
            User_mail: "braiansilva@gmail.com",
            role: Role.ADMIN,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Braian = {...b, password:"123456"}
    
        const e: IUser = {
            name: 'Edward',
            lastName: 'Burgos',
            User_mail: "edwardburgos@gmail.com",
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Edward = {...e, password:"123456"}
    
        const j: IUser = {
            name: 'Javier',
            lastName: 'Carro',
            User_mail: "javiercarro@gmail.com",
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Javi = {...j, password:"123456"}
    
        const m: IUser = {
            name: 'Mauro',
            lastName: 'Leonel',
            User_mail: "mauroleonel@gmail.com", 
            role: Role.PROFESSOR,
            
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Mauro = {...m, password:"123456"}

        const ben: IUser = {
            name: 'Benja',
            lastName: 'Spiecker',
            User_mail: "benjaminspiecker@gmail.com", 
            role: Role.PROFESSOR,
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Benja = {...ben, password:"123456"}

        const ped: IUser = {
            name: 'Pedro',
            lastName: 'Pérez',
            User_mail: "pedro@gmail.com", 
            role: Role.USER,
                country: "Argentina",
                state: "Buenos Aires",
                city: "Ciudad Autónoma de Buenos aires",
                foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            
        }
        const Pedro = {...ped, password:"123456"}

        for (const user of [
            Edward,
            Braian,
            Diego,
            Javi,
            Mauro,
            Benja,
            Pedro
        ]) {
            await axios.post(`htttp://localhost:3001/api/usuarios/register`, user)
        }
    

        ////////////////////////
        // Agregar Profesores //
        ////////////////////////

        const DiegoProfe: IProfesor = {
            name: `Diego`,
            lastName: "Araujo",
            User_mail: "diegoaraujo@gmail.com",
            city: "Buenos Aires",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };

        const BraianProfe: IProfesor = {
            name: `Braian`,
            lastName: "Silva",
            User_mail: "braiansilva@gmail.com",
            city: "Buenos Aires",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };

        const EdwardProfe: IProfesor = {
            name: "Edward",
            lastName: "Burgos",
            User_mail: "edwardburgos@gmail.com",
            city: "Lima",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };
        const MauroProfe: IProfesor = {
            name: "Mauro",
            lastName: "Leonel",
            User_mail: "mauroleonel@gmail.com",
            city: "Lima",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            title: "Ingenierio Industrial",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };
        const JaviProfe: IProfesor = {
            name: "Javier",
            lastName: "Carro",
            User_mail: "javiercarro@gmail.com",
            city: "Lima",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description: "Profesor apasionado por enseñar",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };
        const BenjaProfe: IProfesor = {
            name: "Benjamín Ismael",
            lastName: "Spiecker",
            User_mail: "benjaminspiecker@gmail.com",
            city: "Buenos Aires",
            foto: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=547&q=80",
            description:
                "Si hablan fuera de turno, hay tabla. Si miran por la ventana, hay tabla. Si miran mis sandalias, hay tabla. Si sacan menos de 9, sea quien sea, hay tabla",
            score: 0,
            country: 'Argentina',
            state: 'Buenos Aires'
        };

        // for (const prof of [
        //     DiegoProfe,
        //     BraianProfe,
        //     EdwardProfe,
        //     MauroProfe,
        //     JaviProfe,
        //     BenjaProfe,
        // ]) {
        //     await Profesor.create(prof);
        // }

        ////////////////////
        // Agregar Clases //
        ////////////////////

        const Clase1 = await Clase.create({
            nombre: "Clase 1 de Ingles",
            Profesor_mail: "edwardburgos@gmail.com",
            descripcion:
                "En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés",
            materia: "Ingles",
            esPresencial: "Presencial",
            grado: "Sexto grado",
            nivel: "Secundario",
            puntuacion: 1,
            date: { year: 2021, month: 8, day: 7, time: ["15:00:00", "19:00:00"] },
            precio: "200",
            
        });

        const Clase2 = await Clase.create({
            nombre: "Clase 2 de Matematica",
            User_mail: "edwardburgos@gmail.com",
            descripcion: "Aprende a sumar y restar para ser el mejor de tu clase",
            materia: "Matematica",
            esPresencial: "Virtual",
            grado: "Primer grado",
            nivel: "Primario",
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ["08:00:00", "12:00:00"] },
            precio: "100",
        });

        const Clase3 = await Clase.create({
            nombre: "Clase 3 de Matematica",
            User_mail: "braiansilva@gmail.com",
            descripcion: "Aprende a sumar y restar para ser el mejor de tu clase",
            materia: "Matematica",
            esPresencial: "Virtual",
            grado: "Primer grado",
            nivel: "Primario",
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ["08:00:00", "12:00:00"] },
            precio: "100",
        });
        const Clase8 = await Clase.create({
            nombre: "Clase 4 de Matematica",
            Profesor_mail: "mauroleonel@gmail.com",
            User_mail: "braiansilva@gmail.com",
            descripcion: "Aprende a sumar y restar para ser el mejor de tu clase",
            materia: "Matematica",
            esPresencial: "Virtual",
            grado: "Primer grado",
            nivel: "Primario",
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ["08:00:00", "12:00:00"] },
            precio: "100",
            status:"cancelled"
        });

        const Clase4 =await Clase.create({
            nombre: 'Clase 5 de Historia',
            Profesor_mail: "edwardburgos@gmail.com",
            User_mail: 'mauroleonel@gmail.com',
            descripcion: 'En esta clase te enseñaré todo lo que necesitas de Historia',
            materia: 'Historia',
            esPresencial: 'Virtual',
            status: 'complete',
            grado: "Sexto grado",
            nivel: 'Secundario',
            puntuacion: 4.20,
            date: { year: 2021, month: 8, day: 7, time: ['12:00:00', '17:00:00'] },
            precio: "200"
        })

        const Clase5 = await Clase.create({
            nombre: 'Clase 6 de Filosofia',
            Profesor_mail: "diegoaraujo@gmail.com",
            User_mail: 'mauroleonel@gmail.com',
            descripcion: 'En esta clase te enseñaré todo lo que necesitas de Filosofia',
            materia: 'Filosofia',
            esPresencial: 'Presencial',
            status: 'pending',
            grado: "Sexto grado",
            nivel: 'Terciario',
            puntuacion: 4,
            date: { year: 2021, month: 8, day: 7, time: ['08:00:00', '10:00:00'] },
            precio: "200",
        })

        const Clase6 = await Clase.create({
            nombre: 'Clase 7 de Ingles',
            Profesor_mail: "edwardburgos@gmail.com",
            descripcion: 'En esta clase te enseñaré todo lo que necesitas para tener un nivel intermedio de Inglés',
            materia: 'Ingles',
            esPresencial: 'Presencial',
            status: 'pending',
            grado: "Sexto grado",
            nivel: 'Secundario',
            puntuacion: 1,
            date: { year: 2021, month: 8, day: 7, time: ['15:00:00', '19:00:00'] },
            precio: "200"
        })

        const Clase7 = await Clase.create({
            nombre: 'Clase 8 de Matematica',
            Profesor_mail: "edwardburgos@gmail.com",
            descripcion: 'Aprende a sumar y restar para ser el mejor de tu clase',
            materia: 'Matematica',
            esPresencial: 'Virtual',
            grado: "Primer grado",
            nivel: 'Primario',
            puntuacion: 5,
            date: { year: 2021, month: 8, day: 7, time: ['08:00:00', '12:00:00'] },
            precio: "200"
        })


        // //////////////////////
        // // Agregar Reclamos //
        // //////////////////////
        

        // /* Reclamo 1 */

        const reclamo1 = await Reclamo.create({
            nombre: "Profesor estafador",
            reclamo: "El profesor no se presento a la clase",
        });

        const denunciante = await User.findByPk("benjaminspiecker@gmail.com");
        await denunciante?.$add("denuncias_hechas", [reclamo1]);

        const denunciado = await User.findByPk("edwardburgos@gmail.com");
        await denunciado?.$add("denuncias_recibidas", [reclamo1]);

        const admin = await User.findByPk("braiansilva@gmail.com");
        await admin?.$add("denuncias_administradas", [reclamo1]);

        const clase = await Clase.findByPk(1);
        await clase?.$add("clase", [reclamo1]);
    
        /* Reclamo 2 */
    
        const reclamo2 = await Reclamo.create({
            nombre: "Ayuda",
            reclamo: "Me cobró 500 pesos en la boleta de pago pero despues me pidio que le pague 300 mas",
        });
        const denunciante2 = await User.findByPk("javiercarro@gmail.com");
        await denunciante2?.$add("denuncias_hechas", [reclamo2]);

        const denunciado2 = await User.findByPk("edwardburgos@gmail.com");
        await denunciado2?.$add("denuncias_recibidas", [reclamo2]);

        const admin2 = await User.findByPk("braiansilva@gmail.com");
        await admin2?.$add("denuncias_administradas", [reclamo2]);

        const clase2 = await Clase.findByPk(2);
        await clase2?.$add("clase", [reclamo2]);
    
         /* Reclamo 3 */
    
         const reclamo3 = await Reclamo.create({
            nombre: "Alumno Problemático",
            reclamo: "El profesor no entendia bien el contenido de la materia",
        });
        const denunciante3 = await User.findByPk("diegoaraujo@gmail.com");
        await denunciante3?.$add("denuncias_hechas", [reclamo3]);

        const denunciado3 = await User.findByPk("edwardburgos@gmail.com");
        await denunciado3?.$add("denuncias_recibidas", [reclamo3]);

        const admin3 = await User.findByPk("braiansilva@gmail.com");
        await admin3?.$add("denuncias_administradas", [reclamo3]);

        const clase3 = await Clase.findByPk(3);
        await clase3?.$add("clase", [reclamo3]);
    } catch(err) {
        console.log(err)
    }
}
export default bootstrap

interface UserProps {
    name: string;
    lastName: string;
    mail: string;
    role: number;
    city: string;
}
// En el file Calendar.js hay un Role admin no importado seteado en 2. Considerarlo si cambia Role
enum Role {USER, PROFESSOR, ADMIN}
type Time = [`${number}${number}:${number}${number}:00`, `${number}${number}:${number}${number}:00`]
type ArrayDePares = Time[]

interface ClasePorComprar {
    id: number;
    imagen: string;
    nombre: string;
    precioDescuento: number;
    precioOriginal: number;
    dia: `${number}${number}/${number}${number}/${number}${number}${number}${number}`;
    horaInicio: `${number}${number}:${number}${number} ${'PM' | 'AM'}`;
    horaFin: `${number}${number}:${number}${number} ${'PM' | 'AM'}`;
    profesor: string;
}

interface Horario {
    email: string;
    fecha: {
        anio: any,
        mes: any,
        dia: any
    };
    disponible: ArrayDePares;
    ocupado: ArrayDePares | null;
}

interface Disponible{
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    };
    disponible: ArrayDePares;
}
interface Ocupado {
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    };
    ocupado: ArrayDePares;
}

type CalendarioResponse = Horario[]

interface ProfesorProps {
    lastName: string
    city: string
    description: string
    foto: string
    name: string;
    User_mail: string;
    score?: number; 
    puntuacionesHowMany?: number
}


interface IClase{
    id?: number;
    nombre: string;
    grado: string;
    nivel: string;
    materia: string;
    descripcion: string;
    ciudad: string;
    date: {year: number, month: number, day: number, time: Time}
    Profesor_mail?: string,
    User_mail?: string,
    precio: number|string,
}
type DisponibleOcupadoTransform = {disponible: Disponible, ocupado: Ocupado}


interface Class {
    id?: number;
    nombre: string;
    descripcion: string;
    puntuacion: number;
    materia: string;
    grado: string;
    nivel: string;
    esPresencial: boolean;
    profesor: Profesor;
    date: {year: number, month: number, day: number, time: Time};
    precio: string;
    Profesor_mail?: string;
    User_mail?: string;
}

interface Profesor extends User {
    ciudad: string;
    foto: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
}

interface User {
    name: string;
    lastName: string;
    User_mail: string;
    score: number;
    city: string;
}


interface Claim {
    Denunciante_email: string,
    Denunciado_email: string,
    reclamo: {nombre:string, detalle:string}
}

export type {UserProps, ArrayDePares, Disponible, Ocupado, CalendarioResponse, ProfesorProps, Horario, Time, DisponibleOcupadoTransform, IClase, ClasePorComprar, Class, Profesor, User, Claim}

export {Role}

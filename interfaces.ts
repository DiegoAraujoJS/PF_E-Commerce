interface UserProps {
    name: string;
    lastName: string;
    mail: string;
    role: number;
}

enum Role {USER, PROFESSOR, ADMIN}

type ArrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]

interface Horario {
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
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
    score: number;
}

interface Fecha {
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    };
    disponible: ArrayDePares[] | string[][];
    ocupado: ArrayDePares[] | null | string[][];
}

export type {UserProps, ArrayDePares, Disponible, Ocupado, CalendarioResponse, ProfesorProps, Horario, Fecha}
export {Role}
interface UserProps {
    name: string;
    lastName: string;
    mail: string;
    role: number;
}

enum Role {USER, PROFESSOR, ADMIN}

type ArrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]

interface Horario{

    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    },
    disponible: ArrayDePares,
    ocupado?: ArrayDePares
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


export type {UserProps, ArrayDePares, Horario, CalendarioResponse, ProfesorProps}
export {Role}
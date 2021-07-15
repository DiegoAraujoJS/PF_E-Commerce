interface UserProps {
    name: string;
    lastName: string;
    mail: string;
    role: number;
}
// En el file Calendar.js hay un Role admin no importado seteado en 2. Considerarlo si cambia Role
enum Role {USER, PROFESSOR, ADMIN}
type Time = [`${number}:${number}:00`, `${number}:${number}:00`]
type ArrayDePares = Time[]

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


export type {UserProps, ArrayDePares, Disponible, Ocupado, CalendarioResponse, ProfesorProps, Horario, Time}
export {Role}

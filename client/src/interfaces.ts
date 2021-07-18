export interface Class {
    nombre: string;
    descripcion: string;
    puntuacion: number;
    materia: string;
    grado: string;
    nivel: string;
    esPresencial: boolean;
    profesor: Profesor;
    date: {year: number, month: number, day: number, time: [`${number}:${number}:00`, `${number}:${number}:00`]}
}

export interface Profesor extends User {
    ciudad: string;
    foto: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
}
export interface User {
    name: string;
    lastName: string;
    User_mail: string;
    score: number;
    city: string;
}
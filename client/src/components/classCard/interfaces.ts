export interface Class {
    nombre: string;
    descripcion: string;
    puntuacion: number;
    materia: string;
    grado: string;
    nivel: string;
    esPresencial: boolean;
    profesor: Profesor  
}

export interface Profesor extends User {
    ciudad: string;
    foto: string;
    descripcion: string;
    createdAt: string;
    updatedAt: string;
}
export interface User {
    nombre: string;
    apellido: string;
    email: string;
}
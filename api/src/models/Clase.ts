import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export default class Clase extends Model<Clase> {
    @Column
    nombre!: string;

    @Column
    provincia_id!: number;

    @Column
    puntuacion!: number;

    @Column
    grado!: string;

    @Column
    nivel!: string;

    @Column
    materia!: string;

    @Column
    descripcion!: string;

    @Column
    profesor!: string

}

// const Clase =  sequelize.define('Clase', {
//     nombre: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     puntuacion: {
//         type: DataType.FLOAT,
//         allowNull: false
//     },
//     grado: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     nivel: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     materia: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     descripcion: {
//         type: DataType.TEXT,
//         allowNull: false
//     },
//     // nombre: 'Clase de matemática quinto año',
//     // puntuacion: 4.3,
//     // grado: 'quinto año',
//     // nivel: 'secundaria',
//     // materia: 'matematica', 
//     // descripcion: 'en esta clase veremos...'
// })

// export {Clase}

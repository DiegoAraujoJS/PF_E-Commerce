import { Model, Column, Table, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';

@Table
export default class Profesor extends Model {
    @Column
    nombre!: string;

    @Column
    apellido!: string;

    @Column
    ciudad!: string;
    
    @Column
    foto!: string;
    
    @Column
    descripcion!: string;

}


/*const Profesor =  sequelize.define('Profesor', {
    nombre: 
    apellido: 
    foto: 
    descripcion:
    ciudad: 
    // nombre: 'Rodrigo',
    // apellido: 'Callardo', 
    // foto: 'https:///',
    // descripcion: 'hace cuatro años que..',
    // ciudad: 'Buenos Aires'
})*/

export {Profesor}
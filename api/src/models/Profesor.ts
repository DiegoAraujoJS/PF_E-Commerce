import { Model, Column, Table, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';

@Table
export default class Profesor extends Model<Profesor> {
    @Column
    nombre!: string;
    
    @Column
    apellido!: string;
    
    @Column
    foto!: string;
    
    @Column
    descripcion!: string;

    @Column
    ciudad!: string;

    @UpdatedAt
    @Column
    cuidad!: string;
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
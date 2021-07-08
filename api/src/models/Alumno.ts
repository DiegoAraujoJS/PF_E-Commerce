import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';
import Puntuacion from './Puntuacion';

@Table
export default class Alumno extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Unique
    @Column
    User_usuario!: string;

    @Column
    ciudad!: string;
    
    @Column
    foto!: string;
    
    @Column
    descripcion!: string;

    @HasMany(() => Puntuacion)
    puntuaciones!: Puntuacion[];


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

export {Alumno}
import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
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
    foto!: string;

    @Column ({type: DataType.JSON})
    history!: object[]
    
    @Column
    ciudad!: string;
    
    @Column
    descripcion!: string;

    
}

export {Alumno}
import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';

@Table
export default class Profesor extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Unique
    @Column
    usuario!: string;

    @Column
    ciudad!: string;
    
    @Column
    foto!: string;
    
    @Column
    descripcion!: string;

    @HasMany(() => Clase)
    clases!: Clase[];

    @BelongsToMany(() => Rango, ()  => rango_profesor)
    rangos!: Rango[]
}

export {Profesor}
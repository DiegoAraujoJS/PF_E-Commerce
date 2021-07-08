import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { EnumType } from 'typescript';
import Clase from './Clase';
import Profesor from './Profesor';
import rango_profesor from './rango_profesor'
@Table
export default class Rango extends Model {

    @Column({allowNull:false})
    inicio!: number;

    @Column ({allowNull:false})
    fin!: number;

    @Column({allowNull:false})
    dia!: 'domingo' | 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado';


    // @PrimaryKey
    // @ForeignKey(() => User)
    // @Column
    // email!: string;

    @BelongsToMany(() => Profesor, () => rango_profesor)
    rangos!: Profesor[]

}

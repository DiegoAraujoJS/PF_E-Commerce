import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { EnumType } from 'typescript';
import Clase from './Clase';
import Profesor from './Profesor';
import rango_profesor from './rango_profesor'
import User from './Usuario';
@Table
export default class Reclamo extends Model {

    

    // @PrimaryKey
    // @ForeignKey(() => User)
    // @Column
    // email!: string;

    @ForeignKey(() => User)
    @Column
    Denunciante_email!: string;

    @ForeignKey(() => User)
    @Column
    Denunciado_email!: string;

    @ForeignKey(() => User)
    @Column
    Admin_email!: string;

    @BelongsTo(() => User)
    usuario!: User



}

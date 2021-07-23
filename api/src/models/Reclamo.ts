import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, BelongsTo } from 'sequelize-typescript';
import { EnumType } from 'typescript';
import { Claim } from '../../../interfaces';
import Clase from './Clase';
import Profesor from './Profesor';

import User from './Usuario';



@Table
export default class Reclamo extends Model {
    @ForeignKey(() => User)
    @Column ({allowNull: false})
    Denunciante_email!: string;

    @ForeignKey(() => User)
    @Column ({allowNull: false})
    Denunciado_email!: string;

    // @ForeignKey(() => User)
    // @Column ({allowNull: false})
    // Admin_email!: string;

    @Column ({allowNull: false, type: DataType.JSON})
    reclamo!: string;

    @BelongsTo(() => User)
    usuario!: User

}

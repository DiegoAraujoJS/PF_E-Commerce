import { Model, Column, Table, CreatedAt, UpdatedAt, ForeignKey,DataType,  BelongsTo, HasMany } from 'sequelize-typescript';
import { Time } from '../../../interfaces';
import Profesor from './Profesor';
import Puntuacion from './Puntuacion';
@Table
export default class Clase extends Model {
    @Column
    nombre!: string;

    @Column ({allowNull: false})
    grado!: string;

    @Column
    nivel!: string;

    @Column ({allowNull: false})
    materia!: string;

    @Column
    descripcion!: string;

    @Column 
    ciudad!: string

    @Column ({allowNull: false, type: DataType.JSON})
    date!: {year: number, month: number, day: number, time: Time}

    @ForeignKey(() => Profesor)
    @Column
    Profesor_mail!: string

    @BelongsTo(() => Profesor)
    profesor!: Profesor

    @Column(DataType.FLOAT)
    puntuacion!: number;

    @HasMany(() => Puntuacion)
    puntuaciones!: Puntuacion[];

}

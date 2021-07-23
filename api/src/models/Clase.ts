import { Model, Column, Table, CreatedAt, UpdatedAt, ForeignKey,DataType,  BelongsTo, HasMany, PrimaryKey, Unique} from 'sequelize-typescript';
import { Horario, Time } from '../../../interfaces';
import Profesor from './Profesor';
import Puntuacion from './Puntuacion';
import User from './Usuario';
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
    esPresencial!: string;

    @Column 
    precio!: string;

    @Column ({allowNull: false, type: DataType.JSON})
    date!: {year: number, month: number, day: number, time: Time}

    @Column
    status! : string;

    @ForeignKey(() => Profesor)
    @Column
    Profesor_mail!: string

    @ForeignKey(() => User)
    @Column
    User_mail!: string

    @Column ({type: DataType.JSON})
    calendar: Horario[]

    @BelongsTo(() => Profesor)
    profesor!: Profesor

    @BelongsTo(() => User)
    student!: User

    @Column(DataType.FLOAT)
    puntuacion!: number;

    @HasMany(() => Puntuacion)
    puntuaciones!: Puntuacion[];

}

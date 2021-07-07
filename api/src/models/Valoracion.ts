import { Model, Column, Table, CreatedAt, UpdatedAt, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Profesor from './Profesor';
@Table
export default class Valoracion extends Model {
    @Column
    puntuacion!: number;

    @Column
    comentario!: string;

    @ForeignKey(() => Profesor)
    @Column
    profesor!: string

    @Column
    descripcion!: string;

    @Column ({allowNull: false})
    materia!: string;

    @Column ({allowNull: false})
    grado!: string;

    @Column
    nivel!: string;
}

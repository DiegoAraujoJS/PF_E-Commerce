import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export default class Provincia extends Model<Provincia> {
    @Column
    Pais_nombre!: string;

    @Column
    nombre!: string;

}
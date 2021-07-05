import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export default class Ciudad extends Model<Ciudad> {
    @Column
    nombre!: string;

    @Column
    provincia_id!: number;

}
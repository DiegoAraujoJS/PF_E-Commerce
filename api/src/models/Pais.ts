import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export default class Pais extends Model<Pais> {
    @Column
    name!: string;
}
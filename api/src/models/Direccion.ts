import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export default class Direccion extends Model<Direccion> {
    @Column
    calle!: string;

    @Column
    ciudad_id!: string;

    @Column
    codigo_postal!: string;

    @Column
    usuario_mail!: string;
}
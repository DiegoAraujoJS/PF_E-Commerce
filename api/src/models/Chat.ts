import { Model, Column, Table, CreatedAt, UpdatedAt, PrimaryKey, HasMany, ForeignKey, DataType } from 'sequelize-typescript';
import Usuario from './Usuario';

@Table
export default class Chat extends Model {

    @Column ({allowNull: false})
    user_a!: string;

    @Column ({allowNull: false})
    user_b!: string;
    
    @Column({
        allowNull: false,
        type: DataType.JSON
      }) 
      mensajes!: string[]

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;
}

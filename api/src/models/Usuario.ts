import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, Unique, PrimaryKey, ForeignKey, HasOne } from 'sequelize-typescript';
import Profesor from './Profesor';

@Table
export default class User extends Model {
    @PrimaryKey
    @Unique
    @Column ({allowNull: false})
    email!: string;

    @Column ({allowNull: false})
    nombre!: string;

    @Column ({allowNull: false})
    apellido!: string;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @HasOne(() => Profesor)
    profesor!: Profesor
}


// const Usuario = (sequelize) => sequelize.define('Usuario', {
//     nombre: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataType.STRING,
//         allowNull: false,
//         unique: true,
//         validate: {
//             isEmail: true, 
//         }
//     },
//     telefono: {
//         type: DataType.STRING,
//         unique: true
//     },
//     rol: {
//         type: DataType.ENUM('Administrador', 'Profesor', 'Alumno'),
//         allowNull: false
//     },
//     idGoogle: {
//         type: DataType.STRING,
//         unique: true
//     },
//     tipoCuenta: {
//         type: DataType.ENUM('Propia', 'Google'),
//         allowNull: false
//     }
// })



// ciudad: {
//     type: DataType.STRING
// },

// @Table
// export default class User extends Model<User> {
//     @Column
//     nombre!: string;

//     @Column
//     mail: 

//     @CreatedAt
//     @Column
//     createdAt!: Date;

//     @UpdatedAt
//     @Column
//     updatedAt!: Date;
// }

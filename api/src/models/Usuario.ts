import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, Unique, PrimaryKey, ForeignKey, HasOne, HasMany } from 'sequelize-typescript';
import Alumno from './Alumno';
import Profesor from './Profesor';
import { UserProps } from '../../../interfaces';
import Puntuacion from './Puntuacion';
import { ClasePorComprar } from '../../../interfaces';
<<<<<<< HEAD
=======
import {Time, Class} from '../../../interfaces'

>>>>>>> Braian-Domingo-18

@Table
export default class User extends Model implements UserProps {
    @Column({ allowNull: false })
    name!: string;

    @PrimaryKey
    @Unique
    @Column({ allowNull: false })
    mail!: string;

    @Column({ allowNull: false })
    lastName!: string;

    @Column
    password!: string;

    @Column
    role!: number;

    @CreatedAt
    @Column
    createdAt!: Date;

    @UpdatedAt
    @Column
    updatedAt!: Date;

    @HasOne(() => Profesor)
    profesor!: Profesor

    @Column
    city!: string;

    @HasOne(() => Alumno)
    alumno!: Alumno

    @Column({ type: DataType.JSON})
    carrito!: Class[]
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

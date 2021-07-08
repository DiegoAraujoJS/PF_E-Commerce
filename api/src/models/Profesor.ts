import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';

type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]
interface Horario {
    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    }
    disponible: arrayDePares,
    ocupado?: arrayDePares
}

@Table
export default class Profesor extends Model {
    @PrimaryKey
    @ForeignKey(() => User)
    @Unique
    @Column
    usuario!: string;

    @Column
    ciudad!: string;

    @Column
    foto!: string;

    @Column
    descripcion!: string;

    @Column({ type: DataType.JSON })
    calendario!: Horario[];

    @HasMany(() => Clase)
    clases!: Clase[];

    @BelongsToMany(() => Rango, () => rango_profesor)
    rangos!: Rango[]
}


/*const Profesor =  sequelize.define('Profesor', {
    nombre: 
    apellido: 
    foto: 
    descripcion:
    ciudad: 
    // nombre: 'Rodrigo',
    // apellido: 'Callardo', 
    // foto: 'https:///',
    // descripcion: 'hace cuatro años que..',
    // ciudad: 'Buenos Aires'
})*/

export { Profesor }
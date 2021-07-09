import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Json } from 'sequelize/types/lib/utils';

import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';

type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]

interface Horario{

    email: string;
    fecha: {
        anio: number,
        mes: number,
        dia: number
    },
    disponible: arrayDePares,
    ocupado?: arrayDePares
}

@Table
export default class Profesor extends Model {    
    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    User_mail!: string;
    
    @Column
    nombre!: string;

    @Column
    apellido!: string;

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

    @BelongsToMany(() => Rango, ()  => rango_profesor)
    rangos!: Rango[]
}


export {Profesor}
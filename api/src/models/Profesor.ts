import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Json } from 'sequelize/types/lib/utils';

import Clase from './Clase';
import User from './Usuario';
import {ProfesorProps, Horario} from '../../../interfaces'

@Table
export default class Profesor extends Model implements ProfesorProps{
    @Column(DataType.FLOAT)
    score!: number;

    @PrimaryKey
    @ForeignKey(() => User)
    
    @Column
    User_mail!: string;

    @Column
    password!: string;
    
    @Column
    name!: string;

    @Column
    lastName!: string;

    @Column
    city!: string;
    
    @Column  ({type: DataType.TEXT})
    foto!: string;
    
    @Column  ({type: DataType.TEXT})
    description!: string;

    @Column ({type: DataType.JSON})
    history!: object[]

    @Column({ type: DataType.JSON })
    calendario!: Horario[];

    @HasMany(() => Clase)
    clases!: Clase[];
}


export {Profesor}
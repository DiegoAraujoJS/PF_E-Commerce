import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany } from 'sequelize-typescript';
import { Json } from 'sequelize/types/lib/utils';

import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';

'16:00'





type arrayDePares = [`${number}:${number}:00`, `${number}:${number}:00`][]

// Horario es lo que manda el front
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
// CalendarioResponse es lo que manda el back
type CalendarioResponse = Horario[]


// TodasLasSemanas lo puede mandar el front si el profesor pone ''tengo disponibles los lunes de 14 a 18''
interface TodasLasSemanas {
    dia: {
        nombre: 'lunes' | 'martes' | 'miercoles' | 'jueves' | 'viernes' | 'sabado' | 'domingo',
    },
    disponible: arrayDePares,
}

// ejemplo
let query: CalendarioResponse = [
    {
        email: "edwardburgos@gmail.com",
        fecha: {
            anio: 2021,
            mes:8,
            dia: 3
        },
        disponible: [['12:45:00', '16:29:00']],
        ocupado:[['16:29:00', '16:29:00']]

    },
    {
        email: "edwardburgos@gmail.com",
        fecha: {
            anio: 2021,
            mes:8,
            dia: 4
        },
        disponible: [['16:29:00', '16:29:00']],
        ocupado:[['16:29:00', '16:29:00']]
    
        }
]



@Table
export default class Profesor extends Model {

    @Column(DataType.FLOAT)
    puntuacion!: number;

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

    @Column({
        type: DataType.JSON
    })
    calendario!: object;

    @PrimaryKey
    @ForeignKey(() => User)
    @Column
    User_mail!: string;

    @HasMany(() => Clase)
    clases!: Clase[];

    @BelongsToMany(() => Rango, ()  => rango_profesor)
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

export {Profesor}
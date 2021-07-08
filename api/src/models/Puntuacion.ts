import { Model, Column, Table, CreatedAt, UpdatedAt, DataType, HasOne, ForeignKey, PrimaryKey, HasMany, BelongsToMany, Unique } from 'sequelize-typescript';
import Clase from './Clase';
import Rango from './Rango';
import rango_profesor from './rango_profesor';
import User from './Usuario';
import Alumno from './Alumno';

// body que llega a puntuar clases en /api/puntuar

interface BodyRoutePuntuarPost{
    "id": 1,
    "nombre": "Sumas y Restas",
    "profesor": "edwardburgos@gmail.com",
    "descripcion": "Aprende a sumar y restar para ser el mejor de tu clase",
    "materia": "Matemática",
    "grado": "Primer grado",
    "nivel": "Primario",
    "puntuacion": null,
    "createdAt": "2021-07-08T15:01:58.408Z",
    "updatedAt": "2021-07-08T15:01:58.408Z",
    "puntuaciones": [
        {
            "usuario": "mauroleonel@gmail.com",
            "clase": 1,
            "puntuacion": 5,
            "comentario": "Muy buena clase",
            "createdAt": "2021-07-08T15:02:07.194Z",
            "updatedAt": "2021-07-08T15:02:07.194Z"
        }
    ]
}
    


@Table
export default class Puntuacion extends Model {
    @PrimaryKey
    @ForeignKey(() => Alumno)
    @Column
    usuario!: string;

    @PrimaryKey
    @ForeignKey(() => Clase)
    @Column
    clase!: number;

    @Column
    puntuacion!: number;
    
    @Column
    comentario!: string;

}

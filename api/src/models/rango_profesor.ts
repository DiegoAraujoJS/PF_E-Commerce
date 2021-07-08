import { Table, ForeignKey, Column, Model } from "sequelize-typescript";
import Profesor from "./Profesor";
import Rango from "./Rango";

@Table
class rango_profesor extends Model{

    @ForeignKey(() => Profesor)
    @Column
    email!: string;

    @ForeignKey(() => Rango)
    @Column
    Rango_id!: number
}

export default rango_profesor
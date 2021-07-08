import { Model, Column, Table, CreatedAt, UpdatedAt } from 'sequelize-typescript';
@Table
export default class Ciudad extends Model<Ciudad> {
    @Column
    nombre!: string;

    @Column
    pais!: string;

    @Column
    provincia!: string;

}


// const Ciudad = (sequelize) => sequelize.define('Ciudad', {
//     nombre: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     pais: {
//         type: DataType.STRING,
//         allowNull: false
//     },
//     provincia: {
//         type: DataType.STRING
//     }
// })



/*
module.exports = (juangghhj) => {
  // defino el modelo
  juangghhj.define('dog', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    heightmax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    heightmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weightmax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weightmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lifespanmax: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lifespanmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  
};
 */
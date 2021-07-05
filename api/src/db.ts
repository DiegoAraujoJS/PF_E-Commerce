import { Sequelize } from "sequelize-typescript";
import config from './lib/config'
import Usuario from './models/Usuario'
import Ciudad from './models/Ciudad'


const sequelize = new Sequelize ({
    dialect: 'postgres',
    database: config.dbName,
    models: [__dirname+'/models'],
    storage: ':memory:',
    username: config.dbUser,
    password: config.dbPassword
});

// fs.readdirSync(path.join(__dirname, '/models'))
//   .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
//   .forEach((file) => {
//     modelDefiners.push(require(path.join(__dirname, '/models', file)));
//   });


// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = new Sequelize('sqlite::memory:');

// const User = sequelize.define('User', {
//   // Model attributes are defined here
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//     // allowNull defaults to true
//   }
// }, {
//   // Other model options go here
// });

// // `sequelize.define` also returns the model
// console.log('usuario', sequelize.models.Usuario); // false


// console.log('sequelize models', sequelize.models)
const bootstrap = () => {
    
}

export {sequelize};

/*
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dogs`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  
*/
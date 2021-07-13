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

export {sequelize};

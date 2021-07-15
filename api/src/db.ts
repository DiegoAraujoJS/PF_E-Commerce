import { Sequelize } from "sequelize-typescript";
import config from './lib/config'


const sequelize = new Sequelize ({
    dialect: 'postgres',
    database: config.dbName,
    models: [__dirname+'/models'],
    storage: ':memory:',
    username: config.dbUser,
    password: config.dbPassword
});

export {sequelize};

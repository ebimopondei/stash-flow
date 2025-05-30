import { Sequelize } from 'sequelize-typescript';
import { Dialect} from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize( {
database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: process.env.DB_DIALECT as Dialect,
  logging: true
});

sequelize.sync();

try {
    const start = async () =>{
        await sequelize.authenticate();
        console.info("Connected")
    }

    start();
} catch (error) {
    console.info('unable to connect', error)
}

export { sequelize };
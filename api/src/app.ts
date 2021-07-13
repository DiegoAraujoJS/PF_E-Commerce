import cookieParser from 'cookie-parser';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors'
import config from './lib/config';
import routes from './routes/index'
import session from 'express-session'
import dotenv from 'dotenv'
dotenv.config()
const app = express()

app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(session({
//     name: 'session-id',
//     secret: process.env.SESSION_SECRET,
//     saveUninitialized: false,
//     resave: false,
// }));

app.use(
    cors( {
        origin: '*',
        credentials: true,
        methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
        allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'authorization', 'user']
    } )
)

interface Error {
    message: string;
    status: number;
}

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    const status = err.status || 500;
    const message = err.message || err;
    console.error(err);
    res.status(status).send(message)
})

app.use('/api', routes)
console.log('hola')
export default app;
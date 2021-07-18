import cookieParser from 'cookie-parser';
import express, {Request, Response, NextFunction} from 'express';
import morgan from 'morgan';
import cors from 'cors'
import config from './lib/config';
import routes from './routes/index'
import session from 'express-session'
import Stripe from 'stripe';
const app = express()

const stripe = new Stripe(config.privateApiKey, null);

app.use(express.urlencoded({extended: true, limit: '50mb'}));
app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(session({
//     name: 'session-id',
//     secret: config.session_secret,
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//         httpOnly: false,
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24 * 7 
//     }
// }));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', "http://localhost:3000"); // update to match the domain you will make the request from
//     res.header('Access-Control-Allow-Credentials', 'true');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
//   });


app.use(
    cors( 
    //     {
    //     origin: "http://localhost:3000",
    //     // credentials: false,
    //     // methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
    //     // allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'authorization']
    // } 
    )
)
app.post('/procesarpago', async (req, res) => {
    const { clasesPorComprar, moneda, cliente } = req.body;
    let clases = clasesPorComprar.map(e => {
      var nuevoElemento = {
        price_data: {
          currency: moneda,
          product_data: {
            metadata: { id: e.id},
            name: e.nombre,
            images: [e.imagen],
            description: `PROFESOR > ${e.profesor} | DIA > ${e.dia} | HORA INICIO > ${e.horaInicio} | HORA FIN > ${e.horaFin}`
          },
          unit_amount: e.precioDescuento * 100,
        },
        quantity: 1,
      }
      return nuevoElemento;
    })
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: clases,
      customer_email: cliente,
      mode: 'payment',
      success_url: 'http://localhost:3000/pagoexitoso?id={CHECKOUT_SESSION_ID}',
      cancel_url: 'http://localhost:3000/cesta',
    });

    res.send({id: session.id})
  });
  
  app.get('/informaciondepago/:id', async (req, res) => {
    const session = await stripe.checkout.sessions.retrieve(req.params.id, {expand: ['line_items', 'line_items.data.price.product', 'customer']})
    res.send(session)
  })

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

export default app;
import express, { NextFunction, Request, Response } from 'express'
import cors from 'cors'
import path from 'path'
import chalk from 'chalk'
import { AssociationError, BaseError, ConnectionError, DatabaseError, ForeignKeyConstraintError, HostNotFoundError, HostNotReachableError, InstanceError, TimeoutError, UniqueConstraintError } from 'sequelize'
import { CustomError } from './types/error'
import { APPROUTER } from './routes'

import { PORT } from './config/server'

const app = express()

app.use(express.urlencoded( { extended: true, }))
app.use(express.json())
app.use("/uploads", express.static(path.join(__dirname,'uploads')));


app.use(cors(
    { 
        origin: ["http://localhost:5173", "https://link-sharing-app-react.vercel.app", "http://localhost:5174", "http://localhost:3000", "http://localhost:4173", 'http://192.168.0.102:5173', 'http://192.168.174.172:4173',  "http://10.0.12.7:5173", "http://10.0.12.7:4173"], 
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        allowedHeaders: "Content-Type,Authorization",
        credentials: true
    }
));

app.use((req: Request, res: Response, next: NextFunction) => {

    if (req.path === '/health' || req.path.startsWith('/static')) {
  return next(); // skip logging
}
  const timestamp = new Date().toISOString();
  const method = chalk.cyan(req.method);
  const url = chalk.yellow(req.originalUrl);
  const statusColor = chalk.green;
  const path = chalk.magenta(req.path);

  console.log(chalk.gray('──────────────────────────────────────────────'));
  console.log(`${chalk.gray(`[${timestamp}]`)} ${method} ${url}`);
  console.log(`${chalk.blue('Path:')} ${path}`);
  console.log(`${chalk.blue('Query:')} ${JSON.stringify(req.query, null, 2)}`);
  console.log(`${chalk.blue('Headers:')} ${JSON.stringify(req.headers, null, 2)}`);
  
  if (req.body && Object.keys(req.body).length > 0) {
    console.log(`${chalk.blue('Body:')} ${JSON.stringify(req.body, null, 2)}`);
  } else {
    console.log(chalk.blue('Body:') + ' (empty)');
  }

  console.log(chalk.gray('──────────────────────────────────────────────'));

  next();
});

app.use('/', APPROUTER)

app.use((error:CustomError, req:Request, res:Response, next:NextFunction) => {
    console.log(error)
    if (error instanceof DatabaseError) {
      const validationMessages = error?.errors.map((e) => e.message).join(', ');
      res.status(400).json({ status: 'fail', statusCode: 503,  message: `Data validation failed: ${validationMessages}` });
      return;
    } else if (error instanceof UniqueConstraintError) {
      const uniqueFields = error.errors.map((e) => e.path).join(', ');
      res.status(409).json({ status: 'fail', statusCode: 503,  message: `The provided value for ${uniqueFields} already exists.` });
      return; 
    } else if (error instanceof ForeignKeyConstraintError) {
      res.status(409).json({ status: 'fail', statusCode: 503,  message: 'Failed due to a foreign key constraint violation.' });
      return; 
    } else if (error instanceof DatabaseError) {
      console.error('Sequelize Database Error:', error.message, error.sql);
      if (error.parent) {
        console.error('Underlying Database Error:', error.parent);
      }
      res.status(500).json({ status: 'fail', statusCode: 503,  message: 'A database error occurred. Please try again later.' });
      return;
    } else if (error instanceof TimeoutError) {
      res.status(408).json({ status: 'fail', statusCode: 503,  message: 'The database operation timed out.' });
      return; 
    } else if (
      error instanceof ConnectionError ||
      error instanceof HostNotFoundError ||
      error instanceof HostNotReachableError
    ) {
      res.status(503).json({ status: 'fail', statusCode: 503,  message: 'Could not connect to the database. Please check your connection.' });
      return;
    } else if (error instanceof AssociationError || error instanceof InstanceError) {
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'An error occurred with the data or its relationships.' });
      return;
    } else if (error instanceof BaseError) {
      res.status(500).json({ status: 'fail', statusCode: 500,  message: 'An unexpected database error occurred.' }); 
      return;
    }
  
    // If the error is not a Sequelize error, pass it on to the next error handler
    next(error);
  });

app.use((req: Request, res: Response, next: NextFunction) => {
    const error: CustomError = new Error(`Cannot ${req.method} ${req.originalUrl}`) as CustomError;
    error.statusCode = 404;
    error.status = 'fail';
    next(error); // Pass to error handler
});

app.use((error: CustomError, req: Request, res: Response, next: NextFunction) =>{
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'fail',
    res.status(error.statusCode).json( {
        statusCode: error.statusCode,
        status: error.status,
        message: error.message, 
        name: error.name
    })
})


app.listen(PORT, ()=>{
    console.info(`server started!`)
})
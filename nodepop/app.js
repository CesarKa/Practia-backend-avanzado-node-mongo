
import createError from 'http-errors';
import express, { response } from 'express'
import path, {dirname} from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { loginController} from './controllers/index.js'
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
//import productsRouter from './routes/products.js';
import * as productsRouter from './routes/products.js' 
import {fileURLToPath} from 'url';
import { request } from 'http';
import connectMongoose from './lib/connectMongoose.js'
import * as sessionManager from './lib/sessionManager.js'
import * as homeControler from './controllers/homeControler.js'

await connectMongoose();
console.log('Connected to MongoDB.');

var app = express();

app.locals.siteTitle = 'NodePop'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(sessionManager.middleware, sessionManager.useSessionInViews)


app.get('/', homeControler.index);
app.use('/users', usersRouter);
app.get('/products', productsRouter.index);
app.get('/login', loginController.indexLogin);
app.post('/login', loginController.postLogin);
app.get('/logout', loginController.logout);

{ // products
  const productsRouter = express.Router()

  productsRouter.get('/new', productsController.indexNew)
  productsRouter.post('/new', productsController.postNew)
  productsRouter.get('/delete/:productId', productsController.deleteOne)
  app.use('/products', sessionManager.guard, productsRouter)
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});



export default app
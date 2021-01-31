/**
 * Dependencies
 */
import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';


/**
 * Configures
 */
import './config/connect-mongo';
import './models/dontpad';
import api from './api';


const app = express();
const server = http.Server(app);


/**
 * Middlewares
 */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(compression());


/**
 * Render build production
 */
app.use(express.static(path.join(__dirname, '../client/build')));

app.use('/api', api);

/**
 * Socket.IO
 */
import socketDontpad from './socket-io/dontpad';

socketDontpad(server);

app.get('/*/view', (req, res, next) => res.redirect(`/${req.params[0]}`));

// handle all requests to the build folder
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});


/**
 * Config port to listen
 */
const port = process.env.PORT || '4200';
app.set('port', port);

server.listen(port, () => console.log(`Running on localhost:${port}`));

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
import './server/models/dontpad';


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
app.use(express.static(path.join(__dirname, 'build'), {
  setHeaders(res, path) {
    if (path.includes('lib') || path.includes('static')) {
      const ONE_WEEK = 7 * 24 * 60 * 60;
      res.setHeader('Cache-Control', `public, max-age=${ONE_WEEK}`);
    }
  }
}));

/**
 * Socket.IO
 */
import socketDontpad from './server/socket-io/dontpad';

socketDontpad(server);

// handle all requests to the build folder
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, './build/index.html'));
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


/**
 * Config interval timer ping app to prevent sleeping
 */
// const HALF_HOURS = 30 * 60 * 1000;

// setInterval(() => {
//   http.get('https://dontpad.herokuapp.com/');
// }, HALF_HOURS);

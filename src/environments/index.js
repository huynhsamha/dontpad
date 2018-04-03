import envDev from './env.development';
import envProd from './env.production';

let Env;

if (process.env.REACT_APP_ENV == 'development') {
  Env = envDev;
} else if (process.env.REACT_APP_ENV == 'production') {
  Env = envProd;
}

export default Env;

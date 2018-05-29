import mongoose from 'mongoose';
import dbConfig from './db';

mongoose.connect(dbConfig.uriMongo, {}, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect mongo ok');
  }
});

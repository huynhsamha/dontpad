import mongoose from 'mongoose';
import dbConfig from './db';

mongoose.connect(dbConfig.uriMongo, { useNewUrlParser: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connect to MongoDB successfully');
  }
});

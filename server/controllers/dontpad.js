import mongoose from 'mongoose';

const Dontpad = mongoose.model('Dontpad');

function findOneByUrl(url) {
  return new Promise((resolve, reject) => {
    Dontpad.findOne({ url })
      .select('title model createdAt updatedAt')
      .exec((err, dontpad) => {
        if (err) return reject(err);
        return resolve(dontpad || { createdAt: new Date() });
      });
  });
}

function removeOne(url) {
  return new Promise((resolve, reject) => {
    Dontpad.remove({ url }, (err) => {
      if (err) return reject(err);
      return resolve({ message: 'Cleared page' });
    });
  });
}

function updateOne(url, { title, model }) {
  if (!model && !title) {
    return removeOne(url);
  }
  return new Promise((resolve, reject) => {
    Dontpad.findOne({ url })
      .select('title model createdAt updatedAt')
      .exec((err, dontpad) => {
        if (err) return reject(err);
        if (!dontpad) {
          dontpad = new Dontpad({ url, title, model });
        } else {
          if (title) dontpad.title = title;
          if (model) dontpad.model = model;
        }
        dontpad.save((err, dontpad) => {
          if (err) return reject(err);
          return resolve({ message: 'Saved' });
        });
      });
  });
}

export default {
  findOneByUrl,
  updateOne
};

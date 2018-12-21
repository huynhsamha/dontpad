import mongoose from 'mongoose';

const Dontpad = mongoose.model('Dontpad');

const findOneByUrl = url => new Promise((resolve, reject) => {
  Dontpad.findOne({ url }).then((dontpad) => {
    resolve(dontpad || { createdAt: new Date() });
  }).catch(err => reject(err));
});

const removeOne = url => new Promise((resolve, reject) => {
  Dontpad.deleteOne({ url }, (err) => {
    if (err) return reject(err);
    return resolve({ message: 'Cleared page' });
  });
});

const updateOne = (url, { title, model }) => {
  if (!model && !title) {
    return removeOne(url);
  }
  return new Promise((resolve, reject) => {
    Dontpad.findOne({ url }).then((dontpad) => {
      if (!dontpad) {
        dontpad = new Dontpad({ url, title, model });
      } else {
        if (title) dontpad.title = title;
        if (model) dontpad.model = model;
      }
      return dontpad.save();
    }).then(() => resolve({ message: 'Saved' }))
      .catch(err => reject(err));
  });
};

export default {
  findOneByUrl,
  updateOne
};

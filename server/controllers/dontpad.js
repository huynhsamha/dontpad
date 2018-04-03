var mongoose = require('mongoose');

var Dontpad = mongoose.model('Dontpad');

function findOneByUrl(url) {
  return new Promise((resolve, reject) => {
    Dontpad.findOne({ url }, { url: true, value: true })
      .exec((err, dontpad) => {
        if (err) {
          return reject(err);
        }
        return resolve(dontpad);
      });
  });
}

function removeOne(url) {
  return new Promise((resolve, reject) => {
    Dontpad.remove({ url }, (err) => {
      if (err) {
        return reject(err);
      }
      return resolve({
        message: 'Cleared page'
      });
    });
  });
}

function updateOne(url, value) {
  if (!value || value == '') {
    return removeOne(url);
  }
  return new Promise((resolve, reject) => {
    Dontpad.findOne({ url }).exec((err, dontpad) => {
      if (err) {
        return reject(err);
      }
      if (!dontpad) {
        dontpad = new Dontpad({ url, value });
      } else {
        dontpad.value = value;
      }
      dontpad.save((err, dontpad) => {
        if (err) {
          return reject(err);
        }
        return resolve({
          message: 'Saved'
        });
      });
    });
  });
}

module.exports = {
  findOneByUrl,
  updateOne
};

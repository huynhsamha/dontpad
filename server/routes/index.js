var express = require('express');

var router = express.Router();

const DontpadCtrl = require('../controllers/dontpad');

router.post('/model', (req, res, next) => {
  // console.log(req.body);
  const { url } = req.body;
  DontpadCtrl.findOneByUrl(url)
    .then((dontpad) => {
      // console.log(dontpad);
      if (dontpad) {
        res.status(200).send({
          message: 'Exist',
          value: dontpad.value
        });
      } else {
        res.status(404).send({
          message: 'New',
          value: ''
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.put('/model', (req, res, next) => {
  // console.log(req.body);
  const { url, value } = req.body;
  DontpadCtrl.updateOne(url, value)
    .then((obj) => {
      console.log(obj);
      res.status(200).send(obj);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send(err);
    });
});

module.exports = router;

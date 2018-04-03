var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var DontpadSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  value: {
    type: String,
    default: ''
  }
});

mongoose.model('Dontpad', DontpadSchema);

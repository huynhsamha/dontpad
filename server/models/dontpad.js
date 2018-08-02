import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const DontpadSchema = new Schema({
  url: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: '',
    maxlength: 40
  },
  model: {
    type: String,
    default: ''
  }
}, {
  timestamps: {
    createdAt: true,
    updatedAt: true
  }
});


mongoose.model('Dontpad', DontpadSchema);

// models/Survey.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const surveySchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  country: {
    type: String,
    required: true
  },
  scores: {
    healthcare: { type: Number, required: true },
    education: { type: Number, required: true },
    employment: { type: Number, required: true },
    transportation: { type: Number, required: true },
    publicSafety: { type: Number, required: true }
  },
  totalScore: {
    type: Number,
    required: true
  },
  
}, { timestamps: true });

module.exports = mongoose.model('Survey', surveySchema);

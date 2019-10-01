const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredNumber } = require('./required-types');

const schema = new Schema ({
  location: {
    latitude: RequiredNumber,
    longitude: RequiredNumber
  },
  weather: {
    time: Date,
    forecast: String,
  },
  attendance: {
    type: Number,
    min: 1
  }
});

module.exports = mongoose.model('Stop', schema);
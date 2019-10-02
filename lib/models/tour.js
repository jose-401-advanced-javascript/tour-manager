const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { ObjectId } = Schema.Types;
const { RequiredString } = require('./required-types');

const schema = new Schema ({
  title: RequiredString,
  activities: [String],
  launchDate: {
    type: Date,
    default: () => new Date()
  },
  stops: [{
    location: {
      latitude: Number,
      longitude: Number
    },
    weather: {
      time: Date,
      forecast: String,
    },
    attendance: {
      type: Number,
      min: 1
    }
    // type: ObjectId,
    // ref: 'Stop',
    // required: true,
  }]
});

schema.static = {
  addStop(id, stop) {
    return this.updateById(
      id,
      {
        $push: {
          stops: stop
        }
      }
    )
      .then(tour => tour.stops);
  }
};

module.exports = mongoose.model('Tour', schema);
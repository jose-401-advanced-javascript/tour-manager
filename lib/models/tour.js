const mongoose = require('mongoose');
const { Schema } = mongoose;
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
  }]
});

schema.statics = {
  addStop(id, body) { 
    console.log(body);
     
    return this.updateById(
      id,
      {
        $push: {
          stops: [{
            location: body.location, 
            weather: body.weather[0]
          }]
        }
      }
    )
      .then(tour => {
        console.log(tour.stops);
        
        return tour.stops;
        
      });
  },

  removeStop(id, stopId) {
    return this.updateById(id, {
      $pull: {
        stops: { _id: stopId }
      }
    })
      .then(tour => tour.stops);
  },

  updateStopAtt(id, stopId, attendance) {
    return this.updateOne(
      { _id: id, 'stops._id': stopId },
      {
        $set: {
          'stops.$.attendance': attendance
        }
      }
    )
      .then(tour => tour.stops);
  }
};

module.exports = mongoose.model('Tour', schema);
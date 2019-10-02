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
  addStop(id, location) {
    console.log(location);
    
    return this.updateById(
      id,
      {
        $push: {
          stops: [location]
        }
      }
    )
      .then(tour => {
        console.log('***Tour', tour);
        return tour.stops;
        
      });
  }
};

module.exports = mongoose.model('Tour', schema);
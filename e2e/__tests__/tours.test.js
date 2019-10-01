const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');

describe('locations api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tour = {
    title: 'Test Tour',
    activities: ['Coding', 'Testing'],
    launchDate: {},
    stops: [{
      location: {
        latitude: 45.5266975,
        longitude: -122.6880503
      },
      attendance: 1
    }],
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

});
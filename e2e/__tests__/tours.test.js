jest.mock('../../lib/services/maps-api');
jest.mock('../../lib/services/weather-api');
require('dotenv').config();
const request = require('../request');
const db = require('../db');
const { matchIdAndDate, matchMongoId } = require('../match-helpers');
const getLocation = require('../../lib/services/maps-api');
const getForecast = require('../../lib/services/weather-api');

getLocation.mockResolvedValue({
  latitude: 38,
  longitude: -130
});

getForecast.mockResolvedValue([
  {
    forecast: 'Partly cloudy throughout the day.',
    time: new Date('10/02/19')
  }
]);

describe('Tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tour = {
    title: 'Test Tour',
    activities: ['Coding', 'Testing'],
    stops: []
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('adds a tour', () => {
    return postTour(tour).then(savedTour => {
      expect(savedTour).toMatchInlineSnapshot(
        matchIdAndDate,

        `
        Object {
          "__v": 0,
          "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
          "activities": Array [
            "Coding",
            "Testing",
          ],
          "launchDate": Any<String>,
          "stops": Array [],
          "title": "Test Tour",
        }
      `
      );
    });
  });

  it('gets a list of tours', () => {
    const firstTour = {
      title: 'Test Tour',
      activities: ['Coding', 'Testing']
    };

    return Promise.all([
      postTour(firstTour),
      postTour({ title: 'Test Tour', activities: ['Coding', 'Testing'] }),
      postTour({ title: 'Test Tour', activities: ['Coding', 'Testing'] })
    ])
      .then(() => {
        return request.get('/api/tours').expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(3);
        expect(body[0]).toMatchInlineSnapshot(
          matchIdAndDate,
          `
          Object {
            "__v": 0,
            "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
            "activities": Array [
              "Coding",
              "Testing",
            ],
            "launchDate": Any<String>,
            "stops": Array [],
            "title": "Test Tour",
          }
        `
        );
      });
  });

  const stop1 = { address: '97209' };

  function postTourWithStop(tour, stop) {
    return postTour(tour).then(savedTour => {
      return request
        .post(`/api/tours/${savedTour._id}/stops`)
        .send(stop)
        .expect(200)
        .then(({ body }) => {
          return [savedTour, body];
        });
    });
  }

  it('adds a stop to a location', () => {
    return postTourWithStop(tour, stop1).then(([, stops]) => {
      expect(stops[0]).toMatchInlineSnapshot(
        matchMongoId,

        `
        Object {
          "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
          "location": Object {
            "latitude": 38,
            "longitude": -130,
          },
          "weather": Object {
            "forecast": "Partly cloudy throughout the day.",
            "time": Any<String>,
          },
        }
      `
      );
    });
  });

  it('removes a stop', () => {
    return postTourWithStop(tour, stop1)
      .then(([tour, shows]) => {
        return request
          .delete(`/api/tours/${tour._id}/stops/${shows[0]._id}`)
          .expect(200);
      })
      .then(({ body }) => {
        expect(body.length).toBe(0);
      });
  });

  const attend1 = {
    attendance: 19
  };

  it('updates attendance', () => {
    return postTour(tour).then(tour => {
      return request
        .post(`/api/tours/${tour._id}/stops`)
        .send(stop1)
        .expect(200)
        .then(out => {
          const stops = out.body[0];
          return request
            .put(`/api/tours/${tour._id}/stops/${stops._id}/attendance`)
            .send(attend1)
            .expect(200)
            .then(({ body }) => {
              expect(body[0].attendance).toBe(19);
            });
        });
    });
  });
});

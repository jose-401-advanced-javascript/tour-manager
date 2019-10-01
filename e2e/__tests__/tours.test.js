const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');

describe('Tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tour = {
    title: 'Test Tour',
    activities: ['Coding', 'Testing'],
    stops: [
      {
        location: {
          latitude: 45.5266975,
          longitude: -122.6880503
        },
        attendance: 1
      }
    ]
  };

  function postTour(tour) {
    return request
      .post('/api/tours')
      .send(tour)
      .expect(200)
      .then(({ body }) => body);
  }

  it('adds a tour', () => {
    return postTour(tour).then(tour => {
      expect(tour).toMatchInlineSnapshot(
        matchMongoId,
        `
        Object {
          "__v": 0,
          "_id": StringMatching /\\^\\[a-f\\\\d\\]\\{24\\}\\$/i,
          "activities": Array [
            "Coding",
            "Testing",
          ],
          "launchDate": "2019-10-01T23:24:24.795Z",
          "stops": Array [
            Object {
              "_id": "5d93e0288eff0a44658b058b",
              "attendance": 1,
              "location": Object {
                "latitude": "1970-01-01T00:00:00.045Z",
                "longitude": "1969-12-31T23:59:59.878Z",
              },
            },
          ],
          "title": "Test Tour",
        }
      `
      );
    });
  });
});

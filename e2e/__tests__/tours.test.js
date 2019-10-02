const request = require('../request');
const db = require('../db');
const { matchMongoId } = require('../match-helpers');

describe('Tour api', () => {
  beforeEach(() => {
    return db.dropCollection('tours');
  });

  const tour = {
    title: 'Test Tour',
    activities: ['Coding', 'Testing']
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
        matchMongoId,

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
          matchMongoId,
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
});

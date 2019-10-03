// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');
const addWeather = require('../middleware/add-weather');

router
  .post('/:id/stops', addGeo(), addWeather(), ({ params, body }, res, next) => {
    Tour.addStop(params.id, body)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .post('/', (req, res, next) => {
    Tour.create(req.body)
      .then(tour => res.json(tour))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Tour.find()
      .lean()
      .then(tours => res.json(tours))
      .catch(next);
  })

  .delete('/:id/stops/:stopId', ({ params }, res, next) => {
    Tour.removeStop(params.id, params.stopId)
      .then(stops => res.json(stops))
      .catch(next);
  });

module.exports = router;
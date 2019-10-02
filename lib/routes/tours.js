// eslint-disable-next-line new-cap
const router = require('express').Router();
const Tour = require('../models/tour');
const addGeo = require('../middleware/add-geolocation');

router
  .post('/:id/stops', addGeo(), ({ params, body }, res, next) => {
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
  });

module.exports = router;
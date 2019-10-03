const getForecast = require('../services/weather-api');

module.exports = () => (req, res, next) => {  
  const { location } = req.body;

  if(!location) {
    return next({
      statusCode: 400,
      error: 'coordinates must be supplied'
    });
  }
  
  getForecast(location.latitude, location.longitude)
    .then(weather => {
      if(!weather) {
        throw {
          statusCode: 400,
          error: 'address must be resolvable to geolocation'
        };
      }
        
      req.body.weather = weather;
      
      next();
    })
    .catch(next);
};
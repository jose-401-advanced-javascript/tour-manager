# LAB - 12

## Tour Manager

### Author: Jose Ojeda

### Links and Resources
* [submission PR](https://github.com/jose-401-advanced-javascript/tour-manager/pull/1)
* [travis](https://travis-ci.com/jose-401-advanced-javascript/tour-manager)
* [back-end](https://fast-beyond-64234.herokuapp.com)

### Setup
#### `.env` requirements
* `PORT` - 3000
* `MONGODB_URI` - mongodb://<dbuser>:<dbpassword>@ds329058.mlab.com:29058/heroku_plxsw8gg



#### Running the app

Lifecycle scripts included in express-reference-server:
  test
    npm run jest -- --coverage
  start
    node server.js

available via `npm run-script`:
  lint
    eslint .
  jest
    jest --runInBand
  test:watch
    npm run jest -- --watchAll
  test:verbose
    npm run test -- --verbose
  start:watch
    nodemon server.js
  
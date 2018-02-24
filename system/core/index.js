/**
 * Module dependencies.
 *
 * @private
 */
const _ = require('lodash');

/**
 * Sets the instance of the app (and express).
 *
 * @global
 */
global.express = require('express');
global.app = express();

/**
 * Sets the application's middlewares.
 *
 * @return  {void}
 */
const SetMiddlewares = function() {
  let middlewares;
  try {
    middlewares = require('./middlewares');
  } catch (e) {
    throw new Error('The middleware file was not found.');
  }
  middlewares();
};

module.exports = function(dir) {
  if (!dir) {
    throw new Error('No base path has been set for Core.');
  }

  app.set('base_dir', dir);
  app.set('view engine', 'pug');
  app.set('views', `${dir}/app/views`);

  SetMiddlewares();

  let routerParser;
  try {
    routerParser = require('./router-parser');
  } catch (e) {
    throw new Error(e);
  }
  routerParser();

  return app;
};

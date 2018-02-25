/**
 * Sets the instance of the app (and express).
 *
 * @global
 */
global.express = require('express');
global.app = express();

module.exports = function(dir) {
  if (!dir) {
    throw new Error('No base path has been set for Core.');
  }

  const appConfig = require('../../config/app');
  for (var key in appConfig) {
    app.set(key, appConfig[key].replace(/{{dir}}/gi, dir));
  }

  require('./middlewares')();
  require('../router')();

  return app;
};

/**
 * SYSTEM CORE
 * 
 * Instantiates the application and runs all its modules.
 */

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

  /**
   * Sets the settings and globals of the express application.
   */
  const appConfig = require(`${dir}/config/app`);
  for (let key in appConfig) {
    app.set(key, appConfig[key].replace(/{{path}}/gi, dir));
  }

  /**
   * Sets the global variables of the application.
   */
  const globalsVars = require(`${app.get('base_path')}/config/globals`);
  for (let key in globalsVars) {
    global[key] = globalsVars[key];
  }

  /**
   * Requires and runs the middleware initialization file.
   */
  require('./middlewares')();

  /**
   * @global
   */
  global.Controller = require('../mvc/Controller');

  /**
   * Requires and runs the route initialization file.
   */
  require('../router')();

  return app;
};

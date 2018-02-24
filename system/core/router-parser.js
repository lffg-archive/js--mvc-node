/**
 * Module dependencies.
 *
 * @private
 */
const _ = require('lodash');

/**
 * Checks the routes and executes the current route.
 *
 * @return  {void}
 */
module.exports = () => {
  let routes;
  try {
    routes = require('../../app/routes');
  } catch (e) {
    throw new Error('The routes file could not be found.');
  }

  _.forEach(routes, (value, key) => {
    value.method = value.method.toLowerCase();

    if (
      value.method !== '*' &&
      value.method !== 'all' &&
      value.method !== 'get' &&
      value.method !== 'put' &&
      value.method !== 'post' &&
      value.method !== 'patch' &&
      value.method !== 'delete'
    ) {
      throw new Error(`
        The X method does not exist. The available ones are:
        *, all, get, put, post, patch or delete
      `);
    }

    if (value.method === '*') {
      value.method = 'all';
    }

    try {
      app[value.method](key, (req, res, next) => {
        if (!! value.controller) {
          let controller;
          try {
            controller = require('../../app/controllers/');
          } catch (e) {
            throw new Error(`The controller ${value.controller} wasn't found.`);
          }
        } else if (!! value.view) {
          res.render(value.view);
        } else if (!! value.callback) {
          if (typeof(value.callback) === 'function') {
            value.callback(req, res, next);
          } else {
            throw new Error(`The callback for route ${key} must be a function.`);
          }
        } else {
          throw new Error(`You must set a property (view, controller, or callback) for this route.`);
        }
      });
    } catch (e) {
      throw new Error(e);
    }
  });
};

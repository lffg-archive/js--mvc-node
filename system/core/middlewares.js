/**
 * CORE MIDLEWARE DEFINER
 * 
 * Defines the global middleware of the application.
 */

/**
 * Module dependencies.
 */
const helmet = require('helmet');
const parser = require('body-parser');
const session = require('express-session');

/**
 * This module aims to add global generic middlewares.
 */
module.exports = () => {
  /**
   * Sets the helmet middleware.
   */
  app.use(helmet());

  /**
   * Sets the static content.
   */
  app.use(express.static(`${app.get('base_path')}/public`));

  /**
   * Sets the body parser middleware.
   */
  app.use(parser.urlencoded({ extended: true }));
  app.use(parser.json());

  /**
   * Sets the express session middleware.
   */
  app.use(session({
    secret: app.get('session-secret-key'),
    resave: false,
    saveUninitialized: false
  }));

  /**
   * Add X-Powered-By
   */
  app.use((req, res, next) => {
    res.set('X-Powered-By', 'Node.JS');
    next();
  });
};

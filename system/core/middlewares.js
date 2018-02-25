/**
 * Module dependencies.
 */
const helmet = require('helmet');
const parser = require('body-parser');

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
  app.use(express.static(`${app.get('base_dir')}/public`));

  /**
   * Sets the body parser middleware.
   */
  app.use(parser.urlencoded({ extended: true }));

  /**
   * Add X-Powered-By
   */
  app.use((req, res, next) => {
    res.set('X-Powered-By', 'Node.JS');
    next();
  });
};

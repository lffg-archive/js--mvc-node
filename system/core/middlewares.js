const Helmet = require('helmet');

module.exports = () => {
  /**
   * Add Helmet middleware.
   */
  app.use(Helmet());

  /**
   * Set
   */
  app.use('/assets', express.static(`${app.get('base_dir')}/assets`));

  /**
   * Add X-Powered-By
   */
  app.use((req, res, next) => {
    res.set('X-Powered-By', 'Node.JS');
    next();
  });
};

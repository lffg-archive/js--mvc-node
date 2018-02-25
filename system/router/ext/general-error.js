/**
 * 404 ERROR PAGE RENDERER
 * 
 * Renders a 500 error page when needed.
 */
module.exports = function() {
  app.use((err, req, res, next) => {
    res.status(500);
    res.format({
      'text/html': () => {
        const errorConfig = require(`${app.get('base_path')}/config/error`);
        res.render(errorConfig.general.viewPath, { 'error': err.message });
      },
      'application/json': () => {
        res.json({ error: true, status: 500, message: err.message });
      },
      'default': () => {
        const errorConfig = require(`${app.get('base_path')}/config/error`);
        res.render(errorConfig.general.viewPath, { 'error': err.message });
      }
    });
  
    next();
  });
};
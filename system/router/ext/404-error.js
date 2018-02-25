/**
 * 404 ERROR PAGE RENDERER
 * 
 * Renders a 404 error page when needed.
*/
module.exports = function() {
  app.use((req, res) => {
    res.status(404);
    res.format({
      'text/html': () => {
        const errorConfig = require(`${app.get('base_path')}/config/error`);
        res.render(errorConfig['404'].viewPath);
      },
      'application/json': () => {
        res.json({ error: true, status: 404, message: 'Error 404' });
      },
      'default': () => {
        const errorConfig = require(`${app.get('base_path')}/config/error`);
        res.render(errorConfig['404'].viewPath);
      }
    });
  });
};
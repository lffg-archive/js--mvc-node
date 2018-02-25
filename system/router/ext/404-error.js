module.exports = function() {
  app.use((req, res) => {
    res.status(404);
    res.format({
      'text/html': () => {
        const errorConfig = require('../../config/error');
        res.render(errorConfig['404'].viewPath);
      },
      'application/json': () => {
        res.json({ error: true, status: 404, message: 'Error 404' });
      },
      'default': () => {
        const errorConfig = require('../../config/error');
        res.render(errorConfig['404'].viewPath);
      }
    });
  });
};
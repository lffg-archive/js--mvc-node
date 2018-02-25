/**
 * ROUTER PARSER
 * 
 * It checks the routes, analyzes them and executes the current route.
 */
module.exports = function() {
  /**
   * It requires the routes and the module to execute them.
   */
  const routes = require(`${app.get('base_path')}/app/routes`);
  const executeRoute = require('./execute-route');

  /**
   * Itera on the routes, running the current.
   */
  for (let route of routes) {
    const routePath = route.path;
    const routeMethod = route.method || 'all';
    
    let routeExecutor;
    if (!! route.controller) {
      routeExecutor = { type: 'controller', entry: route.controller };
    } else if (!! route.callback) {
      routeExecutor = { type: 'callback', entry: route.callback };
    } else if (!! route.view) {
      routeExecutor = { type: 'view', entry: route.view };
    }

    /**
     * Checks if the route's HTTP method is valid.
     */
    if (
      routeMethod !== 'all' &&
      routeMethod !== 'get' &&
      routeMethod !== 'put' &&
      routeMethod !== 'post' &&
      routeMethod !== 'patch' &&
      routeMethod !== 'delete'
    ) {
      throw new Error(`
        The ${routeMethod} method does not exist. The available ones are:
        all, get, put, post, patch, delete
      `);
    }

    /**
     * If no route executor has been specified.
     */
    if (! routeExecutor) {
      throw new Error(`
      You must set a property (view, controller, or callback)
      for the ${routePath} route.
    `);
    }

    /** 
     * Executes the current iteration route.
     */
    executeRoute(routePath, routeMethod, routeExecutor);
  }

  require('./ext/general-error')();
  require('./ext/404-error')();
};
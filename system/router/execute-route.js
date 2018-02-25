/**
 * ROUTER EXECUTER
 * 
 * Creates an executor for the current route.
 * 
 * @param   {string} routePath 
 * @param   {string} routeMethod 
 * @param   {object} routeExecutor 
 * @return  {boolean}
 */
module.exports = function(routePath, routeMethod, routeExecutor) {
  /**
   * Creates the route listener.
   */
  app[routeMethod](routePath, (req, res, next) => {
    /** 
     * If the route execution method is via a controller:
     */
    if (routeExecutor.type === 'controller') {
      let controller = {
        name: undefined,
        action: 'index'
      };

      /** 
       * Checks for an action in the controller name.
       */
      if (typeof(routeExecutor.entry) !== 'string') {
        throw new Error(`The controller property of route ${routePath} must be a string.`);
      }

      if (/@/.test(routeExecutor.entry)) {
        const splitedController = routeExecutor.entry.split('@');

        controller.name = splitedController[0];
        controller.action = splitedController[1];
      } else {
        controller.name = routeExecutor.entry;
      }

      /** 
       * Creates the current controller instance.
       */
      let controllerInstance;
      try {
        controllerInstance = require(`../../app/controllers/${controller.name}.js`);
      } catch (e) {
        throw new Error(`The ${controller.name} controller wasn't found.`);
      }
      controllerInstance = new controllerInstance(req, res, next);

      /** 
       * Performs the current action in the context of the controller.
       */
      try {
        controllerInstance[controller.action](req, res, next);
      } catch (e) {
        throw new Error(`The controller ${controller.name} does not have the ${controller.action} action.`);
      }
  
      return true;
    }

    /** 
     * If the route execution method is via a callback:
     */
    if (routeExecutor.type === 'callback') {
      if (typeof(routeExecutor.entry) === 'function') {
        /**
         * Executes the callback.
         */
        try {
          routeExecutor.entry(req, res, next);
          return true;
        } catch (e) {
          throw new Error(`The callback passed to route ${routePath} is not valid.`);
        }
      }
  
      throw new Error(`
        The callback for the route ${routePath} must be a function.
      `);
    }

    /** 
     * If the route execution method is via a view rendering.
     */
    if (typeof(routeExecutor.entry) !== 'string') {
      throw new Error(`The view property of route ${routePath} must be a string.`);
    }

    if (routeExecutor.type === 'view') {
      try {
        res.render(routeExecutor.entry);
        return true;
      } catch (e) {
        throw new Error(`The view set for route ${routePath} does not exist or is unavailable.`);
      }
    }
  });
};
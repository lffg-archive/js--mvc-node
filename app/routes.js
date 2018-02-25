/**
 * ROUTE MANAGEMENT ARCHIVE
 *
 * This is the file to configure and set the routes.
 * Each object inside the exported array is a route, having some properties:
 *
 * The route path:
 * 
 *     - path        :: (string containing the path of the route)
 * 
 * Note: if you omit the above property, the route will be executed with any HTTP method.
 *  
 * The HTTP method receives a string, which may contain:
 *
 *     - method      :: (*, ALL, GET, PUT, POST, PATCH ou DELETE)
 *
 * The executor property can be one of the three following:
 *
 *     - view        :: Renders a view.
 *     - callback    :: Executes a callback.
 *     - controller  :: Runs a controller.
 *
 * Note: to call a controller, use the following example:
 *
 *     controller: 'ControllerName@controllerAction'
 *
 * Note that the action name is camelCase.
 *
 * If you omit the action, it will automatically be set to index action.
 * Example:
 *
 *     controller: 'ControllerName'
 *
 */

module.exports = [
  /** Home page. */
  {
    path: '/',
    view: 'pages/home'
  },

  /** "Form" get page. */
  {
    path: '/form',
    method: 'get',
    controller: 'Form', /** Index action. */
  },

  /** "Form" post page. */
  {
    path: '/form',
    method: 'post',
    controller: 'Form@submit',
  },

  /** About page. */
  {
    path: '/about',
    callback: (req, res) => {
      res.send('About page.');
    }
  }
];
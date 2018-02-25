/**
 * BASE CONTROLLER
 * 
 * The parent controller of all other controllers in the application.
 */
module.exports = class Controller {
  /**
   * Loads a template and returns its instance.
   * 
   * @param   {string} path 
   * @return  {class}
   */
  model(path) {
    return require(`${app.get('base_path')}/app/models/${path}.js`);
  }
};
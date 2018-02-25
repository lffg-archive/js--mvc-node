module.exports = class Form extends Controller {
  index(req, res) {
    res.render('pages/form');
  }

  submit(req, res) {
    const model = new (this.model('Form'))();
    const html = model.getHTML(req.body.firstName, req.body.lastName);

    res.render('pages/form', { html });
  }
};

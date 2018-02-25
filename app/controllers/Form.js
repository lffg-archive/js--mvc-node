module.exports = class Form {
  index(req, res) {
    res.render('pages/form');
  }

  submit(req, res) {
    res.render('pages/form', { data: req.body });
  }
};

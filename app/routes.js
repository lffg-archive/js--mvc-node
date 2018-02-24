module.exports = {
  '/': {
    'method': '*',
    'callback': (req, res) => {
      res.send('Mano, eu sou foda!');
    }
  },
  '/user/:id': {
    'method': 'get',
    // 'controller': 'user'
    'callback': (req, res) => {
      res.send(`User: ${req.params.id} + ${Date.now()}`);
    }
  },
  '/about': {
    'method': '*',
    'view': 'static/about'
  },
  '404': {
    'method': '*',
    'callback': function(req, res) {
      res.status(404).send('Error 404');
    }
  }
};

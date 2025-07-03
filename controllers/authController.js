const User = require('../models/User');

exports.showLogin = (req, res) => {
  res.render('login', { error: null });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await user.comparePassword(password))) {
    return res.render('login', { error: 'Credenciais inválidas' });
  }

  req.session.userId = user._id;
  res.redirect('/dashboard');
};

exports.dashboard = (req, res) => {
  if (!req.session.userId) return res.redirect('/');
  res.render('dashboard');
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
};

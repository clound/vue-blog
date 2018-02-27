module.exports = function (app) {
  app.use('/posts', require('./posts'));
  app.use('/products', require('./products'));
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
  app.use('/signout', require('./signout'));
};
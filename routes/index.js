module.exports = function (app) {
  app.use('/posts', require('./posts'));
  app.use('/signup', require('./signup'));
  app.use('/signin', require('./signin'));
};
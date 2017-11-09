module.exports = {
  checkLogin: function checkLogin(req, res, next) {
    if (!req.session.user) {
      return res.json({
        code: 1,
        data:req.session.user,
        info:'该账号未登录'
      });
    }
    next();
  },

  checkNotLogin: function checkNotLogin(req, res, next) {
    if (req.session.user) {
      res.cookie('blogtoken', encodeURIComponent(req.session.user._id) , { expires: new Date(Date.now() + 900000) });
      return res.json({
        code: 0,
        data:req.session.user,
        info:'该账号已登录'
      });//返回之前的页面
    }
    next();
  }
};

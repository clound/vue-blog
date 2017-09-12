var sha1 = require('sha1');
var express = require('express');
var router = express.Router();

var UserModel = require('../models/users');
var checkNotLogin = require('../middlewares/check').checkNotLogin;

// GET /signin 登录页
router.get('/', checkNotLogin, function(req, res, next) {
  res.json({
    code: 1,
    data:req.session.user,
    info:'未登录'
  });
});

// POST /signin 用户登录
router.post('/', checkNotLogin, function(req, res, next) {
  var name = req.fields.name;
  var password = req.fields.password;
  UserModel.getUserByName(name)
    .then(function (user) {
      if (!user) {
        return res.json({
          code: 1,
          info: '该用户未注册'
        });
      }
      // 检查密码是否匹配
      if (sha1(password) !== user.password) {
        return res.json({
          code: 1,
          info: '密码不正确'
        });
      }
      // 用户信息写入 session
      delete user.password;
      req.session.user = user;
      // 跳转到主页
      res.cookie('blogtoken', 'yes', { expires: new Date(Date.now() + 900000) });
      res.json({
        code: 0,
        info: '登录成功'
      });
    })
    .catch(next);
});

module.exports = router;
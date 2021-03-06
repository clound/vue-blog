var express = require('express');
var router = express.Router();

var checkLogin = require('../middlewares/check').checkLogin;

// GET /signout 登出
router.get('/', checkLogin, function(req, res, next) {
  // 清空 session 中用户信息
  req.session.user = null;
  res.clearCookie("blogtoken");
  res.json({code: 0,info: '登出成功'});
  
});

module.exports = router;
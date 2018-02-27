var express = require('express');
var router = express.Router();
var datas = require('./product.json')

// GET /products 所有产品信息
// 
router.get('/getProducts', function(req, res) {
  res.json(datas);
});

module.exports = router;
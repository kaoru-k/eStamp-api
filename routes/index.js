var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var param = {'value':'This is sample api.'};
    res.header('Content-Type', 'application/json; charset=utf-8')
    res.send(param);
  });

module.exports = router;
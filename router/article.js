var express = require('express')
var Article = require('../db/article')

var articleApp = express.Router()

articleApp.get('/add', function (req, res) {
    res.render('add.html')
})

// 当页面不存在时触发
articleApp.use(function(req, res, next) {
	res.render('error.html')
});

module.exports = articleApp
var express = require('express')
var User = require('../db/user')
var bodyParser = require('body-parser')
var md5 = require('blueimp-md5')

var router = express.Router()

// 配置模板引擎和body-parser需要在路由挂载之前
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

router.get('/', function (req, res) {
    // 永久记录session 
    res.render('index.html', {
        user: req.session.user
    })
})

router.get('/login', function (req, res) {
    res.render('login.html')
})

router.post('/login', function (req, res) {
    // console.log(req.body) // 获取登陆提交的信息
    var body = req.body

    User.findOne({
        username: body.username,
        password: md5(md5(body.password))
    }, function (err, user) {
        if (err) {
            return res.status(500).json({
                err_code: 500,
                message: err.message // 通过err自带属性发送失败信息
            })
        }
        
        // 未找到用户返回null
        if (!user) {
            return res.status(200).json({
                err_code: 1,
                message: "用户名或密码错误！"
            })
        }

        // 登陆成功，通过session记录登陆状态。
        req.session.user = user

        // 成功状态
        // 异步请求，服务端无法重定向到首页，所以发送成功响应，自定义状态码
        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

// 退出登陆
router.get('/logout', function (req, res) {
    req.session.user = null
    res.redirect('/login')
})

router.get('/register', function (req, res) {
    res.render('register.html')
})

router.post('/register', function (req, res) {
    // console.log(req.body);
    var body = req.body
    User.findOne({
      $or: [{
          email: body.email
      },{
          username: body.username
      }]
    }, function (err, data) {
        if(err) {
            return res.status(500).json({
                success: false,
                message: '服务端错误'
            })
        }
        if (data) {
            return res.status(200).json({
                err_code: 1,
                message: '邮箱或者用户名已存在！'
            })
            return res.send('邮箱或者用户名已存在！,请重新注册~')
        }
        // 两次加密，并且加入随机字符，防止别人破解密码
        body.password = md5(md5(body.password) + 'itcast')
        new User(body).save(function (err, user) {
            if (err) {
                return res.status(500).json({
                    success: false,
                    message: '服务端错误'
                }) 
            }
        })

        res.status(200).json({
            err_code: 0,
            message: 'OK'
        })
    })
})

router.get('/add', function (req, res) {
    res.render('add.html')
})

// 当页面不存在时触发
router.use(function(req, res, next) {
	res.render('error.html')
});


module.exports = router
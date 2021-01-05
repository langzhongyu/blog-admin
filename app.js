var express = require('express')
var path = require('path')
var session = require('express-session')
var router = require('./router')

var app = express()

// 公开访问路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 把art-template模板引擎配置到express中
app.engine('html', require('express-art-template'))

// path 路径操作模块 _dirname 绝对路径
app.set('views', path.join(__dirname, './views/'))

// express-session中间件配置 
app.use(session({
    secret: 'itcast',
    resave: false,
    saveUninitialized: false // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
}))



app.use(router)

app.listen('3001', function () {
    console.log('3001端口已启动...')
})
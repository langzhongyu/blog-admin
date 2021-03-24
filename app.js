var express = require('express')
var path = require('path')
var session = require('express-session')
var MongoStore = require('connect-mongo')(session);



var app = express()

// 公开访问路径
app.use('/public/', express.static(path.join(__dirname, './public/')))
app.use('/node_modules/', express.static(path.join(__dirname, './node_modules/')))

// 把art-template模板引擎配置到express中
app.engine('html', require('express-art-template'))

// path 路径操作模块 _dirname 绝对路径
app.set('views', path.join(__dirname, './views/'))

// express-session中间件配置 
// session默认是在缓存里存储，服务器一旦重启，便再也访问不到了
app.use(session({
    secret: 'itcast', // 在md5中加入随机字符
    resave: false, // 重新保存
    // cookie: {
    //     maxAge: 60*1000 //设置登陆失效时间。
    // },
    saveUninitialized: false, // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
    store: new MongoStore({
        url:'mongodb://localhost/my_blog',
        collection:'sessions',
        touchAfter:24*3600, // 24小时内只更新一次会话
    })
}))


app.use(require('./router/router'))
//app.use(require('./router/article'))

app.listen('3001', function () {
    console.log('3001端口已启动...')
})
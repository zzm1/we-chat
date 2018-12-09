const Koa = require('koa');
const app = new Koa();
// const bodyParser = require('body-parser')
const path = require('path')
const bodyParse = require('koa-better-body')
const convert = require('koa-convert')
const cookieParser = require('cookie-parser')
const router = require('koa-router')()
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(callback) {
  console.log('成功连接数据库');
});

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// app.use(cookieParser())

app.use(convert(bodyParse({
  multipart: true,
  formLimit: 100000000 // 100M 上传限制
})))

require(path.join(__dirname, '../router/'))(router)
app.use(router.routes()).use(router.allowedMethods())
app.listen(3000);

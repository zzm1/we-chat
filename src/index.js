const Koa = require('koa');
const app = new Koa();
// const bodyParser = require('body-parser')
const path = require('path')
const bodyParse = require('koa-better-body')
const convert = require('koa-convert')
const cookieParser = require('cookie-parser')
const router = require('koa-router')()
const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/chat'
// logger
// 全局对象
let db = {}

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});

// x-response-time
// app.use(cookieParser())
// app.use(bodyParser.json())
app.use(convert(bodyParse({
  multipart: true,
  formLimit: 100000000 // 100M 上传限制
})))

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
async function init (){
  // db = global.db = mongoose.connect(DB_URL)
  require(path.join(__dirname, '../router/'))(router)
  app.use(router.routes()).use(router.allowedMethods())
}
init()

// response
// router.get('/', async (ctx, next) => {
//   ctx.response.body = '<h1>index page</h1>'
// })

// router.get('/home', async (ctx, next) => {
//   ctx.response.body = '<h1>HOME page</h1>'
// })

// router.get('/404', async (ctx, next) => {
//   ctx.response.body = '<h1>404 Not Found</h1>'
// })
// app.use(async ctx => {
//   ctx.body = 'Hello World2';
// });
app.use(router.routes())
app.listen(3000);

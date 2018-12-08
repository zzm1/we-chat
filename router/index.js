'use strict'
const model = require('../models/user.js')
console.log('model')
const User = model.getModel('user')
console.log('User')
// const User = user.getModel('user')
// console.log('user', user)
module.exports = function(router) {

  // router.get(
  //   '/test',
  //   (ctx, next) => {
  //     return User.findOne().then(function(user) {
  //       ctx.user = user;
  //       next();
  //     });
  //   },
  //   ctx => {
  //     console.log(ctx.user);
  //     // => { id: 17, name: "Alex" }
  //   }
  // );
  router.get('/test', async (ctx, next) => {
    try {
      const userModel = new User({user:'zzm',type:1,pwd:'zzzz'})
      userModel.save(function(e,d){
        if (e) {
          console.log('1',e)
          return {code:1,msg:'后端出错了'}
        }
        console.log('2')
        ctx.body = 'zzzm'
      })
      // User.find({}, function(err, doc) {
      //   ctx.body = { data: 'zzm' }
      //   // return res.json({code:0,data:doc})
      // })
      // let t = Date.now()
      // let r = {
      //   name:'zzm',
      //   method: 'get',
      //   header: ctx.header,
      //   query: ctx.query,
      //   checkedData: ctx.checkedData,
      // }
      // let dt = Date.now() - t
      // r.rTime = dt
      // ctx.body = r
    } catch (e) {
      ctx.body = {
        method: 'get',
        header: ctx.header,
        query: ctx.query,
        checkedData: ctx.checkedData,
        errMsg: e.toString(),
        global: global
      }
    }
  })
}

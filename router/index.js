'use strict'
const User = require('../models/user.js')
// const model = require('../models/user.js')
// console.log('model')
// const User = model.getModel('user')
// console.log('User')
// const User = user.getModel('user')
// console.log('user', user)
const mongoose = require('mongoose')

module.exports = function(router) {
  router.get('/test', async (ctx, next) => {
    try {
      ctx.type = 'json'
      var data = await User.find()
      ctx.body = data
      console.log(data,'--------')
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

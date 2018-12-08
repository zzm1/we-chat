const koa = require('koa')

const Router = koa.Router()
const model = require('./model')
const User = model.getModel('user')


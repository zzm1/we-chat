// const mongoose = require('mongoose')
// // 链接mongo 并且使用imooc这个集合
// const DB_URL = 'mongodb://localhost:27017/imooc-chat'
// var db = mongoose.connect(DB_URL)

// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function (callback) {
//   console.log('成功连接数据库');
// });
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('成功连接数据库');
});

const models = {
  user: {
    'user': { type: String, 'require': true },
    // 'pwd': { type: String, 'require': true },
    // 'type': { 'type': String, 'require': true },
    //头像
    'avatar': { 'type': String },
  },
  chat: {

  }
}

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel: function(name) {
    return mongoose.model(name)
  }
}
// var mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test');

// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// db.once('open', function(callback) {
//   console.log('开始进行MongoDB数据库操作');

//   var personSchema = mongoose.Schema({
//     name: String,
//     height: Number
//   });

//   var PersonModel = mongoose.model('Person', personSchema);

//   var tim = new PersonModel({ name: 'Tim', height: 150 });

//   personSchema.add({ weight: 'number', nickname: 'string' });

//   var bim = new PersonModel({ name: 'bim', height: 160, weight: 60 });

//   //输出tim的名字
//   console.log(tim); //{_id: 5aed9a70595695188446035d, name: 'Tim', height: 150}
//   console.log(bim); //{_id: 5aed9a70595695188446035e, name: 'Bim', height: 160, weight: 60}
//   console.log(bim.nickname); //undefined
// });

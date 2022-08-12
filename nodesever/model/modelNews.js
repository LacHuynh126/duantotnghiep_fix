var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
  id: { type: ObjectId },
  title: {
    type:String
  },
  content: {
    type:String
  },
  images:{
    type:String
  },
  date: {
    type:Date
  },
  like: {
    type:Number
  },
  author : {
    type: String
  }
});
module.exports = mongoose.model('news_duantotnghieps', UserSchema);
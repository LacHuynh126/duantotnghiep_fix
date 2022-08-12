var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
  id: { 
    type: ObjectId 
  },
  content: {
    type:String
  },
  date: {
    type:String
  },
  like: {
    type:Number
  },
  names : {
    type: String
  },
  images:{
    type:String
  },
  news:{
    type:String
  }
});
module.exports = mongoose.model('comment_duantotnghieps', UserSchema);
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
  id: { type: ObjectId },
  email: {
    type: String
  },
  username: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type:String
  }, 
  address : {
    type: String
  },
  images:{
    type:String
  },
  both: {
    type:Date
  },
  gender: {
    type: Number
  },
  admintor:{
    type: String
  },
  con:{
    type:String
  }
});
module.exports = mongoose.model('users_duantotnghieps', UserSchema);
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
  _id: { 
    type: ObjectId
  },
  hoadon: {
    type:String
  },
  trangthai:{
    type:String
  }
});
module.exports = mongoose.model('hoadonnhan_duantotnghieps', UserSchema);
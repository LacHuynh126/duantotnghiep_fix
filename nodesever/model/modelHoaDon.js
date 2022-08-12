var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
    id: { type: ObjectId },
    tinhTrang: {type:String},
    ngayMuahang:{type:String},
    giaTien:{type:String},
    nguoiTaohoadon:{type:String}
  });
  module.exports = mongoose.model('hoadontong_duantotnghieps', UserSchema);
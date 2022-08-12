var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
    id: { type: ObjectId },
    tinhTrang: {type:String},
    ngayMuahang:{type:String},
    ngayLaphoadon:{type:String},
    tenXe:{type:String},
    hinhXe:{type:String},
    suDung:{type:String},
    giaTien:{type:String},
    soLuong:{type:String},
    trangThai:{type:String},
    id_Xe:{ type: String}
  });
  module.exports = mongoose.model('hoadon_duantotnghieps', UserSchema);
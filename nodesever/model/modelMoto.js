var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var MotoSchema = new mongoose.Schema({
  id: { 
    type: ObjectId 
  },
  tenXe: {
    type:String
  },
  giaXe: {
    type:String
  },
  hinhXe: {
    type:String
  },
  hinhSilder:{
    type:Array
  },
  namSanxuat:{
    type:Date
  },
  namSudung:{
    type:Number
  },
  tinhTrang:{
    type:String
  }, 
  loaiHinhban:{
    type:String
  },
  phanKhoi:{
    type:String
  },
  mauSac:{
    type:String
  },
  ngayKiemdinh:{
    type:Date
  },
  soKm:{
    type:String
  },
  ngayBan:{
    type:Date
  },
  luotLike:{
    type:Number
  },
  hangXe:{
    type:String
  },
  loaiXe:{
    type:String
  },
  nguoiBan:{
    type:String
  },
  nguoiMua:{
    type:String
  }
});
module.exports = mongoose.model('moto_duantotnghieps', MotoSchema);
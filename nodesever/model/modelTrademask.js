var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var MotoSchema = new mongoose.Schema({
  id: { type: ObjectId },
  names: {type: String},
  images:{type:String}  
});
module.exports = mongoose.model('trademask_duantotnghieps', MotoSchema);
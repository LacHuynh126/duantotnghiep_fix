var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

var UserSchema = new mongoose.Schema({
  _id: { 
    type: ObjectId
  },
  content: {
    type:[Object]
  }
});
module.exports = mongoose.model('replaychat_duantotnghieps', UserSchema);
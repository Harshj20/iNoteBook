const mongoose= require('mongoose');
  const { Schema } = mongoose;

  const UserSchema = new Schema({
    name:{
        type: String,
        require
    },
    email:{
        type: String,
        require,
        unique:true
    },
    password:{
        type: String,
        require
    },
    timeStamp:{
        type: Date,
        default: Date.now
    }
  });
  module.exports = mongoose.model('user', UserSchema);
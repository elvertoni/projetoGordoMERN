const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  nickname: {
    type: String,
    require: true,
    unique: true,
  },
  email: { type: String, require: true, unique: true },
  senha: { type: String, require: true },
  avatar: { type: String, require: true },
});

//{"name":"", "nickname": "", "email": "", "senha": "", "avatar":""}

const User = mongoose.model("User", UserSchema);

module.exports = User;

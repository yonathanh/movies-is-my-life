
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  email:    String,
  googleID: String,
  image:    String,
  favorites: Array,
  mustWatch: Array,
  easySunday: Array,
  myCinema: Array, 
  imgName:  String,
  imgPath:  String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
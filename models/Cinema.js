
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const CinemaSchema = new Schema({
  siteName: String, //'solar movies'
  siteLink: String,  //'http://www6.solarmoviesc.com'
  imageSRC: String,
  imgName: String,
  imgPath: String
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Cinema = mongoose.model("Cinema", CinemaSchema);

module.exports = Cinema;
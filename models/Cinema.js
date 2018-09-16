
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const CinemaSchema = new Schema({
  siteName: String, //'solar movies'
  siteLink: String  //'http://www6.solarmoviesc.com'
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});

const Cinema = mongoose.model("Cinema", CinemaSchema);

module.exports = Cinema;
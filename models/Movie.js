const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  user: String,
  title: String,
  genre: String,
  imdbRating: String,
  image: String,
  imgName: String,
  imgPath: String,
  links: Array
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Movie = mongoose.model("Movie", movieSchema);


module.exports = Movie;
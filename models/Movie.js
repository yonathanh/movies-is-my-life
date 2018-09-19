const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const movieSchema = new Schema({
  user:    String,
  title:   String,
  year:    String,
  genre:   String,
  imdbRating: String,
  imdbID:  String,
  image:   String,
  imgName: String,
  imgPath: String,
  links:   Array
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
});


const Movie = mongoose.model("Movie", movieSchema);


module.exports = Movie;
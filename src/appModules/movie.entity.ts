import mongoose, { Schema } from "mongoose";
import config from "../appConfig/env/ttlConfig";
import  * as uuid from 'uuid';


const movieSchema = new Schema({
  movieId: { type: String, default: uuid.v4()},
  popularity: { type: Number },
  vote_coutnt: { type: Number },
  video: { type: Boolean },
  poster_path: { type: String },
  id: { type: Number },
  adult: { type: Boolean },
  backdrop_path: { type: String },
  original_language: { type: String },
  original_title: { type: String },
  title: { type: String },
  vote_average: { type: Number },
  overview: { type: String },
  release_date: { type: String },
  createdAt: { type: Date },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: `${config.expiryTime}` },
  },
});

export const movieModel = mongoose.model("movies", movieSchema);

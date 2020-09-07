import { Movie } from "./movie.interface";
import request from "superagent";
import moviedao from "./movie.dao";
import { MongooseDocument } from "mongoose";
import logger from "../logger";
import HttpException from "../common/exceptions/httpException";

class MovieList {
  public getMovies(): Promise<{ movies: Movie[] }> {
    return new Promise((resolve, reject) => {
      request
        .get(
          "https://api.themoviedb.org/3/movie/now_playing?api_key=46cb0826bc9d924445bc90903e183ebf&language=en-US&page=1"
        )
        .then((response) => {
          resolve(response.body.results);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  public getAllMovieList (done: CallableFunction) {
    moviedao.getMovie((err: Error, movies: MongooseDocument) => {
      if (err) {
        this.getMovies()
          .then((response) => {         
            moviedao.saveMovie(
              response,
              (err: Error, movies: MongooseDocument) => {     
                if (err) {
                  logger.info(
                    "Getting the error while saving the data in service",
                    err
                  );
                } else {
                  logger.info(" Data has been saved");
                  done(movies);
                  return movies;
                }
              }
            );
          })
          .catch((err) => {
            logger.error(" Error while getting the data", err);
            done(
              new HttpException(500, " Error fetching the data from Server")
            );
          });
      } else {
        done(movies);
        return movies;
      }
    })
  }
}
export default new MovieList();

import { movieModel } from "./movie.entity";
import { MongooseDocument } from "mongoose";
import logger from "../logger";

class MovieDao {
  public saveMovie(movies: any, next: CallableFunction) {
    movieModel
      .create(movies)
      .then((res: any) => {
        next(null, res);
      })
      .catch((err: any) => {
        logger.error(" error is", err);
        next(null, err);
      });
  }

  public getMovie(next: CallableFunction) {
    movieModel.findOne({},(err: Error, movies: MongooseDocument) => {
     
      if (err) {
        logger.error(" in dao  , getting error", err);
        next(err);
      } else {
        if (movies === null) {
          next("NO movies found");
        }
        else{
   next(null, movies);
        }
      }
    });
  }
}
export default new MovieDao();
